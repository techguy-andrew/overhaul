/**
 * FRAMER-STYLE PROP TYPES
 * Complete TypeScript interface definitions for Framer layout parity
 * Provides type-safe props that map directly to C-MOD/VAR utility classes
 */

// ===== CORE LAYOUT TYPES =====

export type PositionType = 'relative' | 'absolute' | 'sticky' | 'fixed';

export type SizeType = 'fill' | 'relative' | 'fixed' | 'fit-content' | 'viewport';

export type LayoutType = 'stack' | 'grid';

export type DirectionType = 'horizontal' | 'vertical';

export type DistributionType = 'start' | 'center' | 'end' | 'space-between';

export type AlignmentType = 'start' | 'center' | 'end';

export type WrapType = 'yes' | 'no';

// ===== CORE FRAMER PROPS INTERFACE =====

export interface FramerLayoutProps {
  // Position
  position?: PositionType;

  // Size
  width?: SizeType;
  height?: SizeType;

  // Layout
  layout?: LayoutType;
  direction?: DirectionType;

  // Distribution and Alignment
  distribution?: DistributionType;
  alignment?: AlignmentType;

  // Wrapping
  wrap?: WrapType;

  // Spacing
  gap?: boolean;
  padding?: boolean;

  // Standard React props
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// ===== COMPONENT-SPECIFIC PROP EXTENSIONS =====

export interface UIComponentProps extends FramerLayoutProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
  loading?: boolean;
}

export interface ButtonProps extends UIComponentProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: 'small' | 'medium' | 'large';
}

export interface InputProps extends UIComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'search';
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
}

export interface CardProps extends FramerLayoutProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  title?: string;
  description?: string;
  elevated?: boolean;
}

// ===== LAYOUT COMPONENT PROPS =====

export interface FrameProps extends FramerLayoutProps {
  viewport?: boolean;
}

export interface StackProps extends FramerLayoutProps {
  spacing?: 'tight' | 'normal' | 'loose';
}

export interface GridProps extends FramerLayoutProps {
  columns?: number;
  rows?: number;
}

// ===== SECTION COMPONENT PROPS =====

export interface HeroProps extends FramerLayoutProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  overlayOpacity?: number;
}

export interface SidebarProps extends FramerLayoutProps {
  isOpen?: boolean;
  onToggle?: () => void;
  side?: 'left' | 'right';
}

export interface FooterProps extends FramerLayoutProps {
  copyright?: string;
  links?: Array<{ label: string; href: string }>;
}