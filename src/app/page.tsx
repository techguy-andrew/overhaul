'use client';

import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-full p-container-padding">
      <div className="text-center space-y-component-gap max-w-4xl">
        <h1 className="text-5xl font-extrabold text-text-primary">
          🧭 Navigation System Demo
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Universal navigation system with semantic design tokens. Works identically across all devices with slide-out navigation accessible via the hamburger menu.
        </p>

        <div className="grid gap-component-gap md:grid-cols-2">
          <div className="bg-surface-card p-container-padding rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-text-primary mb-element-gap">
              Navigation Features
            </h2>
            <ul className="text-left space-y-2 text-text-secondary">
              <li>• Universal hamburger menu (all devices)</li>
              <li>• Slide-out sidebar navigation</li>
              <li>• Active state indication</li>
              <li>• Semantic design tokens</li>
              <li>• Perfect theme switching</li>
              <li>• Accessibility compliant</li>
            </ul>
          </div>

          <div className="bg-surface-card p-container-padding rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-text-primary mb-element-gap">
              Component Actions
            </h2>
            <div className="flex flex-col gap-element-gap">
              <Button variant="primary" onClick={() => alert('Primary clicked!')}>
                Primary Action
              </Button>
              <Button variant="secondary" onClick={() => alert('Secondary clicked!')}>
                Secondary Action
              </Button>
              <Button variant="danger" onClick={() => alert('Danger clicked!')}>
                Danger Action
              </Button>
              <div className="flex gap-element-gap">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-elevated p-container-padding rounded-lg">
          <h3 className="text-lg font-semibold text-text-primary mb-element-gap">
            Try the Navigation
          </h3>
          <p className="text-text-muted mb-element-gap">
            Click the hamburger menu (☰) in the top-left corner to test the navigation system.
            It works identically on mobile, tablet, and desktop devices. The theme toggle is available in the top-right corner.
          </p>
        </div>

        <p className="text-sm text-text-muted">
          All components are <strong>thematically blind</strong> - they express intent, not appearance
        </p>
      </div>
    </div>
  );
}