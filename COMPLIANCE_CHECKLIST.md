# 🎯 Agency Development Compliance Checklist

> **Use this checklist before every commit to ensure 100% compliance with agency standards**

## Pre-Development Setup ✅

### Tech Stack Verification
- [ ] Using Next.js 15.x with App Router
- [ ] TypeScript 5.x in strict mode enabled
- [ ] Tailwind CSS 4.x configured
- [ ] shadcn/ui components installed and configured
- [ ] pnpm as package manager
- [ ] All required dependencies up to date

### Navigation Dependencies Check
- [ ] `@radix-ui/react-dialog` installed for Sheet primitive
- [ ] `class-variance-authority` installed for variant management
- [ ] `lucide-react` installed for consistent icons
- [ ] `tailwindcss-animate` installed for professional animations
- [ ] All navigation components use TypeScript interfaces

### Design Token System Check
- [ ] `src/styles/tokens.css` exists and is properly structured
- [ ] Two-layer token architecture in place (primitive → semantic)
- [ ] Theme switching system implemented (`[data-theme="dark"]`)
- [ ] Semantic tokens imported in `globals.css`
- [ ] No hardcoded design values anywhere in codebase

### Navigation System Check
- [ ] TopBar component exists at `src/components/navigation/TopBar.tsx`
- [ ] Sidebar component exists at `src/components/navigation/Sidebar.tsx`
- [ ] Sheet component exists at `src/components/ui/sheet.tsx`
- [ ] All navigation components use semantic tokens exclusively
- [ ] Radix UI Sheet primitive properly implemented
- [ ] Navigation configuration is inline (NAVIGATION array)
- [ ] Lucide icons used for all navigation items
- [ ] Accessibility attributes present (ARIA labels, screen reader text)

---

## Component Development Checklist 🧩

### Before Creating New Components

#### 1. Component Architecture Review
- [ ] Component expresses **intent**, not appearance
- [ ] Component is **thematically blind** (works with any theme)
- [ ] All styling uses semantic tokens only
- [ ] No hardcoded colors, spacing, or typography
- [ ] Follows existing component patterns in codebase

#### 2. shadcn/ui Integration
- [ ] Check if shadcn/ui has equivalent component first
- [ ] If yes: install via `npx shadcn@latest add [component]`
- [ ] If no: create custom component following shadcn patterns
- [ ] Ensure component uses `cn()` utility for className merging
- [ ] Follow shadcn naming conventions and file structure

#### 3. Token Usage Validation
- [ ] **Colors**: Only use semantic tokens (`bg-interactive-primary`, `text-text-primary`)
- [ ] **Spacing**: Only use semantic spacing (`px-container-padding`, `gap-element-gap`)
- [ ] **Typography**: Only use semantic text tokens (`text-text-primary`, `text-text-secondary`)
- [ ] **Interactive States**: Use hover variants (`hover:bg-interactive-primary-hover`)

### Component Implementation Standards

#### Required Component Structure
```typescript
// ✅ CORRECT Pattern
interface ComponentProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function Component({ variant = 'primary', className, ...props }: ComponentProps) {
  const variantClasses = {
    primary: 'bg-interactive-primary text-foreground-on-interactive',
    secondary: 'bg-interactive-secondary text-text-primary',
    danger: 'bg-interactive-danger text-foreground-on-interactive'
  };

  return (
    <element
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  );
}
```

#### Semantic Token Categories Checklist
- [ ] **Interactive**: `bg-interactive-primary`, `hover:bg-interactive-primary-hover`
- [ ] **Surface**: `bg-surface-background`, `bg-surface-card`, `bg-surface-elevated`
- [ ] **Text**: `text-text-primary`, `text-text-secondary`, `text-text-muted`
- [ ] **Foreground**: `text-foreground-on-interactive`, `text-foreground-primary`
- [ ] **Spacing**: `px-container-padding`, `py-element-gap`, `gap-component-gap`

