/**
 * useFluidSizing Hook - Responsive Layout Behavior
 * C-MOD/VAR Utility: Intelligent size adaptation for Framer-style layouts
 *
 * Provides responsive sizing behavior that adapts based on container
 * dimensions and viewport constraints, maintaining Framer layout principles.
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

export interface FluidSizingOptions {
  // Base size configuration
  minSize?: number;
  maxSize?: number;
  baseSize?: number;

  // Responsive breakpoints
  breakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };

  // Scaling factors for different breakpoints
  scaleFactors?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };

  // Enable container-based sizing
  containerBased?: boolean;
}

export interface FluidSizingResult {
  // Current calculated size
  size: number;

  // Current breakpoint
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  // Responsive utility classes
  sizeClass: string;

  // Container dimensions (if containerBased is true)
  containerWidth?: number;
  containerHeight?: number;

  // Ref to attach to element for container-based sizing
  ref: React.RefObject<HTMLElement | null>;
}

const defaultOptions: Required<FluidSizingOptions> = {
  minSize: 16,
  maxSize: 64,
  baseSize: 24,
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  scaleFactors: {
    sm: 0.875,
    md: 1,
    lg: 1.125,
    xl: 1.25,
  },
  containerBased: false,
};

export function useFluidSizing(options: FluidSizingOptions = {}): FluidSizingResult {
  const config = useMemo(() => ({ ...defaultOptions, ...options }), [options]);
  const ref = useRef<HTMLElement>(null);

  const [dimensions, setDimensions] = useState({
    viewportWidth: typeof window !== 'undefined' ? window.innerWidth : 1024,
    viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 768,
    containerWidth: 0,
    containerHeight: 0,
  });

  // Determine current breakpoint
  const getBreakpoint = useCallback((width: number): 'xs' | 'sm' | 'md' | 'lg' | 'xl' => {
    if (width >= (config.breakpoints.xl || 1280)) return 'xl';
    if (width >= (config.breakpoints.lg || 1024)) return 'lg';
    if (width >= (config.breakpoints.md || 768)) return 'md';
    if (width >= (config.breakpoints.sm || 640)) return 'sm';
    return 'xs';
  }, [config.breakpoints]);

  // Calculate fluid size based on current dimensions
  const calculateSize = useCallback((width: number): number => {
    const breakpoint = getBreakpoint(width);
    const scaleFactor = breakpoint === 'xs' ? 0.75 : (config.scaleFactors[breakpoint] || 1);
    const calculatedSize = (config.baseSize || 24) * scaleFactor;

    return Math.max(
      config.minSize || 16,
      Math.min(config.maxSize || 64, calculatedSize)
    );
  }, [config, getBreakpoint]);

  // Update viewport dimensions
  useEffect(() => {
    const updateViewportDimensions = () => {
      setDimensions(prev => ({
        ...prev,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      }));
    };

    window.addEventListener('resize', updateViewportDimensions);
    return () => window.removeEventListener('resize', updateViewportDimensions);
  }, []);

  // Update container dimensions (if container-based)
  useEffect(() => {
    if (!config.containerBased || !ref.current) return;

    const updateContainerDimensions = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setDimensions(prev => ({
          ...prev,
          containerWidth: rect.width,
          containerHeight: rect.height,
        }));
      }
    };

    // Initial measurement
    updateContainerDimensions();

    // Set up ResizeObserver for container changes
    const resizeObserver = new ResizeObserver(updateContainerDimensions);
    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [config.containerBased]);

  // Calculate current values
  const effectiveWidth = config.containerBased
    ? dimensions.containerWidth
    : dimensions.viewportWidth;

  const breakpoint = getBreakpoint(effectiveWidth);
  const size = calculateSize(effectiveWidth);

  // Generate utility class based on size and breakpoint
  const getSizeClass = (): string => {
    if (size <= config.minSize * 1.2) return 'u-size-fit-content';
    if (size >= config.maxSize * 0.8) return 'u-size-fill';
    return 'u-size-relative';
  };

  return {
    size,
    breakpoint,
    sizeClass: getSizeClass(),
    containerWidth: config.containerBased ? dimensions.containerWidth : undefined,
    containerHeight: config.containerBased ? dimensions.containerHeight : undefined,
    ref,
  };
}

export default useFluidSizing;