/*
  ROOT LAYOUT PRIMITIVE - C-MOD/VAR Axiomatic Foundation

  The single source of truth for layout governance.
  Establishes the non-negotiable viewport boundary condition
  that enables all contextual intelligence throughout the application.

  This component represents the CSS equivalent of mathematical axioms:
  the foundational truth that cannot be derived from more basic principles.
*/

import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
  className?: string;
}

export function RootLayout({ children, className = '' }: RootLayoutProps) {
  return (
    <div
      className={`u-layout-stack u-direction-vertical u-w-fill ${className}`.trim()}
      style={{
        height: '100vh',
        maxHeight: '100vh',
        overflow: 'hidden'
      }}
    >
      {children}
    </div>
  );
}

export default RootLayout;
export type { RootLayoutProps };