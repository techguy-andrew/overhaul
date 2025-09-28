That's an important detail for consistency\! All the architecture principles remain the same, but the component file extension should be updated throughout the document from $\text{.jsx}$ to **.tsx** to reflect your use of TypeScript with React's JSX syntax.

Here is the revised reference document, updated for $\text{TSX}$ components:

# Professional Development Standards: Next.js 15 + React 19 + TypeScript (2024)

## Component Architecture & CSS Standards (C-MOD/VAR)

### Professional Dev Team Requirements (Updated 2024)

## 1\. Overview and Core Philosophy

The $\text{C-MOD/VAR}$ Standard mandates the combination of **CSS Modules** for component-level encapsulation and **CSS Variables** for centralized design token management. This architecture provides the systematic consistency of a utility-first framework (like Tailwind) while retaining the full power, readability, and maintainability of native CSS.

| Feature | Technology | Primary Benefit |
| :--- | :--- | :--- |
| **Encapsulation** | CSS Modules | Eliminates class-name collisions and enforces component scoping. |
| **Consistency** | CSS Variables | Centralizes the design system (tokens) for unified spacing, color, and typography. |
| **Power/Maintainability** | Native CSS | Allows for complex animations, advanced selectors, and clear separation of concerns. |

-----

## 2\. File Structure and Separation of Concerns

All Next.js projects **must** adhere to a strict three-layer CSS structure. No project styling is permitted outside of these three designated file types.

### 2.1. Global Styles (The `globals.css` File)

| Rule | Path | Purpose |
| :--- | :--- | :--- |
| **Usage** | `/src/app/styles/globals.css` | Global styles including CSS resets, base typography, and comprehensive layout utilities. |
| **Content** | CSS Resets (e.g., box-sizing, margin resets). Base typography (e.g., `body` font-family, line-height). Layout utilities (e.g., `.page`, `.main`, `.content` classes for consistent page structure). **Extended layout utilities** including grid systems, flexbox stacks, width/sizing utilities, and spacing utilities. |

**Core Layout Utilities:** The foundational layout classes (`.page`, `.main`, `.content`) establish the page structure, while extended utilities provide comprehensive layout capabilities:

#### Grid Layout Utilities
- **Grid Systems:** `.grid-2`, `.grid-3`, `.grid-4`, `.grid-5`, `.grid-6` for equal-column layouts
- **Auto-responsive:** `.grid-auto` for responsive grid with auto-fit columns
- **Asymmetric layouts:** `.section-grid` for 1fr 2fr column patterns
- **Mobile-first responsive:** All grids collapse to single column on mobile

#### Flexbox Stack Utilities
- **Vertical stacks:** `.stack-v-2`, `.stack-v-3`, `.stack-v-4`, `.stack-v-6`, `.stack-v-8`, `.stack-v-12`
- **Horizontal stacks:** `.stack-h-2`, `.stack-h-3`, `.stack-h-4`, `.stack-h-6`, `.stack-h-8`, `.stack-h-12`
- **Alignment utilities:** `.flex-center`, `.flex-center-h`, `.flex-center-v`, `.flex-between`, `.flex-around`, `.flex-start`, `.flex-end`

#### Width and Sizing Utilities
- **Fractional widths:** `.w-full`, `.w-half`, `.w-third`, `.w-quarter`
- **Height utilities:** `.h-screen`, `.h-full`
- **Max-width containers:** `.max-w-xs` through `.max-w-7xl`

#### Container and Spacing Utilities
- **Container variations:** `.container-sm`, `.container-md`, `.container-lg`, `.container-xl`
- **Section spacing:** `.section` with responsive padding
- **Padding utilities:** `.p-{size}`, `.px-{size}`, `.py-{size}` using design tokens
- **Margin utilities:** `.m-{size}`, `.mx-{size}`, `.my-{size}`, `.mx-auto` using design tokens

**Design Token Integration:** All layout utilities reference the centralized design tokens (e.g., `gap: var(--space-6)`, `padding: var(--space-4)`) ensuring consistency across the application.

### 2.2. Design Tokens (The Global System)

| Rule | Path | Purpose |
| :--- | :--- | :--- |
| **Usage** | `/src/app/styles/design-tokens.css` | Defines all project-wide design variables (tokens) within the global `:root` selector. |
| **Content** | All $\text{--color-}$, $\text{--space-}$, $\text{--text-}$, $\text{--shadow-}$, and $\text{--radius-}$ variables. |

**Integration:** Both styling files **must** be imported in the root $\text{layout.tsx}$ file in the correct order for the C-MOD/VAR architecture:

