'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { useClientTheme } from './ClientThemeProvider';
import { CLIENT_THEMES, ALL_CLIENTS, type ClientBrand } from '@/lib/themes';
import { Sun, Moon } from 'lucide-react';

interface ThemeSwitcherProps {
  showClientSelector?: boolean;
  showModeToggle?: boolean;
  layout?: 'horizontal' | 'vertical' | 'grid';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ThemeSwitcher({
  showClientSelector = true,
  showModeToggle = true,
  layout = 'horizontal',
  size = 'md',
  className = '',
}: ThemeSwitcherProps) {
  const { client, mode, setClient, toggleMode, clientConfig } = useClientTheme();

  const layoutClasses = {
    horizontal: 'flex flex-row gap-4 items-center',
    vertical: 'flex flex-col gap-4',
    grid: 'grid grid-cols-2 gap-4',
  };

  return (
    <div className={`${layoutClasses[layout]} ${className}`}>
      {/* Client Brand Selector */}
      {showClientSelector && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-text-secondary">Client Brand</label>
          <div className="flex flex-wrap gap-2">
            {ALL_CLIENTS.map((clientId) => {
              const config = CLIENT_THEMES[clientId];
              const isActive = client === clientId;

              return (
                <Button
                  key={clientId}
                  variant={isActive ? 'primary' : 'outline'}
                  size={size}
                  onClick={() => setClient(clientId)}
                  className="flex items-center gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: config.primaryColor }}
                  />
                  {config.name}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Light/Dark Mode Toggle */}
      {showModeToggle && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-text-secondary">Appearance</label>
          <Button
            variant="outline"
            size={size}
            onClick={toggleMode}
            className="flex items-center gap-2"
          >
            {mode === 'light' ? (
              <>
                <Moon className="h-4 w-4" />
                Switch to Dark
              </>
            ) : (
              <>
                <Sun className="h-4 w-4" />
                Switch to Light
              </>
            )}
          </Button>
        </div>
      )}

      {/* Current Theme Info */}
      <div className="bg-surface-card border border-interactive-secondary rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div
            className="w-6 h-6 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: clientConfig.primaryColor }}
          />
          <div>
            <div className="text-sm font-medium text-text-primary">
              {clientConfig.name}
            </div>
            <div className="text-xs text-text-muted">
              {mode === 'light' ? 'Light' : 'Dark'} mode
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact version for navigation bars
export function CompactThemeSwitcher() {
  const { mode, toggleMode } = useClientTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMode}
      className="h-9 w-9"
    >
      {mode === 'light' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  );
}

// Client-specific theme preview component
export function ClientThemePreview({ clientId }: { clientId: ClientBrand }) {
  const { client, setClient } = useClientTheme();
  const config = CLIENT_THEMES[clientId];
  const isActive = client === clientId;

  return (
    <button
      onClick={() => setClient(clientId)}
      className={`
        p-4 rounded-lg border-2 transition-all
        ${isActive
          ? 'border-interactive-primary bg-interactive-primary/5'
          : 'border-interactive-secondary hover:border-interactive-primary/50'
        }
      `}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-5 h-5 rounded-full"
          style={{ backgroundColor: config.primaryColor }}
        />
        <span className="font-medium text-text-primary">{config.name}</span>
      </div>

      <p className="text-sm text-text-muted text-left">{config.description}</p>

      {/* Theme preview colors */}
      <div className="flex gap-1 mt-3">
        <div
          className="w-6 h-6 rounded border"
          style={{ backgroundColor: config.previewColors.primary }}
          title="Primary color"
        />
        <div
          className="w-6 h-6 rounded border"
          style={{ backgroundColor: config.previewColors.background }}
          title="Background color"
        />
        <div
          className="w-6 h-6 rounded border"
          style={{ backgroundColor: config.previewColors.surface }}
          title="Surface color"
        />
      </div>
    </button>
  );
}