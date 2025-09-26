'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { useClientTheme } from '@/components/theme/ClientThemeProvider';
import { Play, Download, Trash2, Settings, Heart } from 'lucide-react';

interface ButtonVariantShowcaseProps {
  title?: string;
  showClientInfo?: boolean;
}

export function ButtonVariantShowcase({
  title = "Button Variants",
  showClientInfo = true
}: ButtonVariantShowcaseProps) {
  const { clientConfig, mode } = useClientTheme();

  return (
    <div className="bg-surface-card rounded-lg border border-interactive-secondary p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
        {showClientInfo && (
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: clientConfig.primaryColor }}
            />
            <span>{clientConfig.name} - {mode === 'light' ? 'Light' : 'Dark'} Mode</span>
          </div>
        )}
      </div>

      {/* Button Variants Grid */}
      <div className="space-y-6">
        {/* Primary Actions */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">Primary Actions</h4>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="sm">
              <Play className="h-4 w-4" />
              Start Project
            </Button>
            <Button variant="primary" size="md">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="primary" size="lg">
              Save Changes
            </Button>
          </div>
        </div>

        {/* Secondary Actions */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">Secondary Actions</h4>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="sm">
              Cancel
            </Button>
            <Button variant="secondary" size="md">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button variant="outline" size="md">
              Learn More
            </Button>
          </div>
        </div>

        {/* Danger Actions */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">Danger Actions</h4>
          <div className="flex flex-wrap gap-3">
            <Button variant="danger" size="sm">
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
            <Button variant="danger" size="md">
              Remove User
            </Button>
          </div>
        </div>

        {/* Utility Actions */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">Utility Actions</h4>
          <div className="flex flex-wrap gap-3">
            <Button variant="ghost" size="sm">
              Skip
            </Button>
            <Button variant="ghost" size="md">
              <Heart className="h-4 w-4" />
              Like
            </Button>
            <Button variant="link" size="md">
              View Details
            </Button>
            <Button variant="primary" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Interactive States */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">Interactive States</h4>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" disabled>
              Disabled Primary
            </Button>
            <Button variant="secondary" disabled>
              Disabled Secondary
            </Button>
            <Button variant="outline" disabled>
              Disabled Outline
            </Button>
          </div>
        </div>
      </div>

      {/* Usage Note */}
      <div className="mt-6 p-4 bg-surface-elevated rounded-md">
        <p className="text-xs text-text-muted">
          <strong>Framer → Code Translation:</strong> These variants work exactly like Framer's component variants.
          The semantic tokens automatically adapt to different client themes while maintaining consistent behavior patterns.
        </p>
      </div>
    </div>
  );
}

// Component demonstrating database-driven variants
export function DynamicButtonDemo() {
  // Simulating database records with different statuses
  const mockData = [
    { id: 1, title: "Project Alpha", status: "active", priority: "high" },
    { id: 2, title: "Project Beta", status: "pending", priority: "medium" },
    { id: 3, title: "Project Gamma", status: "completed", priority: "low" },
    { id: 4, title: "Project Delta", status: "archived", priority: "medium" },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'primary';
      case 'pending': return 'secondary';
      case 'completed': return 'outline';
      case 'archived': return 'ghost';
      default: return 'secondary';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="bg-surface-card rounded-lg border border-interactive-secondary p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Database-Driven Button Variants
      </h3>

      <div className="space-y-3">
        {mockData.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 bg-surface-background rounded-md"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{getPriorityIcon(item.priority)}</span>
              <div>
                <div className="font-medium text-text-primary">{item.title}</div>
                <div className="text-sm text-text-muted">Priority: {item.priority}</div>
              </div>
            </div>

            <Button
              variant={getStatusVariant(item.status) as any}
              size="sm"
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-surface-elevated rounded-md">
        <p className="text-xs text-text-muted">
          <strong>Dynamic Variants:</strong> Button variants are determined by database values.
          Status "active" → primary variant, "pending" → secondary, etc. This mirrors how you'd
          handle dynamic content in Framer with component properties.
        </p>
      </div>
    </div>
  );
}