```tsx
// /src/app/layout.tsx
import './styles/design-tokens.css'; // Layer 1: Design tokens MUST be imported first
import './styles/globals.css'; // Layer 2: Global styles and layout utilities

// ... RootLayout Component
```

**Professional Organization:** All global styling architecture is consolidated in `/src/app/styles/` for better maintainability and team collaboration.\n\n**Final Professional File Structure:**\n```\n/src/app/\n├── layout.tsx                     (Next.js root layout - imports from styles/)\n├── page.tsx                       (pages use global layout utilities)\n├── styles/                        (consolidated styling architecture)\n│   ├── design-tokens.css          (Layer 1: Design system foundation)\n│   └── globals.css                (Layer 2: Global styles & utilities)\n└── components/card/\n    ├── card.tsx                   (component files)\n    └── card.module.css            (Layer 3: Component-specific styles)\n```\n\nThis structure follows professional development team practices and ensures scalable CSS architecture management."

### 2.3. Component Styles (The Scoped Layer)

| Rule | Path | Purpose |
| :--- | :--- | :--- |
| **Usage** | `<Component>.module.css` | Defines **scoped** styles for individual components with unique styling needs. |
| **Content** | Component-specific CSS classes (e.g., `.card`, `.button`). All properties **must** utilize the global $\text{CSS}$ **Variables** (e.g., `padding: var(--space-4)`). |

**Important Note:** Pages that only use global layout utilities (`.page`, `.main`, `.content`, grid utilities, flexbox stacks, etc.) do **not** require their own `.module.css` files. CSS Modules should be reserved for components with unique styling requirements that cannot be achieved with the global utility system.

**Professional Co-location Pattern:**
```
/src/app/components/card/
├── Card.tsx                 (PascalCase component file)
├── Card.module.css          (Matching PascalCase CSS module)
└── index.ts                 (Barrel export for clean imports)
```

**Naming Standards:**
- Component files: PascalCase (Card.tsx, Button.tsx)
- CSS Modules: Match component name (Card.module.css, Button.module.css)
- Barrel exports: Always include index.ts for clean imports

-----

## 3\. Development Standards

### 3.1. Utilizing Design Tokens

Component styles **must** reference a defined $\text{CSS}$ **Variable** for all design-system properties (color, spacing, typography, shadows, borders) to ensure consistency.

**Required:**

```css
/* Card.module.css */
.card {
  border-radius: var(--radius-md); 
  padding: var(--space-4); /* Use token for spacing */
  background: var(--color-gray-100); /* Use token for color */
}
```

### 3.2. Leveraging Full CSS Power

When a style requires complex logic that is difficult or impossible to manage cleanly with utility classes, **CSS Modules** are the designated solution. This includes:

  * **Complex Layouts:** Grid definitions (`grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`).
  * **Advanced Selectors:** `:nth-child()`, attribute selectors (`[data-status="error"]`), and pseudo-elements (`::before`, `::after`).
  * **Keyframe Animations:** All $\text{animations}$ **must** be defined within the relevant $\text{.module.css}$ file.

### 3.3. Component Variants

Component variations (e.g., `primary`, `secondary`, `small`, `large`) **must** be handled via local class overrides within the $\text{.module.css}$ file and applied dynamically in the component's $\text{.tsx}$ file.

**CSS Module Example:**

```css
/* Button.module.css */
.button { /* Base styles */ }

.secondary { /* Variant override */
  background: transparent;
  border: 2px solid var(--color-primary);
}
```

**Component ($\text{.tsx}$) Example:**

```tsx
// Button.tsx
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

function Button({ variant = 'primary', children }: ButtonProps) {
  // Apply base class and conditional variant class using template literals and TypeScript
  return (
    <button className={`${styles.button} ${styles[variant]}`}> 
      {children}
    </button>
  );
}
```

-----

-----

## 4\. Global Layout Utility Usage Patterns

### 4.1. Direct Usage in TSX Components

Global layout utilities are used directly in the `className` attribute of TSX files, following the C-MOD/VAR principle of keeping layout concerns in globals.css:

```tsx
// /src/app/page.tsx - Using grid utilities
export default function Home() {
  return (
    <div className="page">
      <main className="main">
        <div className="content grid-2">
          <Card />
          <Card />
        </div>
      </main>
    </div>
  );
}
```

```tsx
// /src/app/dashboard/page.tsx - Using stack utilities
export default function Dashboard() {
  return (
    <div className="page">
      <main className="main">
        <div className="stack-v-6">
          <header className="flex-between px-6">
            <h1>Dashboard</h1>
            <button>Settings</button>
          </header>
          <div className="grid-3">
            <StatsCard />
            <StatsCard />
            <StatsCard />
          </div>
        </div>
      </main>
    </div>
  );
}
```

