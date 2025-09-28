# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production application with Turbopack
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint with Next.js TypeScript config

## Architecture Overview

This is a Next.js 15 application implementing the **C-MOD/VAR (Component-Module/Variable) Standard** - a three-layer design system architecture for maintainable, scalable styling.

### Three-Layer Architecture

**Layer 1: Design Tokens Foundation**
- `src/styles/design-tokens.css` - CSS Variables define ALL visual properties
- Uses `clamp()` and `calc()` for fluid responsiveness without media queries
- Key tokens: `--space-fluid`, `--text-fluid`, `--color-primary`

**Layer 2: Global Utility Layer**
- `src/styles/utilities.css` - Reusable `.u-` prefixed classes for layout and typography
- Every property references Layer 1 tokens
- Examples: `.u-stack`, `.u-row`, `.u-text-fluid`, `.u-p-fluid`

**Layer 3: Component Scoping**
- CSS Modules (`.module.css`) for component-specific styles
- Provides encapsulation while maintaining token consistency
- Example: `Button.module.css`, `Card.module.css`

### Directory Structure

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── ui/                # Base UI components (Button, Card)
│   ├── layout/            # Layout components
│   └── sections/          # Page composition components
├── lib/
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript type definitions
└── styles/
    ├── design-tokens.css  # Layer 1: CSS Variables
    ├── utilities.css      # Layer 2: Global utilities
    └── globals.css        # Base styles and imports
```

### Key Development Principles

1. **Token-First Development**: Never use arbitrary values. Every padding, margin, font-size, and color MUST reference a token from `design-tokens.css`

2. **Component Architecture**: All UI components are in `src/components/ui/` with corresponding `.module.css` files. Each component exports both the component and its TypeScript interface.

3. **Barrel Exports**: Components use index files for clean imports (`@/components/ui` imports from `src/components/ui/index.ts`)

4. **Path Mapping**: Uses `@/*` alias mapped to `./src/*` in `tsconfig.json`

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Build Tool**: Turbopack (for dev and build)
- **Styling**: CSS Modules + Design Tokens + Global Utilities
- **TypeScript**: Strict mode enabled
- **Fonts**: Geist Sans and Geist Mono via `next/font/google`
- **Linting**: ESLint with Next.js TypeScript configuration

## Working with the Design System

When creating new components:
1. Add design tokens to `design-tokens.css` if needed
2. Create utility classes in `utilities.css` if they'll be reused
3. Build component with CSS Modules referencing tokens
4. Export component and types from appropriate index file