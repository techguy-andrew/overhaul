import { Card } from './components/card';
import { Button } from './components/button';

export default function Home() {
  return (
    <div className="page">
      <main className="main">
        <div className="content stack-v-8">
          <div className="stack-v-4">
            <h1>C-MOD/VAR Component Variants</h1>
            <p>Professional React components using CSS Modules with design tokens</p>
          </div>

          <div className="grid-2">
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

          <div className="stack-h-6 flex-center">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