### 4.2. Combining Utilities for Complex Layouts

Multiple utility classes can be combined for sophisticated layouts while maintaining clean separation from component-specific styling:

```tsx
// Complex layout using utility combinations
<div className="section">
  <div className="container-lg">
    <div className="section-grid">
      <aside className="stack-v-4">
        <NavigationCard />
        <QuickActions />
      </aside>
      <main className="stack-v-8 px-6">
        <div className="flex-between">
          <h1>Content Area</h1>
          <ActionButton />
        </div>
        <div className="grid-auto">
          <ContentCard />
          <ContentCard />
          <ContentCard />
        </div>
      </main>
    </div>
  </div>
</div>
```

### 4.3. When to Use CSS Modules vs Global Utilities

**Use Global Utilities for:**
- Page layouts and structure
- Grid systems and flexbox arrangements
- Standard spacing and sizing
- Container and section layouts
- Common alignment patterns

**Use CSS Modules for:**
- Component-specific visual styling (colors, borders, shadows specific to that component)
- Complex animations and transitions
- Advanced pseudo-selectors and states
- Component variants and theming
- Unique visual treatments that don't apply globally

-----

## 5. TypeScript Professional Standards (2024)

### 5.1. Interface and Type Conventions

**Component Props:**
```tsx
// Professional naming: ComponentNameProps
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

// Export for reuse
export type { ButtonProps };
```

**File Organization:**
```
/src/
├── app/                     (Next.js App Router)
├── components/              (Reusable UI components)
├── types/                   (Global TypeScript definitions)
├── utils/                   (Helper functions)
└── hooks/                   (Custom React hooks)
```

### 5.2. Import/Export Best Practices

**Barrel Exports (index.ts):**
```tsx
// /src/components/button/index.ts
export { Button, type ButtonProps } from './Button';
```

**Clean Imports:**
```tsx
// In consuming components
import { Button, type ButtonProps } from '@/components/button';
```

### 5.3. Component File Structure

```tsx
// Button.tsx - Professional structure
import styles from './Button.module.css';

// Types at top
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

// Component with proper defaults
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button'
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

// Export types for external use
export type { ButtonProps };
```

## 6. Next.js 15 + React 19 Professional Patterns

### 6.1. App Router Best Practices

**Project Structure:**
```
/src/app/
├── layout.tsx              (Root layout)
├── page.tsx                (Homepage)
├── globals.css             (Global styles + utilities)
├── components/             (App-specific components)
└── (dashboard)/            (Route groups)
    ├── layout.tsx
    └── page.tsx
```

### 6.2. Modern Import Patterns

**Path Mapping (tsconfig.json):**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Clean Imports:**
```tsx
// Use path mapping for clean imports
import { Button } from '@/components/button';
import { Card } from '@/components/card';
```

### 6.3. Performance Optimization

**Proper Component Exports:**
```tsx
// Default export for pages
export default function HomePage() {
  return <div>...</div>;
}

// Named exports for components
export function Button() {
  return <button>...</button>;
}
```

## 7. Professional Dev Team Standards Summary

### ✅ Implemented Standards
- PascalCase component files
- CSS Modules with design tokens
- TypeScript strict mode
- Next.js 15 App Router
- Clean import resolution

### 🔧 Recommended Improvements
- Rename CSS modules to match component names
- Add comprehensive TypeScript types export
- Implement path mapping for cleaner imports
- Add component documentation patterns
- Establish consistent barrel export strategy

## 8. Scalability and Maintainability Rationale

This approach is required for **long-term team scalability** and **code maintainability** because it:

1.  **Improves Readability:** Styles are declarative and co-located in dedicated CSS files, separating presentation logic from component structure.
2.  **Centralizes Refactoring:** All design tokens (the source of truth) are in a single, easy-to-search file ($\text{/src/app/styles/design-tokens.css}$).
3.  **Lowers Barrier to Entry:** New team members require only standard CSS knowledge, not a proprietary utility class naming system.
4.  **Optimizes Performance:** Styles are generated as small, scoped CSS files, avoiding the overhead of utility class processing and purging.
5.  **Provides Layout Consistency:** Global layout utilities ensure consistent spacing, alignment, and responsive behavior across all pages and components.
6.  **Reduces CSS Duplication:** Common layout patterns are defined once globally and reused throughout the application.
7.  **Maintains Design System Integrity:** All utilities reference centralized design tokens, ensuring visual consistency and easy global updates.