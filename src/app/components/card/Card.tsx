import styles from './Card.module.css';

export function Card() {
  return (
    <div className={styles.card}>
      <h2>Learn Card Components</h2>
      <p>This card demonstrates the C-MOD/VAR standard: CSS Modules with design tokens!</p>
    </div>
  );
}