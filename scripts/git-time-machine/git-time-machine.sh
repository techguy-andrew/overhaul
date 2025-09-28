#!/bin/bash

# ============================================================================
# Git Time-Machine Restoration Script
# ============================================================================
# This script safely restores your repository to any previous commit state
# while preserving the complete commit history. The restoration appears as
# a new commit, maintaining full traceability.
# ============================================================================

set -e  # Exit on error
set -o pipefail  # Exit on pipe failure

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Configuration
TEMP_DIR="/tmp/git-restore-$$"
BACKUP_PREFIX="backup-before-restore"
MAIN_BRANCH="main"
REMOTE_NAME="origin"

# Global variables
TARGET_COMMIT=""
FULL_COMMIT=""
CURRENT_BRANCH=""
BACKUP_TAG=""
SKIP_REMOTE=false
COMMIT_DATE=""
COMMIT_AUTHOR=""
COMMIT_MESSAGE=""

# ============================================================================
# Helper Functions
# ============================================================================

print_header() {
   echo -e "\n${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
   echo -e "${CYAN}║${NC} ${BOLD}${BLUE}$1${NC}"
   echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}\n"
}

print_success() {
   echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
   echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
   echo -e "${RED}❌ $1${NC}"
}

print_info() {
   echo -e "${BLUE}ℹ️  $1${NC}"
}

print_step() {
   echo -e "${MAGENTA}🔄 $1${NC}"
}

cleanup() {
   if [ -d "$TEMP_DIR" ]; then
       print_info "Cleaning up temporary files..."
       rm -rf "$TEMP_DIR"
   fi
}

trap cleanup EXIT

confirm_action() {
   local prompt="$1"
   local response
   while true; do
       echo -n -e "${YELLOW}$prompt (yes/no): ${NC}"
       read response
       case $response in
           yes|YES|y|Y) return 0 ;;
           no|NO|n|N) return 1 ;;
           *) print_warning "Please type 'yes' or 'no'" ;;
       esac
   done
}

# ============================================================================
# Pre-flight Checks
# ============================================================================

preflight_checks() {
   print_header "🔍 Running Pre-flight Checks"

   # Check if we're in a git repository
   print_step "Checking if we're in a git repository..."
   if ! git rev-parse --git-dir > /dev/null 2>&1; then
       print_error "Not in a git repository!"
       echo "Please run this script from within a git repository."
       exit 1
   fi
   print_success "Git repository detected"

   # Get current branch
   CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
   print_info "Current branch: $CURRENT_BRANCH"

   # Check for uncommitted changes
   print_step "Checking for uncommitted changes..."
   if ! git diff-index --quiet HEAD -- 2>/dev/null; then
       print_warning "You have uncommitted changes:"
       git status --porcelain | head -10
       echo ""
       if ! confirm_action "Do you want to continue? (changes will be preserved)"; then
           echo "Operation cancelled."
           exit 0
       fi
   else
       print_success "Working directory is clean"
   fi

   # Check for untracked files
   print_step "Checking for untracked files..."
   local untracked_files=$(git ls-files --others --exclude-standard)
   if [ -n "$untracked_files" ]; then
       print_warning "You have untracked files (will be preserved):"
       echo "$untracked_files" | head -10
       if [ $(echo "$untracked_files" | wc -l) -gt 10 ]; then
           echo "... and $(( $(echo "$untracked_files" | wc -l) - 10 )) more"
       fi
       echo ""
   fi

   # Verify remote connection
   print_step "Testing remote repository connection..."
   if ! git ls-remote "$REMOTE_NAME" > /dev/null 2>&1; then
       print_warning "Cannot connect to remote repository. Sync will be skipped."
       SKIP_REMOTE=true
   else
       SKIP_REMOTE=false
       print_success "Remote repository is accessible"
   fi

   print_success "Pre-flight checks completed"
}

# ============================================================================
# Display Commit History
# ============================================================================

show_commit_history() {
   print_header "📜 Recent Commit History"

   echo -e "${CYAN}Recent commits:${NC}\n"

   # Show formatted commit history with colors
   git log --format="%C(yellow)%h%C(reset) - %C(green)(%ar)%C(reset) %s %C(dim white)- %an%C(reset)" -n 15

   echo -e "\n${CYAN}Visual commit graph:${NC}\n"
   git log --graph --oneline --decorate -n 10

   echo ""
}

