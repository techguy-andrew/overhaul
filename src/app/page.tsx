import { Card, Button } from '@/components/ui';

export default function Home() {
  return (
    <div className="u-page">
      <div className="u-container">
        <div className="u-stack">
          <div className="u-text-center">
            <h1 className="u-text-fluid-xl u-font-bold u-mb-fluid">
              C-MOD/VAR Standard: Complete Beginner's Guide
            </h1>
            <p className="u-text-fluid u-color-muted u-max-width-content">
              Learn the three-layer architecture for modern Next.js applications.
              Follow exact file paths and design tokens to build fluid, responsive components.
            </p>
          </div>

          <section className="u-p-fluid u-bg-surface u-border-radius u-border-subtle">
            <h2 className="u-text-fluid-lg u-font-semibold u-mb-fluid">
              📁 File Structure: Industry Standard Layout
            </h2>
            <div className="u-stack">
              <p className="u-text-fluid u-line-height-relaxed">
                <strong>Design Tokens (Layer 1):</strong> <code>src/styles/design-tokens.css</code>
              </p>
              <p className="u-text-fluid u-line-height-relaxed">
                <strong>Global Utilities (Layer 2):</strong> <code>src/styles/utilities.css</code>
              </p>
              <p className="u-text-fluid u-line-height-relaxed">
                <strong>Component Scoping (Layer 3):</strong> <code>src/components/ui/Button.module.css</code>
              </p>
              <p className="u-text-fluid u-line-height-relaxed">
                <strong>React Components:</strong> <code>src/components/ui/Button.tsx</code>, <code>src/components/ui/Card.tsx</code>
              </p>
            </div>
          </section>

          <section>
            <h2 className="u-text-fluid-lg u-font-semibold u-mb-fluid">
              🎨 Design Tokens: Your Single Source of Truth
            </h2>
            <div className="u-text-fluid u-line-height-relaxed u-mb-fluid">
              Open <code>src/styles/design-tokens.css</code> to see these exact tokens:
            </div>

            <div className="u-row">
              <Card
                title="--color-primary: #2563eb"
                description="Used in Button.module.css as background: var(--color-primary). Single source for brand color."
              />
              <Card
                title="--space-fluid: clamp(1rem, 4vw, 2rem)"
                description="Scales from 16px to 32px based on viewport. Used for padding, margins, and gaps throughout utilities.css."
              />
              <Card
                title="--text-fluid: clamp(1rem, 2.5vw, 1.25rem)"
                description="Responsive typography that scales from 16px to 20px. Base for all text sizing calculations."
              />
            </div>

            <div className="u-row">
              <Card
                title="--color-text: #1f2937"
                description="Primary text color used in Card.module.css and throughout the design system."
              />
              <Card
                title="--color-background: #ffffff"
                description="Base background color referenced across all component styles."
              />
            </div>
          </section>

          <section>
            <h2 className="u-text-fluid-lg u-font-semibold u-mb-fluid">
              🛠️ Global Utilities: The .u- Prefix System
            </h2>
            <div className="u-text-fluid u-line-height-relaxed u-mb-fluid">
              All classes in <code>src/styles/utilities.css</code> use the <code>.u-</code> prefix and reference design tokens:
            </div>

            <div className="u-row">
              <Card
                title=".u-page & .u-container"
                description="Layout foundation. .u-page uses var(--space-fluid) for padding. .u-container sets max-width: 1200px."
              />
              <Card
                title=".u-stack & .u-row"
                description="Flexbox utilities with gap: var(--space-fluid). Stack = column, Row = row with flex-wrap."
              />
              <Card
                title=".u-text-fluid-xl"
                description="calc(var(--text-fluid) * 2) - Multiplies base fluid text by 2 for headings."
              />
            </div>
          </section>

          <section>
            <h2 className="u-text-fluid-lg u-font-semibold u-mb-fluid">
              🧩 Component Scoping: CSS Modules in Action
            </h2>

            <div className="u-stack">
              <div className="u-text-fluid u-line-height-relaxed u-mb-fluid">
                Components use CSS Modules for style encapsulation. Every property references global tokens:
              </div>

              <div className="u-row">
                <Button>Button Component</Button>
                <Button>Uses --color-primary</Button>
                <Button>Scales with --text-fluid</Button>
              </div>

              <Card
                title="Component Architecture Example"
                description="This Card component demonstrates Layer 3: CSS Modules. Check src/components/ui/Card.module.css to see how padding: var(--space-fluid) and font-size: var(--text-fluid) maintain design system consistency."
              />
            </div>
          </section>

          <section className="u-p-fluid u-bg-surface u-border-radius u-border-subtle">
            <h2 className="u-text-fluid-lg u-font-semibold u-mb-fluid">
              🏗️ The Three-Layer Architecture Explained
            </h2>
            <div className="u-stack">
              <div>
                <h3 className="u-text-fluid u-font-semibold">Layer 1: Design Token Foundation</h3>
                <p className="u-text-fluid u-line-height-relaxed">
                  <code>src/styles/design-tokens.css</code> - CSS Variables define ALL visual properties.
                  Uses clamp() and calc() for fluid responsiveness without media queries.
                </p>
              </div>

              <div>
                <h3 className="u-text-fluid u-font-semibold">Layer 2: Global Utility Layer</h3>
                <p className="u-text-fluid u-line-height-relaxed">
                  <code>src/styles/utilities.css</code> - Reusable .u- prefixed classes for layout and typography.
                  Every property references Layer 1 tokens.
                </p>
              </div>

              <div>
                <h3 className="u-text-fluid u-font-semibold">Layer 3: Component Scoping</h3>
                <p className="u-text-fluid u-line-height-relaxed">
                  <code>Button.module.css</code>, <code>Card.module.css</code> - Component-specific styles.
                  CSS Modules provide encapsulation while maintaining token consistency.
                </p>
              </div>
            </div>
          </section>

          <section className="u-p-fluid u-bg-surface u-border-radius u-border-subtle">
            <h2 className="u-text-fluid-lg u-font-semibold u-mb-fluid">
              🚀 Next Steps: Build Your Design System
            </h2>
            <div className="u-stack">
              <p className="u-text-fluid u-line-height-relaxed">
                1. <strong>Expand design-tokens.css:</strong> Add --space-fluid-sm, --space-fluid-lg, --text-fluid-sm variants
              </p>
              <p className="u-text-fluid u-line-height-relaxed">
                2. <strong>Create new utilities:</strong> Add .u-grid-auto-fit, .u-flow-space classes to utilities.css
              </p>
              <p className="u-text-fluid u-line-height-relaxed">
                3. <strong>Build components:</strong> Create Input.tsx & Input.module.css following the same pattern
              </p>
              <p className="u-text-fluid u-line-height-relaxed">
                4. <strong>Add layout components:</strong> Create src/components/layout/Header.tsx for page structure
              </p>
              <p className="u-text-fluid u-line-height-relaxed">
                5. <strong>Organize sections:</strong> Build src/components/sections/ for page composition
              </p>
            </div>
          </section>

          <section className="u-text-center">
            <h2 className="u-text-fluid-lg u-font-semibold u-mb-fluid">
              🎯 Key Principle: Everything References Tokens
            </h2>
            <p className="u-text-fluid u-line-height-relaxed u-max-width-content">
              Never use arbitrary values. Every padding, margin, font-size, and color MUST reference
              a token from design-tokens.css. This creates a maintainable, scalable design system.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
