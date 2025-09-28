import styles from './Card.module.css';

interface CardProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  title?: string;
  description?: string;
}

export function Card({
  children,
  variant = 'primary',
  title = "Card Component",
  description = "This card demonstrates the C-MOD/VAR standard: CSS Modules with design tokens!"
}: CardProps) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  );
}

export type { CardProps };