---

## Code Quality Standards 📋

### TypeScript Requirements
- [ ] All props interfaces properly typed
- [ ] No `any` types used
- [ ] Strict mode compliance
- [ ] Proper import/export statements
- [ ] Generic types used where appropriate

### Accessibility Standards
- [ ] Proper semantic HTML elements
- [ ] ARIA labels where needed
- [ ] Keyboard navigation support
- [ ] Focus management implemented
- [ ] Screen reader compatibility

### Performance Requirements
- [ ] Components are properly memoized if needed
- [ ] No unnecessary re-renders
- [ ] Optimized imports (no barrel imports)
- [ ] Proper code splitting considerations

---

## Token Management 🎨

### Adding New Design Tokens

#### Before Adding Tokens
- [ ] Check if semantic token already exists
- [ ] Verify token fits existing categories
- [ ] Ensure token name expresses intent, not appearance
- [ ] Document token purpose and usage

#### Token Addition Process
1. **Add Primitive Token** (if needed)
   ```css
   --color-purple-500: #8b5cf6;
   ```

2. **Create Semantic Token**
   ```css
   --color-interactive-accent: var(--color-purple-500);
   ```

3. **Add Dark Theme Variant**
   ```css
   [data-theme="dark"] {
     --color-interactive-accent: #a78bfa;
   }
   ```

4. **Register in globals.css**
   ```css
   --color-interactive-accent: var(--color-interactive-accent);
   ```

#### Token Validation Checklist
- [ ] Token added to both light and dark themes
- [ ] Token registered in `globals.css` @theme inline
- [ ] Token name follows semantic naming convention
- [ ] Token accessible via Tailwind classes
- [ ] No hardcoded fallback values

---

## Pre-Commit Validation ✨

### Automated Checks
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes without warnings
- [ ] TypeScript compilation successful
- [ ] All imports resolve correctly

### Manual Code Review
- [ ] No hardcoded design values (`bg-blue-500`, `px-4`, `text-white`)
- [ ] All components use semantic tokens exclusively
- [ ] Theme switching works on all new components
- [ ] Component APIs are consistent with existing patterns
- [ ] No unused imports or dead code

### Theme Switching Test
- [ ] Component renders correctly in light theme
- [ ] Component renders correctly in dark theme
- [ ] Theme toggle transitions smoothly
- [ ] No visual breaks during theme switch
- [ ] All interactive states work in both themes

---

## Anti-Patterns to Avoid ❌

### Never Do This
```typescript
// ❌ WRONG: Hardcoded values
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">

// ❌ WRONG: Theme-aware components
const isDark = theme === 'dark';
<div className={isDark ? 'bg-gray-800' : 'bg-white'}>

// ❌ WRONG: Mixing concerns
const Button = ({ color }) => (
  <button style={{ backgroundColor: color }}>
);
```

### Always Do This
```typescript
// ✅ CORRECT: Semantic tokens
<button className="bg-interactive-primary hover:bg-interactive-primary-hover text-foreground-on-interactive px-container-padding py-element-gap">

// ✅ CORRECT: Thematically blind
<div className="bg-surface-background text-text-primary">

// ✅ CORRECT: Semantic variants
const Button = ({ variant = 'primary' }) => {
  const variants = {
    primary: 'bg-interactive-primary text-foreground-on-interactive'
  };
  return <button className={variants[variant]} />;
};
```

---

## Navigation Component Standards 🧭

### TopBar Component Requirements
- [ ] Uses fixed positioning (`fixed top-0 left-0 right-0 z-50`)
- [ ] Background uses `bg-surface-card border-b border-interactive-secondary`
- [ ] Height is standardized to `h-16`
- [ ] Padding uses semantic token `px-container-padding`
- [ ] Contains hamburger menu trigger using Lucide `Menu` icon
- [ ] Brand/logo section with hover states using semantic tokens
- [ ] Optional center content area for search/breadcrumbs
- [ ] Actions section for theme toggle and other controls
- [ ] All interactive elements use semantic hover states

