# Professional Development Standards: Next.js 15 + React 19 + TypeScript + Tailwind CSS (2024)

## Component Architecture & CSS Standards (Default Tailwind Approach)

### Professional Agency Requirements

## 1. Overview and Core Philosophy

This standard uses **default Tailwind CSS tokens** with utility-first development for maximum consistency across agency projects. No custom design tokens - only Tailwind's built-in design system for standardization and learning efficiency.

| Technology | Purpose | Benefit |
| :--- | :--- | :--- |
| **Default Tailwind CSS** | Utility-first styling with standard tokens | Consistent across all agency projects, easy onboarding |
| **TypeScript** | Type safety and better DX | Catch errors early, excellent IntelliSense |
| **Next.js 15 App Router** | Modern React framework | Server components, file-based routing |
| **CSS Modules** | Complex styles only when needed | Scoped styles for advanced cases |

-----

## 2. File Structure (Industry Standard)

```
/src/
├── app/                           # Next.js App Router
│   ├── globals.css                # Tailwind imports + minimal custom styles
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Homepage
│   ├── loading.tsx                # Loading UI
│   ├── error.tsx                  # Error UI
│   └── (dashboard)/               # Route groups
│       ├── layout.tsx
│       └── page.tsx
├── components/                    # Reusable UI components
│   ├── ui/                        # Basic UI primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   └── features/                  # Feature-specific components
│       ├── header.tsx
│       └── footer.tsx
├── lib/                           # Utilities and configurations
│   ├── utils.ts                   # Helper functions
│   └── cn.ts                      # Class name utility
└── types/                         # Global TypeScript types
    └── index.ts
```

-----

## 3. Globals CSS (Minimal Custom Setup)

```css
/* /src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Only essential base styles */
html {
  scroll-behavior: smooth;
}

body {
  font-feature-settings: "rlig" 1, "calt" 1;
}

/* Custom component patterns using default Tailwind tokens */
@layer components {
  .btn {
    @apply inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50;
  }

  .btn-primary {
    @apply bg-primary text-primary-foreground hover:bg-primary/90;
  }

  .btn-secondary {
    @apply bg-secondary text-secondary-foreground hover:bg-secondary/80;
  }
}
```

-----

## 4. Component Development Standards

### 4.1. Basic Component Pattern

```tsx
// /src/components/ui/button.tsx
import { cn } from '@/lib/cn';
import { type VariantProps, cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export function Button({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
}

export { buttonVariants };
export type { ButtonProps };
```

### 4.2. Card Component

```tsx
// /src/components/ui/card.tsx
import { cn } from '@/lib/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
      {children}
    </div>
  );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function CardDescription({
  className,
  children,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div className={cn('flex items-center p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}
```

-----

## 5. Layout Patterns with Default Tailwind

### 5.1. Root Layout

```tsx
// /src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional App',
  description: 'Built with Next.js, TypeScript, and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
```

### 5.2. Page Component

```tsx
// /src/app/page.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to Professional App
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Built with industry-standard technologies and best practices.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Feature One</CardTitle>
              <CardDescription>
                Description of the first feature using default Tailwind tokens.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button>Learn More</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Two</CardTitle>
              <CardDescription>
                Another feature showcasing consistent design patterns.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary">Explore</Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Feature Three</CardTitle>
              <CardDescription>
                Final feature demonstrating responsive grid layout.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Get Started</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
```

-----

## 6. Utility Functions

### 6.1. Class Name Utility

```ts
// /src/lib/cn.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 6.2. General Utilities

```ts
// /src/lib/utils.ts
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

-----

## 7. Default Tailwind Tokens Reference

### 7.1. Spacing Scale (Use Default)
- `p-1` through `p-96` (4px to 384px)
- `m-1` through `m-96`
- `space-x-*` and `space-y-*` for consistent gaps

### 7.2. Color System (Use Default)
- `bg-primary`, `bg-secondary`, `bg-accent`
- `text-primary`, `text-secondary`, `text-muted-foreground`
- `border-primary`, `border-secondary`

### 7.3. Typography Scale (Use Default)
- `text-xs` through `text-9xl`
- `font-thin` through `font-black`
- `leading-none` through `leading-loose`

### 7.4. Layout Utilities (Use Default)
- `grid-cols-1` through `grid-cols-12`
- `flex`, `flex-col`, `flex-row`
- `gap-1` through `gap-96`

-----

## 8. Professional Standards Checklist

### ✅ Component Standards
- [ ] Use default Tailwind tokens only
- [ ] TypeScript interfaces for all props
- [ ] Consistent file naming (kebab-case)
- [ ] Export types alongside components
- [ ] Use `cn()` utility for conditional classes

### ✅ File Organization
- [ ] Clear separation: ui/ vs features/
- [ ] One component per file
- [ ] Consistent import/export patterns
- [ ] lib/ for utilities and helpers

### ✅ Styling Standards
- [ ] Utility-first approach
- [ ] Component layer only for reusable patterns
- [ ] No custom CSS unless absolutely necessary
- [ ] Responsive design with mobile-first

### ✅ TypeScript Standards
- [ ] Strict mode enabled
- [ ] Proper interface definitions
- [ ] Generic types where appropriate
- [ ] Path mapping configured (@/ imports)

-----

## 9. Benefits of This Approach

### 9.1. Agency Consistency
- **Standardized Design:** All projects use same Tailwind tokens
- **Easy Onboarding:** Developers only need to learn standard Tailwind
- **Code Portability:** Components work across projects
- **Maintenance:** Updates apply consistently across agency

### 9.2. Learning Benefits
- **Pure Tailwind:** Learn actual Tailwind, not custom abstractions
- **Transferable Skills:** Knowledge applies to any Tailwind project
- **Documentation:** Official Tailwind docs are your reference
- **Community:** Access to full Tailwind ecosystem

### 9.3. Performance Benefits
- **Optimized Builds:** Tailwind CSS purging removes unused styles
- **Small Bundle:** Only styles actually used are included
- **Fast Development:** No time spent creating custom design systems
- **Proven Patterns:** Battle-tested utility classes

This approach ensures all agency projects maintain consistency while teaching developers industry-standard Tailwind CSS patterns.