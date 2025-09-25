interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled,
  className = ''
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-interactive-primary hover:bg-interactive-primary-hover text-white',
    secondary: 'bg-interactive-secondary hover:bg-interactive-secondary-hover text-text-primary',
    danger: 'bg-interactive-danger hover:bg-interactive-danger-hover text-white'
  };

  const sizeClasses = {
    sm: 'px-element-gap py-2 text-sm',
    md: 'px-container-padding py-3',
    lg: 'px-component-gap py-4 text-lg'
  };

  const baseClasses = 'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-interactive-primary focus:ring-offset-2';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const allClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={allClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}