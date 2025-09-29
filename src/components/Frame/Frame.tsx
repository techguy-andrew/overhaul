/**
 * FRAME COMPONENT - Essential Stack/Grid Container
 * C-MOD/VAR Layer 3: Complete Framer Layout Property Implementation
 *
 * The Frame component is the fundamental layout primitive that provides
 * 100% Framer layout panel parity through utility class composition.
 */

import { forwardRef } from 'react';
import type { FrameProps } from '@/lib/types/framerProps';
import { mergeFramerClasses } from '@/lib/utils/propConversion';
import styles from './frame.module.css';

export const Frame = forwardRef<HTMLDivElement, FrameProps>(
  (
    {
      children,
      className,
      style,
      viewport = false,

      // Framer layout props
      position,
      width,
      height,
      layout = 'stack',
      direction = 'vertical',
      distribution,
      alignment,
      wrap,
      gap = true,
      padding,

      ...rest
    },
    ref
  ) => {
    // Convert Framer props to utility classes
    const framerProps = {
      position,
      width: viewport && width === 'fill' ? 'viewport' : width,
      height: viewport && height === 'fill' ? 'viewport' : height,
      layout,
      direction,
      distribution,
      alignment,
      wrap,
      gap,
      padding,
      className,
    };

    const frameClasses = mergeFramerClasses(framerProps, styles.frame);

    // For simplicity and type safety, we'll use div as the base element
    // The 'as' prop functionality can be extended later if needed
    return (
      <div
        ref={ref}
        className={frameClasses}
        style={style}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Frame.displayName = 'Frame';

export type { FrameProps };
export default Frame;