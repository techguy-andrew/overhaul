import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/navigation/TopBar";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ClientThemeProvider } from "@/components/theme/ClientThemeProvider";
import { ClientThemeInitializer } from "@/components/theme/ClientThemeInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Navigation System Demo | Semantic Design Tokens",
  description: "Ultra-portable navigation system built with semantic design tokens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientThemeProvider autoDetectClient={true}>
          <ClientThemeInitializer />
          <TopBar actions={<ThemeToggle />} />
          <main className="pt-16 bg-surface-background min-h-screen">
            {children}
          </main>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
