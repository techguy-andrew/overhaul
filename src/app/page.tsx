import { Card } from './components/card';
import { Button } from './components/button';

export default function Home() {
  return (
    <div className="page">
      <main className="main">
        <div className="content stack-v-6">
          <Card />

          <div className="stack-v-4">
            <h2>Button Examples</h2>
            <div className="stack-h-4">
              <Button variant="primary" size="sm">Small Primary</Button>
              <Button variant="primary" size="md">Medium Primary</Button>
              <Button variant="primary" size="lg">Large Primary</Button>
            </div>
            <div className="stack-h-4">
              <Button variant="secondary" size="sm">Small Secondary</Button>
              <Button variant="secondary" size="md">Medium Secondary</Button>
              <Button variant="secondary" size="lg">Large Secondary</Button>
            </div>
            <div className="stack-h-4">
              <Button variant="primary" disabled>Disabled Primary</Button>
              <Button variant="secondary" disabled>Disabled Secondary</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
