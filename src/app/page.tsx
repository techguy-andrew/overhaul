import { Card, Button } from '@/components/ui';

export default function Home() {
  return (
    <div className="u-layout-stack u-direction-vertical u-w-fill u-h-viewport u-padding">
      <main className="u-layout-stack u-direction-vertical u-w-fill u-gap">
        <div className="u-layout-stack u-direction-vertical u-w-fill u-gap">
          <div className="u-layout-stack u-direction-vertical u-gap">
            <h1>C-MOD/VAR Component Variants</h1>
            <p>Professional React components using CSS Modules with design tokens</p>
          </div>

          <div className="u-layout-grid u-gap">
            <Card
              variant="primary"
              title="Primary Card"
              description="This is the primary variant demonstrating the C-MOD/VAR standard with CSS Modules and design tokens."
            />

            <Card
              variant="secondary"
              title="Secondary Card"
              description="This is the secondary variant showing how variants are applied using TypeScript props and CSS classes."
            />
          </div>

          <div className="u-layout-stack u-direction-horizontal u-distribute-center u-gap">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
          </div>
        </div>
      </main>
    </div>
  );
}