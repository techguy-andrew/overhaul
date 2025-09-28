import '../styles/globals.css';
import '../styles/components.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional App',
  description: 'Built with Next.js, TypeScript, and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
