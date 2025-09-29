import styles from './Card.module.css';

interface CardProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  title?: string;
  description?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({
  children,
  variant = 'primary',
  title = "Card Component",
  description = "This card demonstrates the C-MOD/VAR standard: CSS Modules with design tokens!",
  className = '',
  style
}: CardProps) {
  return (
    <div
      className={`${styles.card} ${styles[variant]} u-layout-stack u-direction-vertical u-size-fill u-gap u-padding ${className}`}
      style={style}
    >
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  );
}

export type { CardProps };