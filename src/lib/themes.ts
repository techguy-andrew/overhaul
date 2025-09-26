/**
 * Multi-Client Theme System Types and Utilities
 *
 * This file defines the type-safe theme system that extends the existing
 * design token architecture to support multiple client brands.
 */

export type ClientBrand = 'client-a' | 'client-b' | 'client-c' | 'client-d';
export type ThemeMode = 'light' | 'dark';
export type LegacyTheme = 'light' | 'dark'; // Backward compatibility

// Full theme identifier combining client brand and mode
export type ClientTheme = `${ClientBrand}-${ThemeMode}` | ClientBrand;

// All possible theme values (including legacy)
export type ThemeValue = ClientTheme | LegacyTheme;

// Client metadata for theme management
export interface ClientThemeConfig {
  id: ClientBrand;
  name: string;
  description: string;
  primaryColor: string;
  previewColors: {
    primary: string;
    background: string;
    surface: string;
  };
}

// Available client configurations
export const CLIENT_THEMES: Record<ClientBrand, ClientThemeConfig> = {
  'client-a': {
    id: 'client-a',
    name: 'Azure Professional',
    description: 'Classic blue professional theme',
    primaryColor: '#3b82f6',
    previewColors: {
      primary: '#3b82f6',
      background: '#f9fafb',
      surface: '#ffffff',
    },
  },
  'client-b': {
    id: 'client-b',
    name: 'Emerald Enterprise',
    description: 'Fresh green business theme',
    primaryColor: '#10b981',
    previewColors: {
      primary: '#10b981',
      background: '#f0fdf4',
      surface: '#ffffff',
    },
  },
  'client-c': {
    id: 'client-c',
    name: 'Violet Creative',
    description: 'Creative purple theme',
    primaryColor: '#8b5cf6',
    previewColors: {
      primary: '#8b5cf6',
      background: '#faf5ff',
      surface: '#ffffff',
    },
  },
  'client-d': {
    id: 'client-d',
    name: 'Amber Finance',
    description: 'Warm amber financial theme',
    primaryColor: '#f59e0b',
    previewColors: {
      primary: '#f59e0b',
      background: '#fffbeb',
      surface: '#ffffff',
    },
  },
} as const;

// Theme detection and utilities
export class ThemeManager {
  private static STORAGE_KEY = 'app-theme';
  private static CLIENT_STORAGE_KEY = 'app-client';

  /**
   * Parse a theme string to extract client and mode
   */
  static parseTheme(theme: string): { client: ClientBrand; mode: ThemeMode } {
    // Handle legacy themes
    if (theme === 'light' || theme === 'dark') {
      return { client: 'client-a', mode: theme };
    }

    // Handle client-specific themes
    if (theme.includes('-')) {
      const parts = theme.split('-');
      const client = `${parts[0]}-${parts[1]}` as ClientBrand;
      const mode = parts[2] as ThemeMode || 'light';
      return { client, mode };
    }

    // Handle client themes without mode (default to light)
    return { client: theme as ClientBrand, mode: 'light' };
  }

  /**
   * Build theme string from client and mode
   */
  static buildTheme(client: ClientBrand, mode: ThemeMode): ClientTheme {
    return `${client}-${mode}` as ClientTheme;
  }

  /**
   * Apply theme to document
   */
  static applyTheme(theme: ThemeValue): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

  /**
   * Save theme preferences to localStorage
   */
  static saveTheme(client: ClientBrand, mode: ThemeMode): void {
    localStorage.setItem(this.CLIENT_STORAGE_KEY, client);
    localStorage.setItem(this.STORAGE_KEY, mode);
  }

  /**
   * Load theme preferences from localStorage
   */
  static loadTheme(): { client: ClientBrand; mode: ThemeMode } {
    const savedClient = localStorage.getItem(this.CLIENT_STORAGE_KEY) as ClientBrand;
    const savedMode = localStorage.getItem(this.STORAGE_KEY) as ThemeMode;

    return {
      client: savedClient || 'client-a',
      mode: savedMode || 'light',
    };
  }

  /**
   * Detect client from URL or environment
   */
  static detectClient(): ClientBrand {
    // Check URL parameters
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const clientParam = urlParams.get('client') as ClientBrand;
      if (clientParam && CLIENT_THEMES[clientParam]) {
        return clientParam;
      }

      // Check subdomain
      const subdomain = window.location.hostname.split('.')[0];
      if (subdomain.startsWith('client-') && CLIENT_THEMES[subdomain as ClientBrand]) {
        return subdomain as ClientBrand;
      }
    }

    // Default to client-a for backward compatibility
    return 'client-a';
  }

  /**
   * Get current theme from document
   */
  static getCurrentTheme(): { client: ClientBrand; mode: ThemeMode } {
    if (typeof document === 'undefined') {
      return { client: 'client-a', mode: 'light' };
    }

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    return this.parseTheme(currentTheme);
  }
}

// Utility function for backward compatibility
export function isLegacyTheme(theme: string): theme is LegacyTheme {
  return theme === 'light' || theme === 'dark';
}

// Export theme list for iteration
export const ALL_CLIENTS = Object.keys(CLIENT_THEMES) as ClientBrand[];
export const ALL_MODES: ThemeMode[] = ['light', 'dark'];