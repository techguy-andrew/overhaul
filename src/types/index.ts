// Global TypeScript type definitions

export interface BaseComponent {
  children?: React.ReactNode;
  className?: string;
}

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export type CardVariant = 'default' | 'outline';