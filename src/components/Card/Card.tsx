/**
 * CARD COMPONENT - Canonical Framer Layout Learning Example
 * C-MOD/VAR Layer 3: Complete Framer Property Implementation
 *
 * The Card component serves as the primary learning tool for understanding
 * how all 22 Framer layout properties translate to utility classes.
 */

import { forwardRef } from 'react';
import type { CardProps } from '@/lib/types/framerProps';
import { mergeFramerClasses, FramerDefaults } from '@/lib/utils/propConversion';
import styles from './card.module.css';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'primary',
      title = "Card Component",
      description = "This card demonstrates the C-MOD/VAR standard: CSS Modules with design tokens!",
      elevated = false,
      className,
      style,

      // Framer layout props with intelligent defaults for Cards
      position,
      width,
      height,
      layout = FramerDefaults.Card.layout,
      direction = FramerDefaults.Card.direction,
      distribution,
      alignment,
      wrap,
      gap = FramerDefaults.Card.gap,
      padding = FramerDefaults.Card.padding,

      ...rest
    },
    ref
  ) => {
    // Convert Framer props to utility classes
    const framerProps = {
      position,
      width,
      height,
      layout,
      direction,
      distribution,
      alignment,
      wrap,
      gap,
      padding,
      className,
    };

    const cardClasses = mergeFramerClasses(
      framerProps,
      `${styles.card} ${styles[variant]} ${elevated ? styles.elevated : ''}`
    );

    return (
      <div
        ref={ref}
        className={cardClasses}
        style={style}
        {...rest}
      >
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export type { CardProps };
export default Card;