'use client';

import React from 'react';
import { ThemeSwitcher, ClientThemePreview } from '@/components/theme/ThemeSwitcher';
import { ButtonVariantShowcase, DynamicButtonDemo } from '@/components/demo/ButtonVariantShowcase';
import { useClientTheme } from '@/components/theme/ClientThemeProvider';
import { ALL_CLIENTS } from '@/lib/themes';
import {
  Palette,
  Monitor,
  Smartphone,
  Code,
  Layers,
  Zap,
  CheckCircle,
  AlertCircle,
  Info,
  Star
} from 'lucide-react';

export default function ThemeDemoPage() {
  const { clientConfig, currentTheme } = useClientTheme();

  return (
    <div className="min-h-screen bg-surface-background">
      {/* Hero Section */}
      <div className="bg-surface-card border-b border-interactive-secondary">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              Multi-Client Theme System
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              A production-ready white-labeling solution built with semantic design tokens.
              Switch between client brands and see how components automatically adapt.
            </p>
          </div>

          {/* Current Theme Display */}
          <div className="bg-surface-elevated rounded-lg p-6 max-w-md mx-auto">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                style={{ backgroundColor: clientConfig.primaryColor }}
              />
              <div>
                <h3 className="font-semibold text-text-primary">{clientConfig.name}</h3>
                <p className="text-sm text-text-muted">{clientConfig.description}</p>
                <p className="text-xs text-text-muted mt-1">
                  Current theme: <code className="bg-surface-background px-1 rounded">{currentTheme}</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Controls */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-surface-card rounded-lg border border-interactive-secondary p-6 mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">Theme Controls</h2>
          <ThemeSwitcher layout="vertical" />
        </div>

        {/* Client Brand Previews */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">Available Client Brands</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ALL_CLIENTS.map((clientId) => (
              <ClientThemePreview key={clientId} clientId={clientId} />
            ))}
          </div>
        </div>

        {/* Component Showcases */}
        <div className="space-y-8">
          {/* Button Variants */}
          <ButtonVariantShowcase />

          {/* Dynamic Content Demo */}
          <DynamicButtonDemo />

          {/* Status Cards Demo */}
          <div className="bg-surface-card rounded-lg border border-interactive-secondary p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Status Cards with Semantic Tokens
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatusCard
                icon={<CheckCircle className="h-5 w-5" />}
                title="Success"
                description="Operation completed"
                status="success"
              />
              <StatusCard
                icon={<AlertCircle className="h-5 w-5" />}
                title="Warning"
                description="Requires attention"
                status="warning"
              />
              <StatusCard
                icon={<Info className="h-5 w-5" />}
                title="Info"
                description="Additional details"
                status="info"
              />
              <StatusCard
                icon={<Star className="h-5 w-5" />}
                title="Featured"
                description="Premium content"
                status="featured"
              />
            </div>
          </div>

          {/* Device Responsiveness */}
          <div className="bg-surface-card rounded-lg border border-interactive-secondary p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Responsive Design Tokens
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-surface-background rounded-md">
                <Monitor className="h-6 w-6 text-text-accent" />
                <div>
                  <div className="font-medium text-text-primary">Desktop</div>
                  <div className="text-sm text-text-muted">Full layout with all variants</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-surface-background rounded-md">
                <Smartphone className="h-6 w-6 text-text-accent" />
                <div>
                  <div className="font-medium text-text-primary">Mobile</div>
                  <div className="text-sm text-text-muted">Optimized for touch</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-surface-background rounded-md">
                <Layers className="h-6 w-6 text-text-accent" />
                <div>
                  <div className="font-medium text-text-primary">Consistent</div>
                  <div className="text-sm text-text-muted">Same tokens across devices</div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-surface-card rounded-lg border border-interactive-secondary p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Implementation Example
            </h3>
            <div className="bg-surface-background rounded-md p-4 font-mono text-sm overflow-x-auto">
              <div className="text-text-muted mb-2">{/* Framer-style variants in code */}</div>
              <div className="text-text-accent">const</div> <span className="text-text-primary">buttonVariants</span> = <span className="text-text-accent">cva</span>(<br />
              <span className="ml-4 text-green-600">&quot;base styles&quot;</span>,<br />
              <span className="ml-4">{`{`}</span><br />
              <span className="ml-8 text-text-accent">variants</span>: {`{`}<br />
              <span className="ml-12 text-text-accent">variant</span>: {`{`}<br />
              <span className="ml-16 text-text-primary">primary</span>: <span className="text-green-600">&quot;bg-interactive-primary...&quot;</span>,<br />
              <span className="ml-16 text-text-primary">secondary</span>: <span className="text-green-600">&quot;bg-interactive-secondary...&quot;</span><br />
              <span className="ml-12">{`}`}</span><br />
              <span className="ml-8">{`}`}</span><br />
              <span className="ml-4">{`}`}</span><br />
              )
            </div>
            <p className="text-sm text-text-muted mt-3">
              This CVA pattern mirrors Framer&apos;s component variants while using semantic tokens
              that automatically adapt to any client theme.
            </p>
          </div>

          {/* Performance & Benefits */}
          <div className="bg-surface-card rounded-lg border border-interactive-secondary p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              System Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-text-accent mt-0.5" />
                  <div>
                    <div className="font-medium text-text-primary">Zero Refactoring</div>
                    <div className="text-sm text-text-muted">
                      Add new client themes without changing any component code
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Code className="h-5 w-5 text-text-accent mt-0.5" />
                  <div>
                    <div className="font-medium text-text-primary">Type Safe</div>
                    <div className="text-sm text-text-muted">
                      Full TypeScript support for all theme variants and client brands
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Palette className="h-5 w-5 text-text-accent mt-0.5" />
                  <div>
                    <div className="font-medium text-text-primary">Designer Friendly</div>
                    <div className="text-sm text-text-muted">
                      Uses the same mental model as Framer component variants
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Layers className="h-5 w-5 text-text-accent mt-0.5" />
                  <div>
                    <div className="font-medium text-text-primary">Scalable</div>
                    <div className="text-sm text-text-muted">
                      Add unlimited clients with just CSS variable definitions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for status cards
function StatusCard({
  icon,
  title,
  description,
  status
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: 'success' | 'warning' | 'info' | 'featured';
}) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'success':
        return 'border-interactive-primary text-interactive-primary bg-interactive-primary/5';
      case 'warning':
        return 'border-interactive-danger text-interactive-danger bg-interactive-danger/5';
      case 'info':
        return 'border-interactive-secondary text-text-accent bg-surface-elevated';
      case 'featured':
        return 'border-text-accent text-text-accent bg-text-accent/5';
      default:
        return 'border-interactive-secondary text-text-muted bg-surface-elevated';
    }
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${getStatusStyles(status)}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  );
}