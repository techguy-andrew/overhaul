# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Package Management
- Uses `pnpm` as package manager
- Run `pnpm install` to install dependencies

## Project Architecture

### Tech Stack
- **Framework**: Next.js 15.x with App Router and Turbopack
- **Language**: TypeScript 5.x with strict mode
- **Styling**: Tailwind CSS 4.x with semantic design tokens
- **UI Components**: Radix UI primitives with shadcn/ui patterns
- **Icons**: Lucide React
- **Animations**: tailwindcss-animate

### Core Architecture Principles

This project implements a **Framer-style variant system** using semantic design tokens and CSS custom properties. The architecture is built on these key principles:

1. **Thematically Blind Components**: Components express intent, not appearance, using semantic tokens
2. **Multi-Client Theming**: Supports unlimited client brands without code duplication
3. **Instant Theme Switching**: CSS custom properties enable runtime theme changes
4. **Component Variants**: CVA (class-variance-authority) manages type-safe styling variants

### Key Directories

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── navigation/         # TopBar, Sidebar navigation components
│   ├── theme/             # Multi-client theme management
│   ├── ui/                # Reusable UI components
│   └── demo/              # Component showcase/demo components
├── lib/
│   ├── themes.ts          # Multi-client theme configuration
│   ├── navigation.ts      # Navigation configuration
│   └── utils.ts          # Utility functions
└── styles/
    ├── tokens.css         # Semantic design tokens
    └── globals.css        # Global styles and Tailwind imports
```

### Design Token System

The project uses a three-layer token hierarchy:

1. **Primitive Tokens**: Raw values (colors, spacing, etc.)
2. **Semantic Tokens**: Intent-based tokens that reference primitives
3. **Theme Variants**: Client-specific overrides using `[data-theme]` selectors

Example token usage:
```css
/* Semantic tokens in tokens.css */
:root {
  --color-interactive-primary: var(--color-blue-500);
  --color-surface-background: var(--color-gray-50);
}

/* Client-specific themes */
[data-theme="client-b"] {
  --color-interactive-primary: #10b981;
}
```

### Navigation System

The navigation system demonstrates the architecture principles:

- **TopBar Component**: Fixed header with hamburger menu trigger
- **Sidebar Component**: Slide-out navigation using Radix UI Dialog
- **Configuration**: Navigation items defined in `src/lib/navigation.ts`
- **Theming**: Automatically adapts to active client theme

### Multi-Client Theme System

The theme system supports unlimited client brands:

- **Theme Detection**: Automatic detection via URL params, subdomain, or defaults
- **Client Brands**: Defined in `src/lib/themes.ts`
- **Theme Switching**: Runtime switching without page reload
- **Persistence**: User preferences saved to localStorage

### Component Patterns

#### Using CVA for Variants
```typescript
const buttonVariants = cva("base-styles", {
  variants: {
    variant: {
      primary: "bg-interactive-primary text-foreground-primary",
      secondary: "bg-interactive-secondary text-foreground-secondary",
    }
  },
  defaultVariants: { variant: "primary" }
})
```

#### Semantic Token Usage
Always use semantic tokens instead of hardcoded values:
```typescript
// ✅ Good
className="bg-interactive-primary text-text-primary"

// ❌ Avoid
className="bg-blue-500 text-white"
```

## Important Files

### Configuration Files
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration with strict mode
- `next.config.ts` - Next.js configuration
- `src/app/layout.tsx` - Root layout with theme providers

### Core Components
- `src/components/navigation/TopBar.tsx` - Main navigation header
- `src/components/navigation/Sidebar.tsx` - Slide-out navigation
- `src/components/ui/sheet.tsx` - Radix UI Dialog wrapper
- `src/components/theme/ClientThemeProvider.tsx` - Theme context provider

### Theme System
- `src/lib/themes.ts` - Multi-client theme configuration and utilities
- `src/styles/tokens.css` - Semantic design tokens and client themes
- `src/components/theme/ThemeSwitcher.tsx` - Theme switching UI

## Development Guidelines

### Adding New Components
1. Use semantic tokens for all styling
2. Implement variants using CVA
3. Keep components thematically blind
4. Follow TypeScript strict mode patterns

### Adding New Client Themes
1. Add client configuration to `src/lib/themes.ts`
2. Define theme tokens in `src/styles/tokens.css`
3. No component changes needed - automatic adaptation

### Navigation Changes
- Edit `src/lib/navigation.ts` to add/modify navigation items
- Update the `NAVIGATION` array for menu items
- Modify `BRAND` constant for branding changes

### Testing Themes
- Visit `/theme-demo` to see all client themes in action
- Use theme switcher component to test theme changes
- Verify components adapt correctly across all themes

## Performance Notes

- CSS custom properties enable instant theme switching (no JavaScript animations)
- Radix UI provides accessibility and performance optimizations
- Turbopack used for fast development builds
- Components are optimized for zero layout shift during theme changes