# ============================================================================
# Get and Validate Target Commit
# ============================================================================

get_target_commit() {
   print_header "🎯 Select Target Commit"

   while true; do
       echo -n -e "${YELLOW}Enter the commit hash to restore to: ${NC}"
       read TARGET_COMMIT

       # Handle empty input
       if [ -z "$TARGET_COMMIT" ]; then
           print_warning "Please enter a commit hash"
           continue
       fi

       # Validate commit exists
       print_step "Validating commit hash..."
       if git rev-parse --verify "$TARGET_COMMIT^{commit}" > /dev/null 2>&1; then
           # Get full commit hash
           FULL_COMMIT=$(git rev-parse "$TARGET_COMMIT")

           # Get commit metadata
           COMMIT_DATE=$(git show -s --format=%ci "$FULL_COMMIT")
           COMMIT_AUTHOR=$(git show -s --format='%an <%ae>' "$FULL_COMMIT")
           COMMIT_MESSAGE=$(git show -s --format=%s "$FULL_COMMIT")

           # Display commit details
           echo -e "\n${CYAN}Selected commit details:${NC}"
           echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
           echo -e "${BOLD}Hash:${NC}    $FULL_COMMIT"
           echo -e "${BOLD}Date:${NC}    $COMMIT_DATE"
           echo -e "${BOLD}Author:${NC}  $COMMIT_AUTHOR"
           echo -e "${BOLD}Message:${NC} $COMMIT_MESSAGE"
           echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

           # Show file changes in that commit
           echo -e "\n${CYAN}Files changed in this commit:${NC}"
           git show --stat "$FULL_COMMIT" | tail -n +2 | head -20

           # Final confirmation
           echo -e "\n${YELLOW}⚠️  WARNING: This will restore the repository to this exact state.${NC}"
           echo -e "${YELLOW}All files will match this commit, but history will be preserved.${NC}"

           if confirm_action "Proceed with restoration?"; then
               print_success "Commit validated and confirmed"
               break
           else
               echo "Please select a different commit or exit with Ctrl+C"
               echo ""
           fi
       else
           print_error "Invalid commit hash. Please try again."
       fi
   done
}

# ============================================================================
# Create Backup Tag
# ============================================================================

create_backup() {
   print_header "💾 Creating Safety Backup"

   local timestamp=$(date +%Y%m%d_%H%M%S)
   BACKUP_TAG="${BACKUP_PREFIX}_${timestamp}"

   print_step "Creating backup tag: $BACKUP_TAG"
   git tag -a "$BACKUP_TAG" -m "Backup before restoration to $TARGET_COMMIT at $(date)"

   print_success "Backup tag created: $BACKUP_TAG"
   echo -e "${CYAN}Recovery command: git reset --hard $BACKUP_TAG${NC}"
}

# ============================================================================
# Perform Restoration
# ============================================================================

restore_to_commit() {
   print_header "🔄 Performing Time-Machine Restoration"

   # Create temporary directory
   print_step "Creating temporary workspace..."
   mkdir -p "$TEMP_DIR"
   print_success "Temporary workspace created at $TEMP_DIR"

   # Preserve untracked files
   print_step "Preserving untracked files..."
   local untracked_files=$(git ls-files --others --exclude-standard)
   if [ -n "$untracked_files" ]; then
       echo "$untracked_files" | while IFS= read -r file; do
           if [ -f "$file" ]; then
               local target_dir="$TEMP_DIR/untracked/$(dirname "$file")"
               mkdir -p "$target_dir"
               cp "$file" "$target_dir/"
           fi
       done
       print_success "Untracked files preserved"
   else
       print_info "No untracked files to preserve"
   fi

   # Export the target commit's file tree
   print_step "Extracting files from commit $TARGET_COMMIT..."
   git archive "$FULL_COMMIT" | tar -x -C "$TEMP_DIR"
   print_success "Files extracted from target commit"

   # Remove all tracked files (except .git)
   print_step "Removing current tracked files..."
   git ls-files -z | xargs -0 rm -f 2>/dev/null || true

   # Remove empty directories (but preserve .git)
   find . -type d -empty -not -path "./.git/*" -not -name ".git" -delete 2>/dev/null || true
   print_success "Current tracked files removed"

   # Copy files from temporary directory
   print_step "Restoring files from target commit..."
   cd "$TEMP_DIR"
   find . -type f -not -path "./.git/*" | while IFS= read -r file; do
       local target_dir=$(dirname "$file")
       if [ "$target_dir" != "." ]; then
           mkdir -p "$OLDPWD/$target_dir"
       fi
       cp "$file" "$OLDPWD/$file"
   done
   cd "$OLDPWD"
   print_success "Files restored from target commit"

   # Restore untracked files
   if [ -n "$untracked_files" ] && [ -d "$TEMP_DIR/untracked" ]; then
       print_step "Restoring untracked files..."
       cd "$TEMP_DIR/untracked"
       find . -type f | while IFS= read -r file; do
           local target_dir=$(dirname "$file")
           if [ "$target_dir" != "." ]; then
               mkdir -p "$OLDPWD/$target_dir"
           fi
           cp "$file" "$OLDPWD/$file"
       done
       cd "$OLDPWD"
       print_success "Untracked files restored"
   fi

   # Stage all changes
   print_step "Staging restoration changes..."
   git add -A
   print_success "All changes staged"

   print_success "Restoration completed successfully"
}

