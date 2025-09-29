import { Card } from '@/components/ui';

export default function Home() {
  return (
    <div className="u-layout-stack u-direction-vertical u-size-fill u-padding">
      <main className="u-layout-stack u-direction-vertical u-size-fill u-gap">

        {/* Header - Demonstrates: Stack + Vertical + Gap + Padding */}
        <header className="u-layout-stack u-direction-vertical u-gap u-padding">
          <h1>🎯 C-MOD/VAR Interactive Learning Lab</h1>
          <h2>Master All 22 Framer Properties Through Live Card Examples</h2>
          <p>
            This page IS the lesson! Every section demonstrates the exact C-MOD/VAR patterns it teaches.
            Watch how Cards transform with each property change - from Position to Size to Layout behavior.
          </p>
          <div className="u-layout-stack u-direction-horizontal u-wrap-yes u-gap">
            <span><strong>Layer 1:</strong> 22 Design Tokens</span>
            <span><strong>Layer 2:</strong> 22 Utility Classes</span>
            <span><strong>Layer 3:</strong> Card.module.css</span>
          </div>
        </header>

        {/* SECTION 1: POSITION PROPERTIES (4) */}
        <section className="u-layout-stack u-direction-vertical u-gap u-padding">
          <h2>🎯 Section 1: Position Properties (4/22)</h2>
          <p>Control element positioning behavior - exactly like Framer&apos;s Position panel</p>

          {/* Exercise 1.1: Relative Position */}
          <div className="u-layout-stack u-direction-vertical u-gap">
            <h3>1.1 Position: Relative</h3>
            <p><strong>Token:</strong> <code>--position-relative: relative</code></p>
            <p><strong>Utility:</strong> <code>.u-position-relative</code></p>
            <p><strong>Behavior:</strong> Element participates in document flow, can be offset</p>

            <div className="u-layout-stack u-direction-vertical u-size-fill u-gap u-padding">
              <Card
                title="Relative Positioned Card"
                description="position: relative - I'm in the normal document flow"
                variant="primary"
              />
            </div>
          </div>

          {/* Exercise 1.2: Absolute Position */}
          <div className="u-layout-stack u-direction-vertical u-gap">
            <h3>1.2 Position: Absolute</h3>
            <p><strong>Token:</strong> <code>--position-absolute: absolute</code></p>
            <p><strong>Utility:</strong> <code>.u-position-absolute</code></p>
            <p><strong>Behavior:</strong> Element removed from flow, positioned relative to nearest positioned ancestor</p>

            <div className="u-position-relative u-layout-stack u-direction-vertical u-size-fill u-gap u-padding">
              <div className="u-position-absolute" style={{ top: '10px', right: '10px', zIndex: 10 }}>
                <Card
                  title="Absolute Card"
                  description="position: absolute; top: 10px; right: 10px"
                  variant="secondary"
                />
              </div>
              <div style={{ height: '120px', background: '#f9fafb', borderRadius: '8px' }}>
                <p style={{ padding: '16px' }}>Container with relative positioning - the absolute card positions relative to me!</p>
              </div>
            </div>
          </div>

          {/* Exercise 1.3: Sticky Position */}
          <div className="u-layout-stack u-direction-vertical u-gap">
            <h3>1.3 Position: Sticky</h3>
            <p><strong>Token:</strong> <code>--position-sticky: sticky</code></p>
            <p><strong>Utility:</strong> <code>.u-position-sticky</code></p>
            <p><strong>Behavior:</strong> Element switches between relative and fixed based on scroll position</p>

            <div className="u-layout-stack u-direction-vertical u-size-fill" style={{ height: '300px', overflow: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <div className="u-position-sticky" style={{ top: '0', zIndex: 5 }}>
                <Card
                  title="Sticky Header Card"
                  description="position: sticky; top: 0 - Scroll to see me stick!"
                  variant="primary"
                />
              </div>
              <div className="u-padding" style={{ height: '600px', background: '#f9fafb' }}>
                <p>Scroll down to see the sticky behavior...</p>
                <p style={{ marginTop: '100px' }}>The card above stays fixed at the top while you scroll!</p>
                <p style={{ marginTop: '100px' }}>Keep scrolling...</p>
                <p style={{ marginTop: '100px' }}>Notice how the sticky card follows you!</p>
              </div>
            </div>
          </div>

          {/* Exercise 1.4: Fixed Position */}
          <div className="u-layout-stack u-direction-vertical u-gap">
            <h3>1.4 Position: Fixed</h3>
            <p><strong>Token:</strong> <code>--position-fixed: fixed</code></p>
            <p><strong>Utility:</strong> <code>.u-position-fixed</code></p>
            <p><strong>Behavior:</strong> Element positioned relative to viewport, stays in place during scroll</p>
            <p style={{ padding: '8px', background: '#fef3c7', borderRadius: '4px', fontSize: '14px' }}>
              ⚠️ Fixed elements removed from normal flow - use sparingly for overlays, modals, navigation
            </p>
          </div>
        </section>

        {/* SECTION 2: SIZE PROPERTIES (5) */}
        <section className="u-layout-stack u-direction-vertical u-gap u-padding">
          <h2>📏 Section 2: Size Properties (5/22)</h2>
          <p>Control element dimensions - the heart of Framer&apos;s responsive behavior</p>

          {/* Exercise 2.1: Fill Size */}
          <div className="u-layout-stack u-direction-vertical u-gap">
            <h3>2.1 Size: Fill</h3>
            <p><strong>Token:</strong> <code>--size-fill: 100%</code></p>
            <p><strong>Utility:</strong> <code>.u-size-fill</code></p>
            <p><strong>Behavior:</strong> Element expands to fill all available container space</p>

            <div className="u-layout-stack u-direction-vertical u-size-fill" style={{ height: '200px', border: '2px dashed #3b82f6', borderRadius: '8px', padding: '8px' }}>
              <Card
                title="Fill-Sized Card"
                description="width: 100%; height: 100%; flex: 1 1 auto - I fill the blue dashed container!"
                variant="primary"
              />
            </div>
          </div>

          {/* Exercise 2.2: Relative Size */}
          <div className="u-layout-stack u-direction-vertical u-gap">
            <h3>2.2 Size: Relative</h3>
            <p><strong>Token:</strong> <code>--size-relative: 1fr</code></p>
            <p><strong>Utility:</strong> <code>.u-size-relative</code></p>
            <p><strong>Behavior:</strong> Element shares available space proportionally with other relative elements</p>

            <div className="u-layout-stack u-direction-horizontal u-gap" style={{ height: '120px', border: '2px dashed #10b981', borderRadius: '8px', padding: '8px' }}>
              <div className="u-size-relative">
                <Card title="Relative 1" description="flex: 1fr" variant="primary" />
              </div>
              <div className="u-size-relative">
                <Card title="Relative 2" description="flex: 1fr" variant="secondary" />
              </div>
              <div className="u-size-relative">
                <Card title="Relative 3" description="flex: 1fr" variant="primary" />
              </div>
            </div>
          </div>

          {/* Exercise 2.3: Fixed Size */}
          <div className="u-layout-stack u-direction-vertical u-gap">
            <h3>2.3 Size: Fixed</h3>
            <p><strong>Token:</strong> <code>--size-fixed: 320px</code></p>
            <p><strong>Utility:</strong> <code>.u-size-fixed</code></p>
            <p><strong>Behavior:</strong> Element maintains exact pixel dimensions regardless of container</p>

            <div className="u-layout-stack u-direction-horizontal u-gap" style={{ border: '2px dashed #f59e0b', borderRadius: '8px', padding: '8px' }}>
              <div className="u-size-fixed">
                <Card title="Fixed Card" description="width: 320px; height: 320px; flex-shrink: 0" variant="secondary" />
              </div>
              <div className="u-size-fill u-padding">
                <p>I&apos;m a fill element that takes the remaining space after the fixed 320px card!</p>
                <p>The fixed card never changes size, even if you resize the browser.</p>
              </div>
            </div>
          </div>

          {/* Exercise 2.4: Fit Content Size */}
          <div className="u-layout-stack u-direction-vertical u-gap">
            <h3>2.4 Size: Fit Content</h3>
            <p><strong>Token:</strong> <code>--size-fit-content: fit-content</code></p>
            <p><strong>Utility:</strong> <code>.u-size-fit-content</code></p>
            <p><strong>Behavior:</strong> Element shrinks to content size, never grows beyond content needs</p>

            <div className="u-layout-stack u-direction-horizontal u-gap u-align-start" style={{ border: '2px dashed #8b5cf6', borderRadius: '8px', padding: '8px' }}>
              <div className="u-size-fit-content">
                <Card title="Fit Content" description="width: fit-content; height: fit-content" variant="primary" />
              </div>
              <div className="u-size-fit-content">
                <Card title="This card has much longer content that makes it wider" description="Still fit-content, just bigger!" variant="secondary" />
              </div>
            </div>
          </div>

          {/* Exercise 2.5: Viewport Size */}
          <div className="u-layout-stack u-direction-vertical u-gap">
            <h3>2.5 Size: Viewport</h3>
            <p><strong>Token:</strong> <code>--size-viewport: 100vh</code></p>
            <p><strong>Utility:</strong> <code>.u-size-viewport</code></p>
            <p><strong>Behavior:</strong> Element sizes relative to viewport dimensions</p>
            <p style={{ padding: '8px', background: '#fef3c7', borderRadius: '4px', fontSize: '14px' }}>
              ⚠️ Viewport sizing shown conceptually - full viewport cards would break page layout
            </p>
          </div>
        </section>

        {/* SECTION 3: LAYOUT & DIRECTION PROPERTIES (4) */}
        <section className="u-layout-stack u-direction-vertical u-gap u-padding">
          <h2>🏗️ Section 3: Layout & Direction Properties (4/22)</h2>
          <p>Control layout containers and flow direction - the foundation of all layouts</p>

          {/* Exercise 3.1: Stack Layout */}
          <div className="u-layout-stack u-direction-vertical u-gap">
            <h3>3.1 Layout: Stack</h3>
            <p><strong>Token:</strong> <code>--layout-type-stack: flex</code></p>
            <p><strong>Utility:</strong> <code>.u-layout-stack</code></p>
            <p><strong>Behavior:</strong> Creates flexbox container for linear layouts</p>

            <div className="u-layout-stack u-direction-horizontal u-gap" style={{ border: '2px dashed #ef4444', borderRadius: '8px', padding: '8px' }}>
              <Card title="Stack Child 1" description="I'm in a horizontal stack" variant="primary" />
              <Card title="Stack Child 2" description="Linear arrangement" variant="secondary" />
              <Card title="Stack Child 3" description="Perfect alignment" variant="primary" />
            </div>
          </div>

          {/* Exercise 3.2: Grid Layout */}
          <div className="u-layout-stack u-direction-vertical u-gap">
            <h3>3.2 Layout: Grid</h3>
            <p><strong>Token:</strong> <code>--layout-type-grid: flex</code></p>
            <p><strong>Utility:</strong> <code>.u-layout-grid</code></p>
            <p><strong>Behavior:</strong> Creates flexbox container with wrapping enabled for grid-like layouts</p>

            <div className="u-layout-grid u-gap" style={{ border: '2px dashed #06b6d4', borderRadius: '8px', padding: '8px' }}>
              <div style={{ minWidth: '200px', flex: '1 1 200px' }}>
                <Card title="Grid Item 1" description="flex: 1 1 200px" variant="primary" />
              </div>
              <div style={{ minWidth: '200px', flex: '1 1 200px' }}>
                <Card title="Grid Item 2" description="Wraps when needed" variant="secondary" />
              </div>
              <div style={{ minWidth: '200px', flex: '1 1 200px' }}>
                <Card title="Grid Item 3" description="Responsive by nature" variant="primary" />
              </div>
              <div style={{ minWidth: '200px', flex: '1 1 200px' }}>
                <Card title="Grid Item 4" description="Resize browser to see wrapping" variant="secondary" />
              </div>
            </div>
          </div>

          {/* Exercise 3.3: Horizontal Direction */}
          <div className="u-layout-stack u-direction-vertical u-gap">
            <h3>3.3 Direction: Horizontal</h3>
            <p><strong>Token:</strong> <code>--direction-horizontal: row</code></p>
            <p><strong>Utility:</strong> <code>.u-direction-horizontal</code></p>
            <p><strong>Behavior:</strong> Sets main axis from left to right</p>

            <div className="u-layout-stack u-direction-horizontal u-gap" style={{ border: '2px dashed #84cc16', borderRadius: '8px', padding: '8px' }}>
              <Card title="→ Left" description="flex-direction: row" variant="primary" />
              <Card title="→ Center" description="Horizontal flow" variant="secondary" />
              <Card title="→ Right" description="Left to right" variant="primary" />
            </div>
          </div>

          {/* Exercise 3.4: Vertical Direction */}
          <div className="u-layout-stack u-direction-vertical u-gap">
            <h3>3.4 Direction: Vertical</h3>
            <p><strong>Token:</strong> <code>--direction-vertical: column</code></p>
            <p><strong>Utility:</strong> <code>.u-direction-vertical</code></p>
            <p><strong>Behavior:</strong> Sets main axis from top to bottom</p>

            <div className="u-layout-stack u-direction-vertical u-gap" style={{ border: '2px dashed #f97316', borderRadius: '8px', padding: '8px', width: '200px' }}>
              <Card title="↓ Top" description="flex-direction: column" variant="primary" />
              <Card title="↓ Middle" description="Vertical flow" variant="secondary" />
              <Card title="↓ Bottom" description="Top to bottom" variant="primary" />
            </div>
          </div>
        </section>

        {/* SECTION 4: DISTRIBUTION & ALIGNMENT PROPERTIES (7) */}
        <section className="u-layout-stack u-direction-vertical u-gap u-padding">
          <h2>⚖️ Section 4: Distribution & Alignment Properties (7/22)</h2>
          <p>Control how elements are distributed and aligned - precise positioning control</p>

          {/* Distribution Examples */}
          <div className="u-layout-stack u-direction-vertical u-gap">
            <h3>4.1-4.4 Distribution Properties</h3>
            <p>Control main axis spacing with <code>justify-content</code></p>

            <div className="u-layout-stack u-direction-vertical u-gap">
              <div>
                <h4>Start Distribution</h4>
                <div className="u-layout-stack u-direction-horizontal u-distribute-start" style={{ height: '80px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}>
                  <Card title="Start 1" description="justify-content: flex-start" variant="primary" />
                  <Card title="Start 2" description="Packed at start" variant="secondary" />
                </div>
              </div>

              <div>
                <h4>Center Distribution</h4>
                <div className="u-layout-stack u-direction-horizontal u-distribute-center" style={{ height: '80px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}>
                  <Card title="Center 1" description="justify-content: center" variant="primary" />
                  <Card title="Center 2" description="Centered together" variant="secondary" />
                </div>
              </div>

              <div>
                <h4>End Distribution</h4>
                <div className="u-layout-stack u-direction-horizontal u-distribute-end" style={{ height: '80px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}>
                  <Card title="End 1" description="justify-content: flex-end" variant="primary" />
                  <Card title="End 2" description="Packed at end" variant="secondary" />
                </div>
              </div>

              <div>
                <h4>Space Between Distribution</h4>
                <div className="u-layout-stack u-direction-horizontal u-distribute-space-between" style={{ height: '80px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}>
                  <Card title="Space 1" description="justify-content: space-between" variant="primary" />
                  <Card title="Space 2" description="Equal space between" variant="secondary" />
                </div>
              </div>
            </div>
          </div>

          {/* Alignment Examples */}
          <div className="u-layout-stack u-direction-vertical u-gap">
            <h3>4.5-4.7 Alignment Properties</h3>
            <p>Control cross axis positioning with <code>align-items</code></p>

            <div className="u-layout-stack u-direction-horizontal u-gap">
              <div className="u-size-relative">
                <h4>Start Alignment</h4>
                <div className="u-layout-stack u-direction-horizontal u-align-start" style={{ height: '120px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}>
                  <Card title="Align Start" description="align-items: flex-start" variant="primary" />
                </div>
              </div>

              <div className="u-size-relative">
                <h4>Center Alignment</h4>
                <div className="u-layout-stack u-direction-horizontal u-align-center" style={{ height: '120px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}>
                  <Card title="Align Center" description="align-items: center" variant="secondary" />
                </div>
              </div>

              <div className="u-size-relative">
                <h4>End Alignment</h4>
                <div className="u-layout-stack u-direction-horizontal u-align-end" style={{ height: '120px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}>
                  <Card title="Align End" description="align-items: flex-end" variant="primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: WRAP & SPACING PROPERTIES (4) */}
        <section className="u-layout-stack u-direction-vertical u-gap u-padding">
          <h2>🌊 Section 5: Wrap & Spacing Properties (4/22)</h2>
          <p>Control wrapping behavior and spacing - the finishing touches for perfect layouts</p>

          {/* Wrap Examples */}
          <div className="u-layout-stack u-direction-vertical u-gap">
            <h3>5.1-5.2 Wrap Properties</h3>

            <div>
              <h4>Wrap: Yes</h4>
              <p><strong>Utility:</strong> <code>.u-wrap-yes</code> - Elements wrap to new lines when needed</p>
              <div className="u-layout-stack u-direction-horizontal u-wrap-yes u-gap" style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}>
                <div style={{ minWidth: '200px' }}>
                  <Card title="Wrap Card 1" description="flex-wrap: wrap" variant="primary" />
                </div>
                <div style={{ minWidth: '200px' }}>
                  <Card title="Wrap Card 2" description="Will wrap if needed" variant="secondary" />
                </div>
                <div style={{ minWidth: '200px' }}>
                  <Card title="Wrap Card 3" description="Resize browser to see" variant="primary" />
                </div>
                <div style={{ minWidth: '200px' }}>
                  <Card title="Wrap Card 4" description="Responsive wrapping" variant="secondary" />
                </div>
              </div>
            </div>

            <div>
              <h4>Wrap: No</h4>
              <p><strong>Utility:</strong> <code>.u-wrap-no</code> - Elements stay on single line, may overflow</p>
              <div className="u-layout-stack u-direction-horizontal u-wrap-no u-gap" style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px', overflow: 'auto' }}>
                <div style={{ minWidth: '200px', flexShrink: 0 }}>
                  <Card title="No Wrap 1" description="flex-wrap: nowrap" variant="primary" />
                </div>
                <div style={{ minWidth: '200px', flexShrink: 0 }}>
                  <Card title="No Wrap 2" description="Stays in line" variant="secondary" />
                </div>
                <div style={{ minWidth: '200px', flexShrink: 0 }}>
                  <Card title="No Wrap 3" description="May cause overflow" variant="primary" />
                </div>
                <div style={{ minWidth: '200px', flexShrink: 0 }}>
                  <Card title="No Wrap 4" description="Scroll horizontally →" variant="secondary" />
                </div>
              </div>
            </div>
          </div>

          {/* Spacing Examples */}
          <div className="u-layout-stack u-direction-vertical u-gap">
            <h3>5.3-5.4 Spacing Properties</h3>

            <div className="u-layout-stack u-direction-horizontal u-gap">
              <div className="u-size-relative">
                <h4>Gap Spacing</h4>
                <p><strong>Token:</strong> <code>--spacing-gap: 16px</code></p>
                <div className="u-layout-stack u-direction-vertical u-gap" style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}>
                  <Card title="Gap Card 1" description="gap: 16px between items" variant="primary" />
                  <Card title="Gap Card 2" description="Consistent spacing" variant="secondary" />
                  <Card title="Gap Card 3" description="No margin needed!" variant="primary" />
                </div>
              </div>

              <div className="u-size-relative">
                <h4>Padding Spacing</h4>
                <p><strong>Token:</strong> <code>--spacing-padding: 16px</code></p>
                <div className="u-padding" style={{ border: '1px solid #e5e7eb', borderRadius: '8px', background: '#f9fafb' }}>
                  <Card title="Padded Card" description="padding: 16px around me" variant="secondary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MASTERY SUMMARY */}
        <section className="u-layout-stack u-direction-vertical u-gap u-padding">
          <h2>🎓 Congratulations! Complete Framer → Flexbox Mastery</h2>
          <p>You&apos;ve experienced all 22 Framer layout properties through live Card examples!</p>

          <div className="u-layout-grid u-gap" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div className="u-padding" style={{ background: '#f0f9ff', border: '1px solid #0ea5e9', borderRadius: '8px' }}>
              <h3>Layer 1: Design Tokens</h3>
              <p>22 CSS variables defining every layout value</p>
              <ul style={{ fontSize: '14px', marginLeft: '16px' }}>
                <li>4 Position tokens</li>
                <li>5 Size tokens</li>
                <li>2 Layout type tokens</li>
                <li>2 Direction tokens</li>
                <li>4 Distribution tokens</li>
                <li>3 Alignment tokens</li>
                <li>2 Wrap tokens</li>
                <li>2 Spacing tokens</li>
              </ul>
            </div>

            <div className="u-padding" style={{ background: '#f0fdf4', border: '1px solid #10b981', borderRadius: '8px' }}>
              <h3>Layer 2: Utility Classes</h3>
              <p>22 utility classes for consistent application</p>
              <ul style={{ fontSize: '14px', marginLeft: '16px' }}>
                <li><code>.u-position-*</code></li>
                <li><code>.u-size-*</code></li>
                <li><code>.u-layout-*</code></li>
                <li><code>.u-direction-*</code></li>
                <li><code>.u-distribute-*</code></li>
                <li><code>.u-align-*</code></li>
                <li><code>.u-wrap-*</code></li>
                <li><code>.u-gap</code> & <code>.u-padding</code></li>
              </ul>
            </div>

            <div className="u-padding" style={{ background: '#fef7ff', border: '1px solid #a855f7', borderRadius: '8px' }}>
              <h3>Layer 3: Component Scoping</h3>
              <p>CSS Modules for component-specific styles</p>
              <ul style={{ fontSize: '14px', marginLeft: '16px' }}>
                <li>Card.module.css</li>
                <li>Button.module.css</li>
                <li>Encapsulated styling</li>
                <li>Token-based consistency</li>
                <li>Perfect Framer parity</li>
              </ul>
            </div>
          </div>

          <div className="u-padding" style={{ background: '#fffbeb', border: '1px solid #f59e0b', borderRadius: '8px' }}>
            <h3>🚀 What You&apos;ve Learned</h3>
            <p>This page IS the C-MOD/VAR Standard in action. Every layout you see was built using:</p>
            <ul style={{ marginLeft: '20px' }}>
              <li><strong>Token-First Development:</strong> Every spacing, size, and layout property references Layer 1 tokens</li>
              <li><strong>Utility-Driven Layout:</strong> Complex layouts built by combining simple utility classes</li>
              <li><strong>Component Encapsulation:</strong> Card.tsx uses CSS Modules while staying token-consistent</li>
              <li><strong>Perfect Framer Parity:</strong> Every property maps 1:1 with Framer&apos;s layout panel</li>
            </ul>
            <p><strong>Result:</strong> Maintainable, scalable, designer-friendly CSS architecture that scales infinitely!</p>
          </div>
        </section>

      </main>
    </div>
  );
}