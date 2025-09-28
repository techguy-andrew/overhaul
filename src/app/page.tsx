import { Card } from './components/Card';
import { Button } from './components/Button';

export default function Home() {
  return (
    <div className="page">
      <main className="main">
        <div className="content stack-v-12">
          <div className="stack-v-6 flex-center">
            <h1 className="text-fluid-4xl text-balance">Fluid Responsive Design</h1>
            <p className="text-fluid-lg text-pretty max-w-3xl">
              Components that inherit their size from containers, with no media queries required.
              Built with the C-MOD/VAR standard using CSS Modules and fluid design tokens.
            </p>
          </div>

          <div className="stack-v-8">
            <section className="stack-v-4">
              <h2 className="text-fluid-2xl">Container-Relative Cards</h2>
              <div className="grid-auto gap-container-md">
                <Card
                  variant="primary"
                  size="sm"
                  title="Small Card"
                  description="This card adapts to its container size with fluid typography and spacing."
                />
                <Card
                  variant="secondary"
                  size="md"
                  title="Medium Card"
                  description="No fixed widths or media queries - everything scales relative to the container."
                />
                <Card
                  variant="primary"
                  size="lg"
                  title="Large Card"
                  description="Typography and padding scale fluidly using clamp() and container-relative spacing tokens."
                />
              </div>
            </section>

            <section className="stack-v-4">
              <h2 className="text-fluid-2xl">Fluid Button Variants</h2>
              <div className="stack-v-6">
                <div className="stack-h-4 flex-center">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="secondary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </div>

                <div className="stack-v-3 size-md mx-auto">
                  <Button variant="primary" fullWidth>Full Width Primary</Button>
                  <Button variant="secondary" fullWidth>Full Width Secondary</Button>
                </div>
              </div>
            </section>

            <section className="stack-v-4">
              <h2 className="text-fluid-2xl">Responsive Layout Demo</h2>
              <div className="section-grid gap-container-lg">
                <div className="stack-v-4">
                  <Card
                    variant="secondary"
                    size="md"
                    title="Sidebar Card"
                    description="This card is in a 1fr column that automatically adjusts to content and screen size."
                  />
                  <div className="stack-v-3">
                    <Button variant="secondary" fullWidth size="sm">Action 1</Button>
                    <Button variant="secondary" fullWidth size="sm">Action 2</Button>
                  </div>
                </div>

                <div className="stack-v-6">
                  <Card
                    variant="primary"
                    size="lg"
                    title="Main Content"
                    description="This card is in a 2fr column, automatically taking up more space. All sizing is relative to the container, creating truly responsive layouts without media queries."
                  />
                  <div className="grid-3 gap-container-sm">
                    <Button variant="primary" size="sm">Quick</Button>
                    <Button variant="secondary" size="sm">Action</Button>
                    <Button variant="primary" size="sm">Buttons</Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
