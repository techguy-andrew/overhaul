'use client';

import { useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useClientTheme } from './ClientThemeProvider';
import { ThemeManager, type ClientBrand, CLIENT_THEMES } from '@/lib/themes';

/**
 * Component that handles automatic client detection and theme initialization
 * Place this component at the root of your app to enable automatic theme detection
 */
export function ClientThemeInitializer() {
  const { setClient, client } = useClientTheme();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    // Priority 1: URL query parameter (?client=client-b)
    const clientParam = searchParams?.get('client') as ClientBrand;
    if (clientParam && CLIENT_THEMES[clientParam]) {
      if (client !== clientParam) {
        setClient(clientParam);
      }
      return;
    }

    // Priority 2: Path-based routing (/client-b/dashboard)
    const pathSegments = pathname?.split('/').filter(Boolean) || [];
    const firstSegment = pathSegments[0];
    if (firstSegment?.startsWith('client-') && CLIENT_THEMES[firstSegment as ClientBrand]) {
      const detectedClient = firstSegment as ClientBrand;
      if (client !== detectedClient) {
        setClient(detectedClient);
      }
      return;
    }

    // Priority 3: Subdomain detection (client-b.yourapp.com)
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const subdomain = hostname.split('.')[0];

      if (subdomain.startsWith('client-') && CLIENT_THEMES[subdomain as ClientBrand]) {
        const detectedClient = subdomain as ClientBrand;
        if (client !== detectedClient) {
          setClient(detectedClient);
        }
        return;
      }
    }

    // Priority 4: Environment-based detection
    const envClient = process.env.NEXT_PUBLIC_DEFAULT_CLIENT as ClientBrand;
    if (envClient && CLIENT_THEMES[envClient] && client !== envClient) {
      setClient(envClient);
    }
  }, [searchParams, pathname, client, setClient]);

  // This component doesn't render anything
  return null;
}

/**
 * Hook for manual client detection in server components or other contexts
 */
export function useClientDetection() {
  return {
    detectFromUrl: (url: string): ClientBrand | null => {
      try {
        const urlObj = new URL(url);

        // Check query params
        const clientParam = urlObj.searchParams.get('client') as ClientBrand;
        if (clientParam && CLIENT_THEMES[clientParam]) {
          return clientParam;
        }

        // Check pathname
        const pathSegments = urlObj.pathname.split('/').filter(Boolean);
        const firstSegment = pathSegments[0];
        if (firstSegment?.startsWith('client-') && CLIENT_THEMES[firstSegment as ClientBrand]) {
          return firstSegment as ClientBrand;
        }

        // Check subdomain
        const subdomain = urlObj.hostname.split('.')[0];
        if (subdomain.startsWith('client-') && CLIENT_THEMES[subdomain as ClientBrand]) {
          return subdomain as ClientBrand;
        }

        return null;
      } catch {
        return null;
      }
    },

    detectFromRequest: (request: Request): ClientBrand | null => {
      const url = request.url;
      const userAgent = request.headers.get('user-agent') || '';

      // Use URL detection
      const urlClient = useClientDetection().detectFromUrl(url);
      if (urlClient) return urlClient;

      // Could add additional detection logic here based on headers, etc.

      return null;
    },
  };
}

/**
 * Server-side client detection for middleware
 */
export function detectClientFromRequest(request: Request): ClientBrand | null {
  try {
    const url = new URL(request.url);

    // Check query parameter
    const clientParam = url.searchParams.get('client') as ClientBrand;
    if (clientParam && CLIENT_THEMES[clientParam]) {
      return clientParam;
    }

    // Check path
    const pathSegments = url.pathname.split('/').filter(Boolean);
    const firstSegment = pathSegments[0];
    if (firstSegment?.startsWith('client-') && CLIENT_THEMES[firstSegment as ClientBrand]) {
      return firstSegment as ClientBrand;
    }

    // Check subdomain
    const subdomain = url.hostname.split('.')[0];
    if (subdomain.startsWith('client-') && CLIENT_THEMES[subdomain as ClientBrand]) {
      return subdomain as ClientBrand;
    }

    return null;
  } catch {
    return null;
  }
}