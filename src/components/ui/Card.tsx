import styles from './Card.module.css';

interface CardProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export function Card({
  children,
  title = "Card Component",
  description = "This card demonstrates fluid responsive design with minimal tokens."
}: CardProps) {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  );
}

export type { CardProps };