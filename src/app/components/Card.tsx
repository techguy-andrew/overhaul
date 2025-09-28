import styles from './Card.module.css';

interface CardProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  description?: string;
}

export function Card({
  children,
  variant = 'primary',
  size = 'md',
  title = "Card Component",
  description = "This card demonstrates the C-MOD/VAR standard: CSS Modules with design tokens!"
}: CardProps) {
  const sizeClass = size ? styles[size] : '';

  return (
    <div className={`${styles.card} ${styles[variant]} ${sizeClass}`.trim()}>
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  );
}

export type { CardProps };