### Sidebar Component Requirements
- [ ] Uses semantic background `bg-surface-card`
- [ ] Full height with proper flex layout (`flex flex-col h-full`)
- [ ] Header section with `p-container-padding border-b border-interactive-secondary`
- [ ] Navigation title uses `text-text-primary`
- [ ] Scrollable navigation area (`flex-1 overflow-y-auto`)
- [ ] Navigation links use Button component with semantic variants
- [ ] Active links use `secondary` variant, inactive use `ghost`
- [ ] Inactive links use `text-text-secondary hover:text-text-primary`
- [ ] Footer section with app version/info
- [ ] All Lucide icons sized consistently (`h-4 w-4 flex-shrink-0`)

### Sheet Component Requirements
- [ ] Built on `@radix-ui/react-dialog` primitive
- [ ] Uses `class-variance-authority` for variant management
- [ ] Implements proper accessibility (SheetTitle, SheetDescription)
- [ ] Overlay uses transparent background with fade animations
- [ ] Content uses proper z-index layering (`z-65` content, `z-60` overlay)
- [ ] Left-side variant uses `inset-y-0 left-0` positioning
- [ ] Animation timing: `duration-500` open, `duration-300` close
- [ ] Close button positioned consistently (`right-4 top-4`)
- [ ] All animations use `data-[state]` attributes
- [ ] Proper cleanup via SheetPortal

### Animation Standards
- [ ] Opening animation uses `data-[state=open]:slide-in-from-left`
- [ ] Closing animation uses `data-[state=closed]:slide-out-to-left`
- [ ] Overlay fade uses `fade-in-0` and `fade-out-0`
- [ ] Timing follows professional standards (500ms/300ms)
- [ ] All animations use `ease-in-out` timing function
- [ ] No JavaScript-based animations (CSS only)
- [ ] Animations work smoothly across all devices

---

## Component Categories & Standards 📚

### Interactive Components
- [ ] Use `bg-interactive-*` tokens for backgrounds
- [ ] Use `text-foreground-on-interactive` for text on colored backgrounds
- [ ] Include hover states: `hover:bg-interactive-*-hover`
- [ ] Support disabled state: `disabled:opacity-50`
- [ ] Include focus styles: `focus:outline-none focus:ring-2`

### Layout Components
- [ ] Use `bg-surface-*` tokens for backgrounds
- [ ] Use semantic spacing: `p-container-padding`, `gap-component-gap`
- [ ] Support responsive design patterns
- [ ] Maintain proper semantic HTML structure

### Typography Components
- [ ] Use `text-text-*` tokens for all text colors
- [ ] Support text hierarchy: `text-text-primary`, `text-text-secondary`
- [ ] Include accent text option: `text-text-accent`
- [ ] Maintain proper heading hierarchy

---

## File Organization Standards 📁

### Component Files
- [ ] Components in `src/components/ui/` for shadcn components
- [ ] Custom components in `src/components/`
- [ ] One component per file
- [ ] Export from component file directly
- [ ] Proper file naming: PascalCase matching component name

### Styling Files
- [ ] Design tokens in `src/styles/tokens.css`
- [ ] Global styles in `src/app/globals.css`
- [ ] No component-specific CSS files
- [ ] All styling through Tailwind + semantic tokens

---

## Testing Standards 🧪

### Manual Testing Checklist
- [ ] Component renders in both light and dark themes
- [ ] All interactive states work (hover, focus, active, disabled)
- [ ] Responsive behavior works across screen sizes
- [ ] Accessibility features function correctly
- [ ] Performance is acceptable (no lag/jank)

