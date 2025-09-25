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
- **CSS Framework**: Tailwind CSS 3.4+
- **UI Components**: shadcn/ui (CLI copy only - no npm packages)
- **Design System**: Semantic design tokens with CSS custom properties

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