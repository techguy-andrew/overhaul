'use client';

import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-surface-background p-container-padding">
      <ThemeToggle />
      <div className="text-center space-y-component-gap">
        <h1 className="text-5xl font-extrabold text-text-primary">
          🎉 Design Tokens are WORKING!
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl">
          This page demonstrates the semantic design token system. The colors, spacing, and typography all come from design tokens that automatically adapt to themes.
        </p>
        <div className="bg-surface-card p-container-padding rounded-lg shadow-sm max-w-lg mx-auto">
          <h2 className="text-xl font-semibold text-text-primary mb-element-gap">
            Component Showcase
          </h2>
          <div className="flex flex-col gap-element-gap">
            <Button variant="primary" onClick={() => alert('Primary clicked!')}>
              Primary Button
            </Button>
            <Button variant="secondary" onClick={() => alert('Secondary clicked!')}>
              Secondary Button
            </Button>
            <Button variant="danger" onClick={() => alert('Danger clicked!')}>
              Danger Button
            </Button>
            <div className="flex gap-element-gap">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
          </div>
        </div>
        <p className="text-sm text-text-muted">
          All components are <strong>thematically blind</strong> - they express intent, not appearance
        </p>
      </div>
    </main>
  );
}