### Navigation-Specific Testing
- [ ] Hamburger menu opens sidebar with smooth 500ms animation
- [ ] Sidebar closes with smooth 300ms animation
- [ ] Click outside sidebar closes navigation
- [ ] ESC key closes navigation
- [ ] All navigation links work and show active states
- [ ] Sidebar scrolls properly with many navigation items
- [ ] Theme toggle works from sidebar open state
- [ ] Mobile responsiveness (280px sidebar on small screens)
- [ ] Keyboard navigation works (tab order, enter/space activation)
- [ ] Screen reader announces navigation state changes
- [ ] No animation lag or jank on low-end devices
- [ ] Navigation state persists during theme switches

### Cross-Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge (if applicable)

---

## Documentation Requirements 📖

### Component Documentation
- [ ] Component purpose clearly documented
- [ ] All props and their types documented
- [ ] Usage examples provided
- [ ] Accessibility notes included
- [ ] Design token dependencies listed

### Architecture Updates
- [ ] New patterns documented in README.md
- [ ] Token additions documented
- [ ] Breaking changes noted
- [ ] Migration guides provided if needed

---

## Final Compliance Score Calculation 📊

**To achieve 100% compliance, ALL boxes must be checked.**

### Scoring Guide:
- **100%**: All requirements met, zero violations
- **95-99%**: Minor violations, easily fixable
- **90-94%**: Some violations, requires attention
- **Below 90%**: Major violations, component needs refactoring

### Quick Compliance Check Command:
```bash
# Run this before every commit
npm run build && npm run lint && echo "✅ Build successful - checking for hardcoded values..." && grep -r "bg-blue\|text-white\|px-[0-9]\|py-[0-9]" src/ || echo "✅ No hardcoded values found"
```

### Navigation System Compliance Check:
```bash
# Check for navigation system compliance
echo "🧭 Checking navigation system compliance..."

# Check required files exist
test -f "src/components/navigation/TopBar.tsx" && echo "✅ TopBar component found" || echo "❌ TopBar component missing"
test -f "src/components/navigation/Sidebar.tsx" && echo "✅ Sidebar component found" || echo "❌ Sidebar component missing"
test -f "src/components/ui/sheet.tsx" && echo "✅ Sheet component found" || echo "❌ Sheet component missing"

# Check for required dependencies
pnpm list @radix-ui/react-dialog > /dev/null && echo "✅ Radix UI Dialog installed" || echo "❌ Radix UI Dialog missing"
pnpm list lucide-react > /dev/null && echo "✅ Lucide React installed" || echo "❌ Lucide React missing"
pnpm list tailwindcss-animate > /dev/null && echo "✅ tailwindcss-animate installed" || echo "❌ tailwindcss-animate missing"

# Check for semantic token usage in navigation
grep -q "bg-surface-card" src/components/navigation/TopBar.tsx && echo "✅ TopBar uses semantic tokens" || echo "❌ TopBar missing semantic tokens"
grep -q "text-text-secondary" src/components/navigation/Sidebar.tsx && echo "✅ Sidebar uses semantic tokens" || echo "❌ Sidebar missing semantic tokens"

echo "🧭 Navigation compliance check complete!"
```

---

## Emergency Fixes 🚨

### If Build Fails:
1. Check TypeScript errors: `npx tsc --noEmit`
2. Check import paths and missing dependencies
3. Verify all semantic tokens are defined
4. Check for typos in token names

### If Theme Switching Breaks:
1. Verify `data-theme` attribute is being set
2. Check token definitions in both light/dark themes
3. Ensure globals.css imports tokens.css
4. Validate @theme inline block in globals.css

### If Components Look Wrong:
1. Check if semantic tokens are properly defined
2. Verify Tailwind is recognizing custom tokens
3. Check browser dev tools for CSS custom property values
4. Ensure component is not using hardcoded values

---

**💡 Pro Tip: Print this checklist and keep it at your desk. Better yet, create a pre-commit hook that enforces these standards automatically!**

---

*This checklist ensures every component and feature maintains the highest agency standards and architectural integrity.*