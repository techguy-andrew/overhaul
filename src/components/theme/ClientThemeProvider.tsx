'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  ClientBrand,
  ThemeMode,
  ThemeManager,
  CLIENT_THEMES,
  type ClientThemeConfig
} from '@/lib/themes';

interface ClientThemeContextType {
  // Current theme state
  client: ClientBrand;
  mode: ThemeMode;

  // Theme actions
  setClient: (client: ClientBrand) => void;
  setMode: (mode: ThemeMode) => void;
  setTheme: (client: ClientBrand, mode: ThemeMode) => void;
  toggleMode: () => void;

  // Utility getters
  currentTheme: string;
  clientConfig: ClientThemeConfig;
  isLoading: boolean;
}

const ClientThemeContext = createContext<ClientThemeContextType | undefined>(undefined);

interface ClientThemeProviderProps {
  children: ReactNode;
  defaultClient?: ClientBrand;
  defaultMode?: ThemeMode;
  autoDetectClient?: boolean;
}

export function ClientThemeProvider({
  children,
  defaultClient = 'client-a',
  defaultMode = 'light',
  autoDetectClient = true,
}: ClientThemeProviderProps) {
  const [client, setClientState] = useState<ClientBrand>(defaultClient);
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize theme on mount
  useEffect(() => {
    let initialClient = defaultClient;
    let initialMode = defaultMode;

    // Auto-detect client if enabled
    if (autoDetectClient) {
      const detectedClient = ThemeManager.detectClient();
      if (detectedClient) {
        initialClient = detectedClient;
      }
    }

    // Load saved preferences
    const savedTheme = ThemeManager.loadTheme();
    if (savedTheme.client) {
      initialClient = savedTheme.client;
    }
    if (savedTheme.mode) {
      initialMode = savedTheme.mode;
    }

    // Apply theme
    setClientState(initialClient);
    setModeState(initialMode);
    ThemeManager.applyTheme(ThemeManager.buildTheme(initialClient, initialMode));

    setIsLoading(false);
  }, [defaultClient, defaultMode, autoDetectClient]);

  // Update client brand
  const setClient = (newClient: ClientBrand) => {
    setClientState(newClient);
    ThemeManager.saveTheme(newClient, mode);
    ThemeManager.applyTheme(ThemeManager.buildTheme(newClient, mode));
  };

  // Update theme mode (light/dark)
  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    ThemeManager.saveTheme(client, newMode);
    ThemeManager.applyTheme(ThemeManager.buildTheme(client, newMode));
  };

  // Update both client and mode
  const setTheme = (newClient: ClientBrand, newMode: ThemeMode) => {
    setClientState(newClient);
    setModeState(newMode);
    ThemeManager.saveTheme(newClient, newMode);
    ThemeManager.applyTheme(ThemeManager.buildTheme(newClient, newMode));
  };

  // Toggle between light and dark mode
  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  // Computed values
  const currentTheme = ThemeManager.buildTheme(client, mode);
  const clientConfig = CLIENT_THEMES[client];

  const value: ClientThemeContextType = {
    client,
    mode,
    setClient,
    setMode,
    setTheme,
    toggleMode,
    currentTheme,
    clientConfig,
    isLoading,
  };

  return (
    <ClientThemeContext.Provider value={value}>
      {children}
    </ClientThemeContext.Provider>
  );
}

// Hook to use the theme context
export function useClientTheme() {
  const context = useContext(ClientThemeContext);
  if (context === undefined) {
    throw new Error('useClientTheme must be used within a ClientThemeProvider');
  }
  return context;
}

// Backward compatibility hook for existing ThemeToggle component
export function useTheme() {
  const { mode, toggleMode, setMode } = useClientTheme();
  return {
    theme: mode,
    setTheme: (newMode: ThemeMode) => {
      // This maintains backward compatibility with the existing ThemeToggle
      setMode(newMode);
    },
    toggleTheme: toggleMode,
  };
}