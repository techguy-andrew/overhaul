"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Client component for interactive functionality
function InteractiveButton() {
  return (
    <Button onClick={() => alert('Button works!')} variant="secondary">
      Click Me
    </Button>
  );
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8">

        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">
            Learn Tailwind CSS + Professional Patterns
          </h1>
          <p className="text-muted-foreground text-lg">
            Master industry-standard layout patterns with default Tailwind tokens
          </p>
        </div>

        {/* Exercise 1: Single Card */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Exercise 1: Basic Card Component
          </h2>
          <p className="text-muted-foreground">
            Create a professional card using default Tailwind tokens:
          </p>
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md border border-blue-200 dark:border-blue-800">
            <code className="text-sm font-mono">
              bg-card text-card-foreground rounded-lg border shadow-sm p-6
            </code>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>My First Professional Card</CardTitle>
              <CardDescription>
                This card uses default Tailwind tokens: bg-card (semantic background), text-card-foreground (semantic text), rounded-lg (border radius), border (outline), shadow-sm (elevation), and p-6 (padding).
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* Exercise 2: Grid Layout */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Exercise 2: Responsive Grid (grid grid-cols-1 md:grid-cols-2)
          </h2>
          <p className="text-muted-foreground">
            Use Tailwind&apos;s responsive grid utilities for professional layouts:
          </p>
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md border border-blue-200 dark:border-blue-800">
            <code className="text-sm font-mono">
              grid grid-cols-1 md:grid-cols-2 gap-6 // Mobile-first responsive
            </code>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Card One</CardTitle>
                <CardDescription>
                  Uses Tailwind&apos;s default grid system. Stacks on mobile, side-by-side on md+ screens.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm">Learn More</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Card Two</CardTitle>
                <CardDescription>
                  Same responsive behavior with consistent gap spacing using gap-6 token.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" variant="secondary">Explore</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Exercise 3: Three Column Layout */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Exercise 3: Three Columns (grid-cols-3)
          </h2>
          <p className="text-muted-foreground">
            Create equal-width columns using Tailwind&apos;s default grid utilities:
          </p>
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md border border-blue-200 dark:border-blue-800">
            <code className="text-sm font-mono">
              grid grid-cols-1 lg:grid-cols-3 gap-4 // Default Tailwind responsive
            </code>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Feature A</CardTitle>
                <CardDescription>
                  Uses lg:grid-cols-3 for desktop three-column layout.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Feature B</CardTitle>
                <CardDescription>
                  Automatically stacks on smaller screens with mobile-first approach.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Feature C</CardTitle>
                <CardDescription>
                  All spacing uses default Tailwind gap and padding tokens.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Exercise 4: Flexbox Stack */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Exercise 4: Vertical Stack (space-y-*)
          </h2>
          <p className="text-muted-foreground">
            Stack components vertically with consistent spacing using Tailwind&apos;s space utilities:
          </p>
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md border border-blue-200 dark:border-blue-800">
            <code className="text-sm font-mono">
              space-y-4 max-w-sm // Vertical spacing with width constraint
            </code>
          </div>

          <div className="space-y-4 max-w-sm">
            <Card>
              <CardHeader>
                <CardTitle>Stacked Card 1</CardTitle>
                <CardDescription>Uses space-y-4 for consistent vertical rhythm.</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Stacked Card 2</CardTitle>
                <CardDescription>Maintains professional spacing without custom CSS.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="w-fit">
              <CardHeader>
                <CardTitle>Auto-width Card</CardTitle>
                <CardDescription>Uses w-fit for content-aware sizing.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Exercise 5: Practice Area */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Exercise 5: Tailwind Practice Area
          </h2>
          <p className="text-muted-foreground">
            Practice with these professional Tailwind utility patterns:
          </p>

          <div className="bg-muted/50 p-6 rounded-lg border-2 border-dashed border-muted-foreground/25">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">
                Default Tailwind Tokens to Learn:
              </h3>
              <div className="flex flex-wrap gap-2">
                <code className="bg-background px-2 py-1 rounded text-sm border font-mono">
                  grid grid-cols-* gap-*
                </code>
                <code className="bg-background px-2 py-1 rounded text-sm border font-mono">
                  space-y-* space-x-*
                </code>
                <code className="bg-background px-2 py-1 rounded text-sm border font-mono">
                  p-* m-* px-* py-*
                </code>
                <code className="bg-background px-2 py-1 rounded text-sm border font-mono">
                  text-* font-* tracking-*
                </code>
                <code className="bg-background px-2 py-1 rounded text-sm border font-mono">
                  bg-* text-* border-*
                </code>
                <code className="bg-background px-2 py-1 rounded text-sm border font-mono">
                  rounded-* shadow-*
                </code>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-center items-center gap-4">
                <Card className="w-fit">
                  <CardHeader>
                    <CardTitle>Practice Card</CardTitle>
                    <CardDescription>
                      Modify this layout using default Tailwind tokens! Try changing classes and see the results.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <InteractiveButton />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Cheat Sheet */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Default Tailwind CSS Quick Reference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Layout Patterns</CardTitle>
                <CardDescription>
                  grid (container) → grid-cols-* (columns) → gap-* (spacing) → responsive prefixes (sm:, md:, lg:)
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Spacing & Sizing</CardTitle>
                <CardDescription>
                  p-* (padding) → m-* (margin) → space-y-* (vertical) → w-* h-* (dimensions) → max-w-* (constraints)
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="bg-green-50 dark:bg-green-950/50 p-4 rounded-md border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              🎉 Professional Setup Complete!
            </h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Your project now uses industry-standard Tailwind CSS with default tokens, professional component patterns, and TypeScript interfaces - ready for agency work!
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}