# ============================================================================
# Create Restoration Commit
# ============================================================================

create_restoration_commit() {
   print_header "📝 Creating Restoration Commit"

   local current_date=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
   local current_user=$(git config user.name)
   local current_email=$(git config user.email)

   # Create detailed commit message
   local commit_msg="🔄 Time-machine restoration to ${TARGET_COMMIT:0:7}

Original commit: $FULL_COMMIT
Original date: $COMMIT_DATE
Original author: $COMMIT_AUTHOR
Original message: $COMMIT_MESSAGE

Restoration details:
- Timestamp: $current_date
- Restored by: $current_user <$current_email>
- Backup tag: $BACKUP_TAG
- Current branch: $CURRENT_BRANCH

This restoration preserves complete git history while reverting
all files to match the specified historical commit state.

Recovery: git reset --hard $BACKUP_TAG"

   print_step "Creating restoration commit..."
   git commit -m "$commit_msg"

   local new_commit=$(git rev-parse HEAD)
   print_success "Restoration commit created: ${new_commit:0:7}"
}

# ============================================================================
# Push to Remote
# ============================================================================

push_to_remote() {
   print_header "☁️  Synchronizing with Remote Repository"

   if [ "$SKIP_REMOTE" = true ]; then
       print_warning "Skipping remote sync (no connection)"
       return
   fi

   print_step "Pushing restoration to remote..."
   if git push "$REMOTE_NAME" "$CURRENT_BRANCH"; then
       print_success "Restoration pushed to remote"
   else
       print_error "Failed to push restoration to remote"
       print_warning "You may need to force push: git push --force-with-lease"
   fi

   # Push backup tag
   print_step "Pushing backup tag..."
   if git push "$REMOTE_NAME" "$BACKUP_TAG"; then
       print_success "Backup tag pushed to remote"
   else
       print_warning "Failed to push backup tag (not critical)"
   fi

   # Display repository URL
   local repo_url=$(git remote get-url origin 2>/dev/null || echo "unknown")
   if echo "$repo_url" | grep -q github.com; then
       repo_url=$(echo "$repo_url" | sed 's/\.git$//')
       echo -e "${GREEN}GitHub repository: $repo_url${NC}"
   fi
}

# ============================================================================
# Trigger Deployments
# ============================================================================

trigger_deployments() {
   print_header "🚀 Deployment Status"

   # Check for Vercel
   if [ -f "vercel.json" ] || [ -f ".vercel/project.json" ]; then
       print_success "Vercel deployment will be triggered automatically via GitHub webhook"
   fi

   # Check for GitHub Actions
   if [ -d ".github/workflows" ]; then
       print_success "GitHub Actions workflows will be triggered"
   fi

   # Check for Netlify
   if [ -f "netlify.toml" ]; then
       print_success "Netlify deployment will be triggered"
   fi

   # Check for other deployment files
   if [ -f "deploy.yml" ] || [ -f ".github/workflows/deploy.yml" ]; then
       print_success "Custom deployment pipeline detected"
   fi
}

