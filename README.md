# Agency Development Standards & Architecture Guide

> **The definitive reference for building scalable, maintainable applications across all agency projects**

This document establishes the unified architectural standards and development practices that ensure consistency, maintainability, and future-proofing across all agency projects. Every developer must follow these standards when building new projects from scratch.

## Table of Contents

1. [Tech Stack (Exact Specifications)](#tech-stack-exact-specifications)
2. [Architectural Philosophy](#architectural-philosophy)
3. [Design Token System](#design-token-system)
4. [Component Architecture](#component-architecture)
5. [Implementation Guidelines](#implementation-guidelines)
6. [Project Setup](#project-setup)
7. [Best Practices](#best-practices)
8. [Multi-Client Theming System](#multi-client-theming-system)
9. [Migration Guide](#migration-guide)

---

## Tech Stack (Exact Specifications)

### Core Framework & Language
- **Framework**: Next.js (App Router) 15.x
- **Language**: TypeScript 5.x (strict mode)
- **Runtime**: Node.js 20 LTS
- **Package Manager**: pnpm

### Styling & UI
- **CSS Framework**: Tailwind CSS 4.x
- **UI Components**: shadcn/ui + Radix UI primitives
- **Design System**: Semantic design tokens with CSS custom properties
- **Icons**: Lucide React (standardized across all projects)
- **Animations**: Radix UI + tailwindcss-animate for professional navigation

### Backend & Database
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma 5.x
- **Authentication**: Clerk (DISABLED by default; enable when needed)

### Deployment & Infrastructure
- **Platform**: Vercel
- **Environment**: Production-ready with proper CI/CD

---

## Architectural Philosophy

### The Problem: Tight Coupling Anti-Pattern

Traditional hardcoded styling creates architectural debt:

```typescript
// ❌ ANTI-PATTERN: Hardcoded styles
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">
  Submit
</button>
```

**Problems:**
- Brittle to changes (rebranding, dark mode, client themes)
- Inconsistent visual language
- Maintenance nightmare at scale
- Violates separation of concerns

### The Solution: Semantic Design Tokens

Components should be **thematically blind** - they express intent, not appearance:

```typescript
// ✅ CORRECT: Semantic tokens
<button className="bg-interactive-primary hover:bg-interactive-primary-hover text-foreground-primary px-container-padding py-button-padding">
  Submit
</button>
```

**Benefits:**
- Instant theme switching
- Consistent visual language
- Future-proof architecture
- Clean separation of concerns

---

## Design Token System

### Token Hierarchy

Our design system uses a two-layer token architecture:

#### 1. Primitive Tokens (Raw Values)
```css
/* Base ingredients - the raw materials */
--color-blue-500: #3b82f6;
--color-red-600: #dc2626;
--spacing-4: 1rem;
--font-size-lg: 1.125rem;
```

#### 2. Semantic Tokens (Intent-Based)
```css
/* Purpose-driven naming - the meaning */
--color-interactive-primary: var(--color-blue-500);
--color-semantic-danger: var(--color-red-600);
--space-container-padding: var(--spacing-4);
--text-size-body: var(--font-size-lg);
```

### Token Categories

#### Interactive States
```css
--color-interactive-primary: /* Primary actions */
--color-interactive-secondary: /* Secondary actions */
--color-interactive-success: /* Success states */
--color-interactive-warning: /* Warning states */
--color-interactive-danger: /* Danger/destructive actions */
--color-interactive-disabled: /* Disabled states */
```

#### Surface Elevations
```css
--color-surface-background: /* Main background */
--color-surface-card: /* Card backgrounds */
--color-surface-overlay: /* Modal/overlay backgrounds */
--color-surface-elevated: /* Elevated surfaces */
```

#### Text Hierarchies
```css
--color-text-primary: /* Primary text */
--color-text-secondary: /* Secondary text */
--color-text-muted: /* Muted text */
--color-text-accent: /* Accent text */
```

#### Spacing System
```css
--space-container-padding: /* Standard container padding */
--space-section-gap: /* Space between sections */
--space-component-gap: /* Space between components */
--space-element-gap: /* Space between elements */
```

---

## Modern Navigation Architecture

### Ultra-Portable Navigation System

Our navigation architecture combines Radix UI primitives with semantic design tokens to create a truly portable, professional-grade navigation system that works across any client project.

### Key Technologies
- **Radix UI Dialog**: Foundation for Sheet-based mobile navigation
- **Lucide React**: Consistent icon library across all agency projects
- **Semantic Tokens**: Theme-agnostic styling system
- **tailwindcss-animate**: Professional slide animations

### Navigation Component Structure

#### 1. TopBar Component (Agency Standard)
```typescript
// src/components/navigation/TopBar.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Home, FileText, Settings, Users, BarChart3 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Sidebar } from './Sidebar'

// Navigation configuration - inline for portability
interface NavItem {
  href: string
  label: string
  icon: LucideIcon
  description?: string
  requiresAuth?: boolean
}

const NAVIGATION: NavItem[] = [
  {
    href: '/',
    label: 'Dashboard',
    icon: Home,
    description: 'Dashboard overview and analytics',
    requiresAuth: false
  },
  // ... more navigation items
]

export function TopBar({ children, actions }: TopBarProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-card border-b border-interactive-secondary">
        <div className="flex items-center justify-between h-16 px-container-padding">
          <div className="flex items-center gap-element-gap">
            {/* Radix UI Sheet Navigation */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-element-gap py-element-gap"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="w-[280px] sm:w-[300px] p-0"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Main navigation for the application
                </SheetDescription>
                <Sidebar
                  navigation={NAVIGATION}
                  isActive={isActive}
                  onLinkClick={() => setOpen(false)}
                />
              </SheetContent>
            </Sheet>

            <Link
              href="/"
              className="font-semibold text-lg text-text-primary hover:text-text-accent transition-colors"
            >
              Application
            </Link>
          </div>

          {/* Center content */}
          {children && (
            <div className="hidden md:flex flex-1 max-w-2xl mx-component-gap">
              {children}
            </div>
          )}

          {/* Actions (theme toggle, etc.) */}
          <div className="flex items-center gap-element-gap">
            {actions}
          </div>
        </div>
      </header>
    </>
  )
}
```

#### 2. Professional Sidebar Component
```typescript
// src/components/navigation/Sidebar.tsx
export function Sidebar({ navigation, isActive, onLinkClick, className }: SidebarProps) {
  return (
    <nav className={cn('flex flex-col h-full bg-surface-card', className)}>
      {/* Header Section */}
      <div className="p-container-padding border-b border-interactive-secondary">
        <h2 className="font-semibold text-lg text-text-primary">Navigation</h2>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-1 p-element-gap">
          {navigation.map((item) => (
            <Button
              key={item.href}
              variant={isActive(item.href) ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start gap-element-gap h-11',
                !isActive(item.href) && 'text-text-secondary hover:text-text-primary'
              )}
              asChild
            >
              <Link
                href={item.href}
                onClick={onLinkClick}
                aria-current={isActive(item.href) ? 'page' : undefined}
                title={item.description}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {item.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="p-container-padding border-t border-interactive-secondary">
        <div className="text-xs text-text-muted">
          Application v1.0
        </div>
      </div>
    </nav>
  )
}
```

#### 3. Radix UI Sheet Component (shadcn/ui compliant)
```typescript
// src/components/ui/sheet.tsx
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetClose = SheetPrimitive.Close
const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-60 bg-transparent data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))

const sheetVariants = cva(
  "fixed z-65 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 w-full max-w-sm border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & VariantProps<typeof sheetVariants>
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
```

### Navigation Features

#### Professional Animation System
- **500ms slide-in duration** for smooth, deliberate opening
- **300ms slide-out duration** for responsive closing
- **Full-height sidebar** using `inset-y-0` positioning
- **Transparent overlay** with proper fade animations
- **Native browser performance** via Radix UI primitives

#### Agency-Standard Portability
- **Inline navigation configuration** - easy to copy between projects
- **Self-contained components** - no external dependencies beyond Radix UI
- **Semantic token integration** - automatic theme compliance
- **Accessibility built-in** - ARIA labels, keyboard navigation, screen reader support

#### Client Customization Ready
- **Theme-agnostic styling** - works with any color scheme
- **Configurable branding** - easy logo/title replacement
- **Flexible layouts** - center content area, action buttons
- **Responsive design** - mobile-first with progressive enhancement

---

## Component Architecture

### Component Purity Principle

Components must be **functionally pure** regarding styling:

```typescript
// ✅ PURE COMPONENT: Expresses intent only
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant, children, onClick }: ButtonProps) {
  const variantClasses = {
    primary: 'bg-interactive-primary text-foreground-primary',
    secondary: 'bg-interactive-secondary text-foreground-secondary',
    danger: 'bg-interactive-danger text-foreground-primary'
  };

  return (
    <button 
      className={`px-container-padding py-button-padding rounded ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Component Responsibilities

**Components SHOULD:**
- Manage state and business logic
- Handle user interactions
- Express semantic styling intent
- Be functionally pure regarding visuals

**Components SHOULD NOT:**
- Know specific color values
- Contain hardcoded spacing
- Be coupled to specific themes
- Mix styling concerns with logic

---

## Implementation Guidelines

### 1. Token Definition (CSS Custom Properties)

Create a centralized token file:

```css
/* tokens.css */
:root {
  /* Primitive Tokens */
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --color-red-500: #ef4444;
  --color-red-600: #dc2626;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  
  /* Semantic Tokens */
  --color-interactive-primary: var(--color-blue-500);
  --color-interactive-primary-hover: var(--color-blue-600);
  --color-semantic-danger: var(--color-red-500);
  --color-semantic-danger-hover: var(--color-red-600);
  --space-container-padding: var(--spacing-4);
  --space-section-gap: var(--spacing-6);
}

/* Dark Theme */
[data-theme="dark"] {
  --color-interactive-primary: #60a5fa;
  --color-interactive-primary-hover: #3b82f6;
  --color-semantic-danger: #f87171;
  --color-semantic-danger-hover: #ef4444;
}
```

### 2. Tailwind Integration

Configure Tailwind to use semantic tokens:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'interactive-primary': 'var(--color-interactive-primary)',
        'interactive-primary-hover': 'var(--color-interactive-primary-hover)',
        'semantic-danger': 'var(--color-semantic-danger)',
        'semantic-danger-hover': 'var(--color-semantic-danger-hover)',
      },
      spacing: {
        'container-padding': 'var(--space-container-padding)',
        'section-gap': 'var(--space-section-gap)',
      }
    }
  }
}
```

### 3. Component Implementation

```typescript
// components/ui/Button.tsx
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick, 
  disabled 
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-interactive-primary hover:bg-interactive-primary-hover text-foreground-primary',
    secondary: 'bg-interactive-secondary hover:bg-interactive-secondary-hover text-foreground-secondary',
    danger: 'bg-semantic-danger hover:bg-semantic-danger-hover text-foreground-primary'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-container-padding py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={cn(
        'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

---

## Project Setup

### 1. Initialize Next.js Project

```bash
npx create-next-app@latest project-name --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd project-name
```

### 2. Install Dependencies

```bash
# Core dependencies
pnpm add @prisma/client prisma
pnpm add @clerk/nextjs

# UI & Navigation dependencies
pnpm add @radix-ui/react-dialog
pnpm add class-variance-authority
pnpm add lucide-react
pnpm add tailwindcss-animate

# Development dependencies
pnpm add -D @types/node
```

### 3. Configure Prisma

```bash
npx prisma init
```

### 4. Setup shadcn/ui

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input
```

### 5. Setup Navigation System

```bash
# Create navigation component structure
mkdir -p src/components/navigation
mkdir -p src/components/ui

# Copy the Radix UI Sheet component to src/components/ui/sheet.tsx
# Copy TopBar and Sidebar components to src/components/navigation/
# Update globals.css with tailwindcss-animate import
```

### 5. Create Token System

```bash
mkdir -p src/styles
touch src/styles/tokens.css
```

### 6. Environment Setup

```bash
# .env.local
DATABASE_URL="your-neon-database-url"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
```

---

## Best Practices

### ✅ DO

1. **Always use semantic tokens** for styling components
2. **Keep components thematically blind** - they express intent, not appearance
3. **Centralize token definitions** in a single source of truth
4. **Use TypeScript strictly** - enable all strict mode options
5. **Follow the component purity principle** - separate logic from presentation
6. **Implement proper error boundaries** and loading states
7. **Use proper accessibility patterns** (ARIA labels, keyboard navigation)
8. **Write semantic HTML** with proper heading hierarchy

### ❌ DON'T

1. **Never hardcode colors, spacing, or other style values** in components
2. **Don't mix styling concerns with business logic**
3. **Don't create components that know about specific themes**
4. **Don't use inline styles** except for dynamic values
5. **Don't skip TypeScript strict mode**
6. **Don't ignore accessibility requirements**
7. **Don't create tightly coupled components**

### Code Quality Standards

```typescript
// ✅ GOOD: Semantic, type-safe, accessible
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  onAddToCart: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="bg-surface-card p-container-padding rounded-lg shadow-sm">
      <img 
        src={product.imageUrl} 
        alt={`${product.name} product image`}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-text-primary font-semibold mt-4">
        {product.name}
      </h3>
      <p className="text-text-secondary mt-2">
        ${product.price.toFixed(2)}
      </p>
      <Button 
        variant="primary" 
        onClick={() => onAddToCart(product.id)}
        className="mt-4 w-full"
      >
        Add to Cart
      </Button>
    </article>
  );
}
```

---

## Multi-Client Theming System

### Enterprise White-Labeling Architecture

Our multi-client theming system extends the semantic design token architecture to support unlimited client brands without any code changes. This system enables true white-labeling at scale.

### Core Architecture

#### Theme Structure

The system uses a hybrid approach that combines client brands with light/dark modes:

```css
/* Base semantic tokens (unchanged) */
:root {
  --color-interactive-primary: #3b82f6;
  --color-text-primary: #1f2937;
}

/* Client-specific overrides */
[data-theme="client-b"] {
  --color-interactive-primary: #10b981; /* Emerald brand */
}

[data-theme="client-c"] {
  --color-interactive-primary: #8b5cf6; /* Violet brand */
}

/* Hybrid themes (client + mode) */
[data-theme="client-b-dark"] {
  --color-interactive-primary: #34d399; /* Emerald dark mode */
  --color-surface-background: #064e3b;
}
```

### Implementation Guide

#### 1. Client Theme Configuration

```typescript
// src/lib/themes.ts
export type ClientBrand = 'client-a' | 'client-b' | 'client-c' | 'client-d';
export type ThemeMode = 'light' | 'dark';

export const CLIENT_THEMES: Record<ClientBrand, ClientThemeConfig> = {
  'client-a': {
    id: 'client-a',
    name: 'Azure Professional',
    primaryColor: '#3b82f6',
  },
  'client-b': {
    id: 'client-b',
    name: 'Emerald Enterprise',
    primaryColor: '#10b981',
  },
  // ... additional clients
}
```

#### 2. Theme Provider Setup

```typescript
// app/layout.tsx
import { ClientThemeProvider } from '@/components/theme/ClientThemeProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientThemeProvider autoDetectClient={true}>
          <ClientThemeInitializer />
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}
```

#### 3. Automatic Client Detection

The system automatically detects which client theme to apply through multiple methods:

```typescript
// Priority order:
// 1. URL parameter: ?client=client-b
// 2. Path-based: /client-b/dashboard
// 3. Subdomain: client-b.yourapp.com
// 4. Environment variable: NEXT_PUBLIC_DEFAULT_CLIENT

export class ThemeManager {
  static detectClient(): ClientBrand {
    // URL parameter detection
    const urlParams = new URLSearchParams(window.location.search);
    const clientParam = urlParams.get('client') as ClientBrand;
    if (clientParam && CLIENT_THEMES[clientParam]) {
      return clientParam;
    }

    // Subdomain detection
    const subdomain = window.location.hostname.split('.')[0];
    if (subdomain.startsWith('client-') && CLIENT_THEMES[subdomain as ClientBrand]) {
      return subdomain as ClientBrand;
    }

    return 'client-a'; // Default fallback
  }
}
```

#### 4. Theme Switching Components

```typescript
// components/theme/ThemeSwitcher.tsx
export function ThemeSwitcher() {
  const { client, mode, setClient, toggleMode } = useClientTheme();

  return (
    <div className="space-y-4">
      {/* Client Brand Selector */}
      <div className="flex gap-2">
        {ALL_CLIENTS.map((clientId) => (
          <Button
            key={clientId}
            variant={client === clientId ? 'primary' : 'outline'}
            onClick={() => setClient(clientId)}
          >
            {CLIENT_THEMES[clientId].name}
          </Button>
        ))}
      </div>

      {/* Light/Dark Toggle */}
      <Button variant="outline" onClick={toggleMode}>
        {mode === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </Button>
    </div>
  );
}
```

### Component Integration

Components automatically adapt to all client themes without any code changes:

```typescript
// components/ui/Button.tsx (unchanged!)
const buttonVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        // These semantic tokens automatically adapt to any client theme
        primary: "bg-interactive-primary text-foreground-on-interactive hover:bg-interactive-primary-hover",
        secondary: "bg-interactive-secondary text-text-primary hover:bg-interactive-secondary-hover",
      },
    },
  }
)

// Usage (works with any client theme)
<Button variant="primary">Submit</Button>
```

### Framer → Code Translation

This system maintains the exact same mental model as Framer's component variants:

| Framer Concept | Multi-Client Implementation |
|---|---|
| Component Variants | CVA variants with semantic tokens |
| Theme Override | `[data-theme]` CSS selectors |
| Property Panel | TypeScript props interface |
| Design Tokens | CSS custom properties |
| Auto Layout | Semantic spacing tokens |

### Adding New Clients

Adding a new client requires only CSS - no component changes:

```css
/* Step 1: Add client theme in tokens.css */
[data-theme="client-e"] {
  --color-interactive-primary: #f59e0b; /* Orange brand */
  --color-text-accent: #f59e0b;
  --color-surface-background: #fffbeb;
}

[data-theme="client-e-dark"] {
  --color-interactive-primary: #fbbf24; /* Orange dark */
  --color-surface-background: #78350f;
}
```

```typescript
// Step 2: Add to theme configuration
export const CLIENT_THEMES = {
  // ... existing clients
  'client-e': {
    id: 'client-e',
    name: 'Orange Finance',
    primaryColor: '#f59e0b',
  },
} as const;
```

That's it! All existing components automatically work with the new client theme.

### Production Deployment Strategies

#### Strategy 1: Multi-Tenant Single Deployment
```bash
# Single app serving all clients with auto-detection
https://yourapp.com?client=client-b
https://client-b.yourapp.com
https://yourapp.com/client-b/dashboard
```

#### Strategy 2: Dedicated Client Deployments
```bash
# Environment-based client selection
NEXT_PUBLIC_DEFAULT_CLIENT=client-b

# Separate deployments per client
https://client-b-app.vercel.app
https://client-c-app.vercel.app
```

#### Strategy 3: Path-Based Routing
```bash
# Next.js dynamic routing
/[client]/dashboard → /client-b/dashboard
/[client]/settings → /client-c/settings
```

### Performance Considerations

- **Zero JavaScript Required**: Theme switching uses CSS custom properties
- **Minimal Bundle Impact**: Only adds ~2KB for theme management
- **Runtime Theme Switching**: Instant theme changes without page reload
- **SSR Compatible**: Server-side client detection supported

### Testing Multi-Client Themes

```typescript
// Test utility for visual regression testing
export function TestAllThemes({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {ALL_CLIENTS.map(client => (
        <div key={client} data-theme={client} className="p-4 border">
          <h3>{CLIENT_THEMES[client].name}</h3>
          {children}
        </div>
      ))}
    </div>
  );
}

// Usage in Storybook or test environments
<TestAllThemes>
  <Button variant="primary">Test Button</Button>
  <Card>Test Card</Card>
</TestAllThemes>
```

### Migration from Single-Theme Apps

1. **Assess Current Architecture**: Identify hardcoded theme values
2. **Implement Base Token System**: Convert to semantic tokens first
3. **Add Client Configuration**: Define client theme mappings
4. **Setup Theme Provider**: Wrap app with ClientThemeProvider
5. **Test Theme Switching**: Verify all components adapt correctly
6. **Deploy Multi-Client**: Choose deployment strategy

### File Structure

```
src/
├── components/
│   ├── theme/
│   │   ├── ClientThemeProvider.tsx    # Main theme context
│   │   ├── ThemeSwitcher.tsx         # UI switching components
│   │   └── ClientThemeInitializer.tsx # Auto-detection logic
│   └── ui/
│       └── Button.tsx                # Unchanged - auto-adapts
├── lib/
│   └── themes.ts                     # Theme configuration & utilities
├── styles/
│   ├── tokens.css                    # Multi-client token definitions
│   └── globals.css                   # Tailwind integration
└── app/
    ├── layout.tsx                    # Theme provider setup
    └── theme-demo/                   # Live demonstration page
        └── page.tsx
```

### Demo and Documentation

- **Live Demo**: Visit `/theme-demo` to see all client themes in action
- **Component Showcase**: See how all variants adapt across themes
- **Framer Translation Guide**: Complete guide in `framer-translation.md`
- **Compliance Checklist**: Verification checklist in `COMPLIANCE_CHECKLIST.md`

This multi-client theming system delivers enterprise-grade white-labeling capabilities while maintaining the intuitive Framer-to-code workflow that designers and developers both understand.

---

## Migration Guide

### Converting Existing Projects

1. **Audit Current Styles**
   - Identify all hardcoded values
   - Categorize by semantic purpose
   - Create token mapping

2. **Create Token System**
   - Define primitive tokens
   - Create semantic token layer
   - Implement theme switching capability

3. **Refactor Components**
   - Replace hardcoded values with semantic tokens
   - Maintain component functionality
   - Test visual consistency

4. **Implement Theming**
   - Add theme context/provider
   - Create alternative token sets
   - Test theme switching

### Example Migration

```typescript
// BEFORE: Hardcoded styles
<div className="bg-blue-500 text-white p-4 rounded">
  <button className="bg-red-600 hover:bg-red-700 px-3 py-1">
    Delete
  </button>
</div>

// AFTER: Semantic tokens
<div className="bg-surface-card text-text-primary p-container-padding rounded">
  <button className="bg-semantic-danger hover:bg-semantic-danger-hover px-3 py-1">
    Delete
  </button>
</div>
```

---

## Conclusion

This architecture transforms your application from a static collection of hardcoded styles into a dynamic, adaptable system. By implementing semantic design tokens and component purity principles, you build applications that are:

- **Resilient to change** - rebranding, dark mode, client themes
- **Consistent by design** - enforced through architecture
- **Maintainable at scale** - clear separation of concerns
- **Future-proof** - ready for any visual evolution

**Remember**: Every component should express its visual needs semantically, not literally. Build with meaning and intent, not with fixed, brittle commands.

---

*This document is the single source of truth for agency development standards. All new projects must follow these guidelines without exception.*
```

This comprehensive README.md file consolidates all your architectural guidance into a single, actionable reference document that developers can use to build consistent, scalable applications. It covers:

1. **Exact tech stack specifications** - no ambiguity about versions or tools
2. **Complete architectural philosophy** - the "why" behind the decisions
3. **Detailed design token system** - practical implementation guidance
4. **Component architecture patterns** - how to build thematically blind components
5. **Step-by-step implementation** - concrete code examples
6. **Project setup instructions** - reproducible project initialization
7. **Best practices and anti-patterns** - clear do's and don'ts
8. **Migration guide** - how to convert existing projects

The document serves as both a reference manual and a practical guide that ensures every developer on your team can build applications that follow the same architectural principles, resulting in consistent, maintainable, and future-proof codebases across all agency projects.