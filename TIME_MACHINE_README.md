# 🕰️ Git Time-Machine Restoration Tool

A powerful, interactive bash script that safely restores your Git repository to any previous commit state while preserving complete commit history.

## 🌟 Features

- **🔒 Safe Restoration**: Preserves all commit history - restoration appears as a new commit
- **💾 Automatic Backups**: Creates timestamped backup tags before any changes
- **🎯 Interactive Selection**: Visual commit history with detailed commit information
- **📁 File Preservation**: Keeps untracked files during restoration
- **☁️ Auto-Sync**: Automatically pushes to GitHub and triggers deployments
- **🖥️ Dev Server**: Automatically starts your development server after restoration
- **⚡ Smart Detection**: Detects Vercel, Netlify, GitHub Actions, and other CI/CD

## 🚀 Quick Start

1. **Make executable**:
   ```bash
   chmod +x git-time-machine.sh
   ```

2. **Run the script**:
   ```bash
   ./git-time-machine.sh
   ```

3. **Follow the interactive prompts**:
   - View recent commit history
   - Enter the commit hash to restore to
   - Confirm the restoration
   - Wait for automatic deployment and dev server startup

## 📋 Prerequisites

- Git repository with remote origin
- Node.js/npm (for development server)
- Network connection (for GitHub sync)
- Clean or properly committed working directory

## 🔧 Usage Examples

### Basic Restoration
```bash
./git-time-machine.sh
# Follow prompts to restore to any commit
```

### View Help
```bash
./git-time-machine.sh --help
```

### Check Version
```bash
./git-time-machine.sh --version
```

## 🛡️ Safety Features

### Pre-flight Checks
- ✅ Validates Git repository
- ✅ Checks for uncommitted changes
- ✅ Tests remote connectivity
- ✅ Lists untracked files

### Backup System
- 🏷️ Creates backup tags: `backup-before-restore_YYYYMMDD_HHMMSS`
- 📝 Includes recovery instructions in commit messages
- ⚡ Automatic rollback commands provided

### Error Handling
- 🔄 Comprehensive error checking at each step
- 🧹 Automatic cleanup of temporary files
- 📋 Clear error messages and guidance

## 📊 Restoration Process

1. **Pre-flight Safety Checks** - Validates environment and repository state
2. **Interactive Commit Selection** - Shows visual history and commit details
3. **Backup Creation** - Creates safety backup with timestamped tag
4. **File Restoration** - Extracts and restores files from target commit
5. **Commit Creation** - Creates descriptive restoration commit with metadata
6. **Remote Synchronization** - Pushes to GitHub and triggers deployments
7. **Development Setup** - Installs dependencies and starts dev server

## 🔄 Recovery Options

If you need to undo a restoration:

```bash
# Use the backup tag (shown in script output)
git reset --hard backup-before-restore_YYYYMMDD_HHMMSS

# Force push to sync with remote
git push --force-with-lease origin main
```

## 📁 What Gets Restored

### ✅ Included
- All tracked files from the target commit
- Directory structure from target commit
- Existing untracked files (preserved)

### ❌ Excluded
- `.git` directory (history preserved)
- Git configuration
- Current working changes (unless committed)

## 🚀 Deployment Integration

The script automatically detects and triggers:

- **Vercel** - Via GitHub webhook integration
- **Netlify** - Via GitHub webhook integration
- **GitHub Actions** - Automatically triggered on push
- **Custom CI/CD** - Any webhook-based deployment

## 📝 Restoration Commit Format

```
🔄 Time-machine restoration to abc1234

Original commit: abc1234567890abcdef1234567890abcdef123456
Original date: 2024-01-15 10:30:00 +0000
Original author: John Doe <john@example.com>
Original message: Add new feature

Restoration details:
- Timestamp: 2024-01-20 15:45:30 UTC
- Restored by: Jane Smith <jane@example.com>
- Backup tag: backup-before-restore_20240120_154530
- Current branch: main

This restoration preserves complete git history while reverting
all files to match the specified historical commit state.

Recovery: git reset --hard backup-before-restore_20240120_154530
```

## ⚠️ Important Notes

- **History Preservation**: All commit history is maintained - this is not a destructive operation
- **New Commit**: The restoration appears as a new commit, not a reset
- **Untracked Files**: Existing untracked files are preserved during restoration
- **Dependencies**: Script will reinstall npm/yarn/pnpm dependencies if needed
- **Force Push**: May require force push if remote history has diverged

## 🔍 Troubleshooting

### Common Issues

**Uncommitted Changes**
```bash
# Commit or stash changes before running
git add -A && git commit -m "Save changes before restoration"
# OR
git stash
```

**Remote Push Fails**
```bash
# Use force push with lease for safety
git push --force-with-lease origin main
```

**Invalid Commit Hash**
- Ensure the commit exists in your repository
- Use `git log --oneline` to find valid commit hashes
- Both short (7-char) and full hashes are supported

### Recovery Commands

**View Backup Tags**
```bash
git tag -l "backup-before-restore*"
```

**Restore from Backup**
```bash
git reset --hard backup-before-restore_YYYYMMDD_HHMMSS
git push --force-with-lease origin main
```

**View Restoration History**
```bash
git log --grep="Time-machine restoration"
```

## 🎯 Best Practices

1. **Always verify** the commit details before confirming restoration
2. **Keep backup tags** until you're sure the restoration is correct
3. **Test thoroughly** after restoration before making new changes
4. **Communicate** with team members before restoring shared repositories
5. **Document** the reason for restoration in your project notes

## 📄 License

This script is provided as-is for educational and development purposes. Use at your own risk and always ensure you have proper backups.

---

**Created by Claude Code** | **Time-Machine Restoration v1.0.0**