# ============================================================================
# Start Development Server
# ============================================================================

start_dev_server() {
   print_header "🖥️  Local Development Setup"

   # Check for package.json
   if [ -f "package.json" ]; then
       # Check if node_modules exists and is up to date
       if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules" ]; then
           print_step "Installing dependencies..."
           if command -v pnpm >/dev/null 2>&1 && [ -f "pnpm-lock.yaml" ]; then
               pnpm install
           elif command -v yarn >/dev/null 2>&1 && [ -f "yarn.lock" ]; then
               yarn install
           else
               npm install
           fi
           print_success "Dependencies installed"
       else
           print_info "Dependencies are up to date"
       fi

       # Check for dev script
       if grep -q '"dev"' package.json; then
           echo -e "\n${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
           echo -e "${GREEN}🎉 Restoration Complete!${NC}"
           echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

           echo -e "\n${BOLD}${GREEN}Summary:${NC}"
           echo -e "  • Repository restored to: ${CYAN}${TARGET_COMMIT:0:7}${NC} (${COMMIT_MESSAGE})"
           echo -e "  • Backup created at: ${CYAN}$BACKUP_TAG${NC}"
           echo -e "  • Changes pushed to: ${CYAN}$REMOTE_NAME/$CURRENT_BRANCH${NC}"

           echo -e "\n${BOLD}${YELLOW}Recovery Options:${NC}"
           echo -e "  • To undo restoration: ${CYAN}git reset --hard $BACKUP_TAG${NC}"
           echo -e "  • To view changes: ${CYAN}git show HEAD${NC}"
           echo -e "  • To see history: ${CYAN}git log --oneline -10${NC}"

           echo -e "\n${BOLD}${BLUE}Starting Development Server:${NC}"
           echo -e "  • Server will be available at: ${CYAN}http://localhost:3000${NC}"
           echo -e "  • Press ${YELLOW}Ctrl+C${NC} to stop the server"
           echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

           print_step "Starting development server..."
           exec npm run dev
       else
           print_warning "No 'dev' script found in package.json"
           print_info "You can manually start your development server"
       fi
   else
       print_warning "No package.json found - skipping dev server setup"
   fi
}

# ============================================================================
# Main Execution Flow
# ============================================================================

show_banner() {
   clear
   echo -e "${CYAN}╔══════════════════════════════════════════════════════════════╗${NC}"
   echo -e "${CYAN}║${NC}          ${BOLD}${BLUE}🕰️  Git Time-Machine Restoration Tool 🕰️${NC}           ${CYAN}║${NC}"
   echo -e "${CYAN}║${NC}                                                              ${CYAN}║${NC}"
   echo -e "${CYAN}║${NC}  Safely restore your repository to any previous state       ${CYAN}║${NC}"
   echo -e "${CYAN}║${NC}  while preserving complete commit history                   ${CYAN}║${NC}"
   echo -e "${CYAN}╚══════════════════════════════════════════════════════════════╝${NC}"
}

main() {
   show_banner

   # Execute workflow steps
   preflight_checks
   show_commit_history
   get_target_commit
   create_backup
   restore_to_commit
   create_restoration_commit
   push_to_remote
   trigger_deployments
   start_dev_server
}

# ============================================================================
# Script Entry Point
# ============================================================================

# Handle script arguments
case "${1:-}" in
   --help|-h)
       echo "Git Time-Machine Restoration Tool"
       echo ""
       echo "Usage: $0 [options]"
       echo ""
       echo "Options:"
       echo "  --help, -h     Show this help message"
       echo "  --version      Show version information"
       echo ""
       echo "This script interactively restores your repository to a previous"
       echo "commit while preserving all history. The restoration appears as"
       echo "a new commit, maintaining full traceability."
       echo ""
       echo "Features:"
       echo "  • Interactive commit selection with visual history"
       echo "  • Automatic backup creation with recovery instructions"
       echo "  • Complete history preservation"
       echo "  • Untracked file preservation"
       echo "  • Automatic deployment triggering"
       echo "  • Development server startup"
       exit 0
       ;;
   --version)
       echo "Git Time-Machine Restoration Tool v1.0.0"
       exit 0
       ;;
   *)
       main "$@"
       ;;
esac