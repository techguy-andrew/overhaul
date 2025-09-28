import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  disabled = false,
  type = 'button'
}: ButtonProps) {
  const sizeClass = size ? styles[size] : '';
  const widthClass = fullWidth ? styles.full : '';

  return (
    <button
      className={`${styles.button} ${styles[variant]} ${sizeClass} ${widthClass}`.trim()}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}