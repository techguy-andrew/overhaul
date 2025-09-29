/*
  FRAME COMPONENT - C-MOD/VAR Layer 3

  Production-grade component with exact Framer property mapping.
  Provides minimal, type-safe API that hides contextual complexity.
  Delivers exceptional developer experience matching Framer's visual interface.
*/

import { ReactNode } from 'react';

interface FrameProps {
  // Position Properties (Framer-aligned)
  position?: 'relative' | 'absolute' | 'sticky' | 'fixed';

  // Size Properties (Framer-aligned)
  width?: 'fixed' | 'relative' | 'fill' | 'fit-content' | 'fit-image';
  height?: 'fixed' | 'relative' | 'fill' | 'fit-content' | 'fit-image' | 'viewport';

  // Layout Properties (Framer-aligned)
  layout?: 'stack' | 'grid';
  direction?: 'vertical' | 'horizontal';

  // Distribution & Alignment (Framer-aligned)
  distribute?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'start' | 'center' | 'end';
  wrap?: 'yes' | 'no';

  // Spacing Properties
  gap?: boolean;
  padding?: boolean;

  // React Properties
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Frame({
  position = 'relative',
  width = 'fill',
  height = 'fit-content',
  layout = 'stack',
  direction = 'horizontal',
  distribute = 'start',
  align = 'start',
  wrap = 'no',
  gap = false,
  padding = false,
  children,
  className = '',
  style
}: FrameProps) {
  // Generate utility classes based on props
  const utilityClasses = [
    // Position
    `u-position-${position}`,

    // Size (the contextual intelligence happens here)
    `u-w-${width}`,
    `u-h-${height}`,

    // Layout type
    `u-layout-${layout}`,

    // Direction (only applies to stack layouts)
    layout === 'stack' && `u-direction-${direction}`,

    // Distribution & Alignment
    `u-distribute-${distribute}`,
    `u-align-${align}`,

    // Wrap
    `u-wrap-${wrap}`,

    // Spacing
    gap && 'u-gap',
    padding && 'u-padding'
  ].filter(Boolean).join(' ');

  // Combine utility classes with any custom className
  const finalClassName = [utilityClasses, className].filter(Boolean).join(' ');

  return (
    <div className={finalClassName} style={style}>
      {children}
    </div>
  );
}

export type { FrameProps };