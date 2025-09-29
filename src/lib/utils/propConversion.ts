/**
 * FRAMER PROPS UTILITY FUNCTIONS
 * Converts Framer-style props to C-MOD/VAR utility class names
 * Provides type-safe prop-to-class mapping with intelligent defaults
 */

import type { FramerLayoutProps } from '../types/framerProps';

/**
 * Converts Framer-style layout props to utility class names
 * @param props - Framer layout props
 * @returns String of space-separated utility classes
 */
export function getFramerClasses(props: FramerLayoutProps): string {
  const classes: string[] = [];

  // Position
  if (props.position) {
    classes.push(`u-position-${props.position}`);
  }

  // Size - handle both width and height, with intelligent defaults
  if (props.width || props.height) {
    const sizeType = props.width || props.height || 'fit-content';
    classes.push(`u-size-${sizeType}`);
  }

  // Layout type with intelligent direction handling
  if (props.layout) {
    classes.push(`u-layout-${props.layout}`);

    // Auto-apply direction for stack layouts
    if (props.layout === 'stack' && props.direction) {
      classes.push(`u-direction-${props.direction}`);
    }
  }

  // Distribution (justify-content)
  if (props.distribution) {
    classes.push(`u-distribute-${props.distribution}`);
  }

  // Alignment (align-items)
  if (props.alignment) {
    classes.push(`u-align-${props.alignment}`);
  }

  // Wrap
  if (props.wrap) {
    classes.push(`u-wrap-${props.wrap}`);
  }

  // Spacing
  if (props.gap) {
    classes.push('u-gap');
  }

  if (props.padding) {
    classes.push('u-padding');
  }

  return classes.join(' ');
}

/**
 * Merges Framer classes with custom className prop
 * @param props - Framer layout props
 * @param additionalClasses - Additional CSS classes
 * @returns Combined class string
 */
export function mergeFramerClasses(
  props: FramerLayoutProps,
  additionalClasses?: string
): string {
  const framerClasses = getFramerClasses(props);
  const customClasses = props.className || '';
  const additional = additionalClasses || '';

  return [framerClasses, customClasses, additional]
    .filter(Boolean)
    .join(' ')
    .trim();
}

/**
 * Gets responsive size classes based on viewport conditions
 * @param size - Size type
 * @param viewport - Whether component should be viewport-aware
 * @returns Size class with viewport modifications if applicable
 */
export function getResponsiveSize(size: string, viewport?: boolean): string {
  if (viewport && size === 'fill') {
    return 'u-size-viewport';
  }
  return `u-size-${size}`;
}

/**
 * Intelligent layout class generation with contextual awareness
 * @param layout - Layout type
 * @param direction - Direction (for stack layouts)
 * @param wrap - Wrap behavior (for grid layouts)
 * @returns Optimized layout class combination
 */
export function getLayoutClasses(
  layout?: string,
  direction?: string,
  wrap?: string
): string {
  const classes: string[] = [];

  if (layout === 'stack') {
    classes.push('u-layout-stack');
    if (direction) {
      classes.push(`u-direction-${direction}`);
    }
  } else if (layout === 'grid') {
    classes.push('u-layout-grid');
    if (wrap) {
      classes.push(`u-wrap-${wrap}`);
    }
  }

  return classes.join(' ');
}

/**
 * Default Framer prop configurations for common use cases
 */
export const FramerDefaults = {
  Stack: {
    layout: 'stack' as const,
    direction: 'vertical' as const,
    gap: true,
    width: 'fill' as const,
  },
  Row: {
    layout: 'stack' as const,
    direction: 'horizontal' as const,
    gap: true,
    alignment: 'center' as const,
  },
  Grid: {
    layout: 'grid' as const,
    wrap: 'yes' as const,
    gap: true,
  },
  Card: {
    layout: 'stack' as const,
    direction: 'vertical' as const,
    padding: true,
    gap: true,
    width: 'fit-content' as const,
  },
  Button: {
    layout: 'stack' as const,
    direction: 'horizontal' as const,
    alignment: 'center' as const,
    distribution: 'center' as const,
    padding: true,
  },
} as const;