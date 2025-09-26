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
8. [Migration Guide](#migration-guide)

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