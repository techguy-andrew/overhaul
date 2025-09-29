import { Card, Frame } from '@/components';

export default function Home() {
  return (
    <Frame layout="stack" direction="vertical" width="fill" padding gap>
      <Frame layout="stack" direction="vertical" width="fill" gap>

        {/* Header - Demonstrates: Frame with stack layout + vertical direction + gap + padding */}
        <Frame layout="stack" direction="vertical" gap padding>
          <h1>🎯 C-MOD/VAR Interactive Learning Lab</h1>
          <h2>Master All 22 Framer Properties Through Live Card and Frame Examples</h2>
          <p>
            This page IS the lesson! Every section demonstrates the exact C-MOD/VAR patterns it teaches.
            Watch how Cards and Frames transform with each Framer property - from Position to Size to Layout behavior.
          </p>
          <Frame layout="stack" direction="horizontal" wrap="yes" gap>
            <span><strong>Layer 1:</strong> 22 Design Tokens in tokens.css</span>
            <span><strong>Layer 2:</strong> 22 Utility Classes in utilities.css</span>
            <span><strong>Layer 3:</strong> card.module.css & frame.module.css</span>
          </Frame>
        </Frame>

        {/* SECTION 1: POSITION PROPERTIES (4) */}
        <Frame layout="stack" direction="vertical" gap padding>
          <h2>🎯 Section 1: Position Properties (4/22)</h2>
          <p>Control element positioning behavior - exactly like Framer&apos;s Position panel</p>

          {/* Exercise 1.1: Relative Position */}
          <Frame layout="stack" direction="vertical" gap>
            <h3>1.1 Position: Relative</h3>
            <p><strong>Token:</strong> <code>--position-relative: relative</code> in tokens.css</p>
            <p><strong>Utility:</strong> <code>.u-position-relative</code> in utilities.css</p>
            <p><strong>Framer Prop:</strong> <code>position=&quot;relative&quot;</code></p>
            <p><strong>Behavior:</strong> Element participates in document flow, can be offset</p>

            <Frame layout="stack" direction="vertical" width="fill" gap padding style={{ border: '2px dashed #3b82f6', borderRadius: '8px' }}>
              <Card
                position="relative"
                title="Relative Positioned Card"
                description="position='relative' - I'm in the normal document flow"
                variant="primary"
              />
            </Frame>
          </Frame>

          {/* Exercise 1.2: Absolute Position */}
          <Frame layout="stack" direction="vertical" gap>
            <h3>1.2 Position: Absolute</h3>
            <p><strong>Token:</strong> <code>--position-absolute: absolute</code> in tokens.css</p>
            <p><strong>Utility:</strong> <code>.u-position-absolute</code> in utilities.css</p>
            <p><strong>Framer Prop:</strong> <code>position=&quot;absolute&quot;</code></p>
            <p><strong>Behavior:</strong> Element removed from flow, positioned relative to nearest positioned ancestor</p>

            <Frame position="relative" layout="stack" direction="vertical" width="fill" gap padding style={{ border: '2px dashed #10b981', borderRadius: '8px', minHeight: '150px' }}>
              <Card
                position="absolute"
                title="Absolute Card"
                description="position='absolute' - I float above everything!"
                variant="secondary"
                style={{ top: '10px', right: '10px', zIndex: 10 }}
              />
              <div style={{ height: '100px', background: '#f9fafb', borderRadius: '8px', padding: '16px' }}>
                <p>Container with relative positioning - the absolute card positions relative to me!</p>
              </div>
            </Frame>
          </Frame>

          {/* Exercise 1.3: Sticky Position */}
          <Frame layout="stack" direction="vertical" gap>
            <h3>1.3 Position: Sticky</h3>
            <p><strong>Token:</strong> <code>--position-sticky: sticky</code> in tokens.css</p>
            <p><strong>Utility:</strong> <code>.u-position-sticky</code> in utilities.css</p>
            <p><strong>Framer Prop:</strong> <code>position=&quot;sticky&quot;</code></p>
            <p><strong>Behavior:</strong> Element switches between relative and fixed based on scroll position</p>

            <Frame layout="stack" direction="vertical" width="fill" style={{ height: '300px', overflow: 'auto', border: '2px dashed #f59e0b', borderRadius: '8px' }}>
              <Card
                position="sticky"
                title="Sticky Header Card"
                description="position='sticky' - Scroll to see me stick!"
                variant="primary"
                style={{ top: '0', zIndex: 5 }}
              />
              <Frame padding style={{ height: '600px', background: '#f9fafb' }}>
                <p>Scroll down to see the sticky behavior...</p>
                <p style={{ marginTop: '100px' }}>The card above stays fixed at the top while you scroll!</p>
                <p style={{ marginTop: '100px' }}>Keep scrolling...</p>
                <p style={{ marginTop: '100px' }}>Notice how the sticky card follows you!</p>
              </Frame>
            </Frame>
          </Frame>

          {/* Exercise 1.4: Fixed Position */}
          <Frame layout="stack" direction="vertical" gap>
            <h3>1.4 Position: Fixed</h3>
            <p><strong>Token:</strong> <code>--position-fixed: fixed</code> in tokens.css</p>
            <p><strong>Utility:</strong> <code>.u-position-fixed</code> in utilities.css</p>
            <p><strong>Framer Prop:</strong> <code>position=&quot;fixed&quot;</code></p>
            <p><strong>Behavior:</strong> Element positioned relative to viewport, stays in place during scroll</p>
            <p style={{ padding: '8px', background: '#fef3c7', borderRadius: '4px', fontSize: '14px' }}>
              ⚠️ Fixed elements removed from normal flow - use sparingly for overlays, modals, navigation
            </p>
          </Frame>
        </Frame>

        {/* SECTION 2: SIZE PROPERTIES (5) */}
        <Frame layout="stack" direction="vertical" gap padding>
          <h2>📏 Section 2: Size Properties (5/22)</h2>
          <p>Control element dimensions - the heart of Framer&apos;s responsive behavior</p>

          {/* Exercise 2.1: Fill Size */}
          <Frame layout="stack" direction="vertical" gap>
            <h3>2.1 Size: Fill</h3>
            <p><strong>Token:</strong> <code>--size-fill: 100%</code> in tokens.css</p>
            <p><strong>Utility:</strong> <code>.u-size-fill</code> in utilities.css</p>
            <p><strong>Framer Props:</strong> <code>width=&quot;fill&quot; height=&quot;fill&quot;</code></p>
            <p><strong>Behavior:</strong> Element expands to fill all available container space</p>

            <Frame layout="stack" direction="vertical" width="fill" style={{ height: '200px', border: '2px dashed #3b82f6', borderRadius: '8px', padding: '8px' }}>
              <Card
                width="fill"
                height="fill"
                title="Fill-Sized Card"
                description="width='fill' height='fill' - I fill the blue dashed container!"
                variant="primary"
              />
            </Frame>
          </Frame>

          {/* Exercise 2.2: Relative Size */}
          <Frame layout="stack" direction="vertical" gap>
            <h3>2.2 Size: Relative</h3>
            <p><strong>Token:</strong> <code>--size-relative: 1fr</code> in tokens.css</p>
            <p><strong>Utility:</strong> <code>.u-size-relative</code> in utilities.css</p>
            <p><strong>Framer Props:</strong> <code>width=&quot;relative&quot; height=&quot;relative&quot;</code></p>
            <p><strong>Behavior:</strong> Element shares available space proportionally with other relative elements</p>

            <Frame layout="stack" direction="horizontal" gap style={{ height: '120px', border: '2px dashed #10b981', borderRadius: '8px', padding: '8px' }}>
              <Card width="relative" height="relative" title="Relative 1" description="width='relative'" variant="primary" />
              <Card width="relative" height="relative" title="Relative 2" description="width='relative'" variant="secondary" />
              <Card width="relative" height="relative" title="Relative 3" description="width='relative'" variant="primary" />
            </Frame>
          </Frame>

          {/* Exercise 2.3: Fixed Size */}
          <Frame layout="stack" direction="vertical" gap>
            <h3>2.3 Size: Fixed</h3>
            <p><strong>Token:</strong> <code>--size-fixed: 320px</code> in tokens.css</p>
            <p><strong>Utility:</strong> <code>.u-size-fixed</code> in utilities.css</p>
            <p><strong>Framer Props:</strong> <code>width=&quot;fixed&quot; height=&quot;fixed&quot;</code></p>
            <p><strong>Behavior:</strong> Element maintains exact 320px dimensions regardless of container</p>

            <Frame layout="stack" direction="horizontal" gap style={{ border: '2px dashed #f59e0b', borderRadius: '8px', padding: '8px' }}>
              <Card width="fixed" height="fixed" title="Fixed Card" description="width='fixed' height='fixed' - Always 320px" variant="secondary" />
              <Frame width="fill" padding>
                <p>I&apos;m a fill Frame that takes the remaining space after the fixed 320px card!</p>
                <p>The fixed card never changes size, even if you resize the browser.</p>
              </Frame>
            </Frame>
          </Frame>

          {/* Exercise 2.4: Fit Content Size */}
          <Frame layout="stack" direction="vertical" gap>
            <h3>2.4 Size: Fit Content</h3>
            <p><strong>Token:</strong> <code>--size-fit-content: fit-content</code> in tokens.css</p>
            <p><strong>Utility:</strong> <code>.u-size-fit-content</code> in utilities.css</p>
            <p><strong>Framer Props:</strong> <code>width=&quot;fit-content&quot; height=&quot;fit-content&quot;</code></p>
            <p><strong>Behavior:</strong> Element shrinks to content size, never grows beyond content needs</p>

            <Frame layout="stack" direction="horizontal" gap alignment="start" style={{ border: '2px dashed #8b5cf6', borderRadius: '8px', padding: '8px' }}>
              <Card width="fit-content" height="fit-content" title="Fit Content" description="width='fit-content'" variant="primary" />
              <Card width="fit-content" height="fit-content" title="This card has much longer content" description="Still fit-content, just bigger!" variant="secondary" />
            </Frame>
          </Frame>

          {/* Exercise 2.5: Viewport Size */}
          <Frame layout="stack" direction="vertical" gap>
            <h3>2.5 Size: Viewport</h3>
            <p><strong>Token:</strong> <code>--size-viewport: 100vh</code> in tokens.css</p>
            <p><strong>Utility:</strong> <code>.u-size-viewport</code> in utilities.css</p>
            <p><strong>Framer Props:</strong> <code>width=&quot;viewport&quot; height=&quot;viewport&quot;</code></p>
            <p><strong>Behavior:</strong> Element sizes relative to viewport dimensions</p>
            <p style={{ padding: '8px', background: '#fef3c7', borderRadius: '4px', fontSize: '14px' }}>
              ⚠️ Viewport sizing shown conceptually - full viewport cards would break page layout
            </p>
          </Frame>
        </Frame>

        {/* SECTION 3: LAYOUT & DIRECTION PROPERTIES (4) */}
        <Frame layout="stack" direction="vertical" gap padding>
          <h2>🏗️ Section 3: Layout & Direction Properties (4/22)</h2>
          <p>Control layout containers and flow direction - the foundation of all layouts</p>

          {/* Exercise 3.1: Stack Layout */}
          <Frame layout="stack" direction="vertical" gap>
            <h3>3.1 Layout: Stack</h3>
            <p><strong>Token:</strong> <code>--layout-type-stack: flex</code> in tokens.css</p>
            <p><strong>Utility:</strong> <code>.u-layout-stack</code> in utilities.css</p>
            <p><strong>Framer Prop:</strong> <code>layout=&quot;stack&quot;</code></p>
            <p><strong>Behavior:</strong> Creates flexbox container for linear layouts</p>

            <Frame layout="stack" direction="horizontal" gap style={{ border: '2px dashed #ef4444', borderRadius: '8px', padding: '8px' }}>
              <Card title="Stack Child 1" description="I'm in a horizontal stack Frame" variant="primary" />
              <Card title="Stack Child 2" description="Linear arrangement" variant="secondary" />
              <Card title="Stack Child 3" description="Perfect alignment" variant="primary" />
            </Frame>
          </Frame>

          {/* Exercise 3.2: Grid Layout */}
          <Frame layout="stack" direction="vertical" gap>
            <h3>3.2 Layout: Grid</h3>
            <p><strong>Token:</strong> <code>--layout-type-grid: flex</code> in tokens.css</p>
            <p><strong>Utility:</strong> <code>.u-layout-grid</code> in utilities.css</p>
            <p><strong>Framer Prop:</strong> <code>layout=&quot;grid&quot;</code></p>
            <p><strong>Behavior:</strong> Creates flexbox container with wrapping enabled for grid-like layouts</p>

            <Frame layout="grid" gap style={{ border: '2px dashed #06b6d4', borderRadius: '8px', padding: '8px' }}>
              <Card width="relative" title="Grid Item 1" description="In a grid Frame with wrap" variant="primary" style={{ minWidth: '200px', flex: '1 1 200px' }} />
              <Card width="relative" title="Grid Item 2" description="Wraps when needed" variant="secondary" style={{ minWidth: '200px', flex: '1 1 200px' }} />
              <Card width="relative" title="Grid Item 3" description="Responsive by nature" variant="primary" style={{ minWidth: '200px', flex: '1 1 200px' }} />
              <Card width="relative" title="Grid Item 4" description="Resize browser to see wrapping" variant="secondary" style={{ minWidth: '200px', flex: '1 1 200px' }} />
            </Frame>
          </Frame>

          {/* Exercise 3.3: Horizontal Direction */}
          <Frame layout="stack" direction="vertical" gap>
            <h3>3.3 Direction: Horizontal</h3>
            <p><strong>Token:</strong> <code>--direction-horizontal: row</code> in tokens.css</p>
            <p><strong>Utility:</strong> <code>.u-direction-horizontal</code> in utilities.css</p>
            <p><strong>Framer Prop:</strong> <code>direction=&quot;horizontal&quot;</code></p>
            <p><strong>Behavior:</strong> Sets main axis from left to right</p>

            <Frame layout="stack" direction="horizontal" gap style={{ border: '2px dashed #84cc16', borderRadius: '8px', padding: '8px' }}>
              <Card title="→ Left" description="direction='horizontal'" variant="primary" />
              <Card title="→ Center" description="Horizontal flow" variant="secondary" />
              <Card title="→ Right" description="Left to right" variant="primary" />
            </Frame>
          </Frame>

          {/* Exercise 3.4: Vertical Direction */}
          <Frame layout="stack" direction="vertical" gap>
            <h3>3.4 Direction: Vertical</h3>
            <p><strong>Token:</strong> <code>--direction-vertical: column</code> in tokens.css</p>
            <p><strong>Utility:</strong> <code>.u-direction-vertical</code> in utilities.css</p>
            <p><strong>Framer Prop:</strong> <code>direction=&quot;vertical&quot;</code></p>
            <p><strong>Behavior:</strong> Sets main axis from top to bottom</p>

            <Frame layout="stack" direction="vertical" gap style={{ border: '2px dashed #f97316', borderRadius: '8px', padding: '8px', width: '200px' }}>
              <Card title="↓ Top" description="direction='vertical'" variant="primary" />
              <Card title="↓ Middle" description="Vertical flow" variant="secondary" />
              <Card title="↓ Bottom" description="Top to bottom" variant="primary" />
            </Frame>
          </Frame>
        </Frame>

        {/* SECTION 4: DISTRIBUTION & ALIGNMENT PROPERTIES (7) */}
        <Frame layout="stack" direction="vertical" gap padding>
          <h2>⚖️ Section 4: Distribution & Alignment Properties (7/22)</h2>
          <p>Control how elements are distributed and aligned - precise positioning control</p>

          {/* Distribution Examples */}
          <Frame layout="stack" direction="vertical" gap>
            <h3>4.1-4.4 Distribution Properties</h3>
            <p>Control main axis spacing with <code>justify-content</code></p>

            <Frame layout="stack" direction="vertical" gap>
              <Frame layout="stack" direction="vertical" gap>
                <h4>Start Distribution</h4>
                <p><strong>Token:</strong> <code>--distribute-start: flex-start</code> in tokens.css</p>
                <p><strong>Framer Prop:</strong> <code>distribution=&quot;start&quot;</code></p>
                <Frame layout="stack" direction="horizontal" distribution="start" style={{ height: '80px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}>
                  <Card title="Start 1" description="distribution='start'" variant="primary" />
                  <Card title="Start 2" description="Packed at start" variant="secondary" />
                </Frame>
              </Frame>

              <Frame layout="stack" direction="vertical" gap>
                <h4>Center Distribution</h4>
                <p><strong>Token:</strong> <code>--distribute-center: center</code> in tokens.css</p>
                <p><strong>Framer Prop:</strong> <code>distribution=&quot;center&quot;</code></p>
                <Frame layout="stack" direction="horizontal" distribution="center" style={{ height: '80px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}>
                  <Card title="Center 1" description="distribution='center'" variant="primary" />
                  <Card title="Center 2" description="Centered together" variant="secondary" />
                </Frame>
              </Frame>

              <Frame layout="stack" direction="vertical" gap>
                <h4>End Distribution</h4>
                <p><strong>Token:</strong> <code>--distribute-end: flex-end</code> in tokens.css</p>
                <p><strong>Framer Prop:</strong> <code>distribution=&quot;end&quot;</code></p>
                <Frame layout="stack" direction="horizontal" distribution="end" style={{ height: '80px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}>
                  <Card title="End 1" description="distribution='end'" variant="primary" />
                  <Card title="End 2" description="Packed at end" variant="secondary" />
                </Frame>
              </Frame>

              <Frame layout="stack" direction="vertical" gap>
                <h4>Space Between Distribution</h4>
                <p><strong>Token:</strong> <code>--distribute-space-between: space-between</code> in tokens.css</p>
                <p><strong>Framer Prop:</strong> <code>distribution=&quot;space-between&quot;</code></p>
                <Frame layout="stack" direction="horizontal" distribution="space-between" style={{ height: '80px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}>
                  <Card title="Space 1" description="distribution='space-between'" variant="primary" />
                  <Card title="Space 2" description="Equal space between" variant="secondary" />
                </Frame>
              </Frame>
            </Frame>
          </Frame>

          {/* Alignment Examples */}
          <Frame layout="stack" direction="vertical" gap>
            <h3>4.5-4.7 Alignment Properties</h3>
            <p>Control cross axis positioning with <code>align-items</code></p>

            <Frame layout="stack" direction="horizontal" gap>
              <Frame width="relative">
                <h4>Start Alignment</h4>
                <p><strong>Token:</strong> <code>--align-start: flex-start</code> in tokens.css</p>
                <p><strong>Framer Prop:</strong> <code>alignment=&quot;start&quot;</code></p>
                <Frame layout="stack" direction="horizontal" alignment="start" style={{ height: '120px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}>
                  <Card title="Align Start" description="alignment='start'" variant="primary" />
                </Frame>
              </Frame>

              <Frame width="relative">
                <h4>Center Alignment</h4>
                <p><strong>Token:</strong> <code>--align-center: center</code> in tokens.css</p>
                <p><strong>Framer Prop:</strong> <code>alignment=&quot;center&quot;</code></p>
                <Frame layout="stack" direction="horizontal" alignment="center" style={{ height: '120px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}>
                  <Card title="Align Center" description="alignment='center'" variant="secondary" />
                </Frame>
              </Frame>

              <Frame width="relative">
                <h4>End Alignment</h4>
                <p><strong>Token:</strong> <code>--align-end: flex-end</code> in tokens.css</p>
                <p><strong>Framer Prop:</strong> <code>alignment=&quot;end&quot;</code></p>
                <Frame layout="stack" direction="horizontal" alignment="end" style={{ height: '120px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}>
                  <Card title="Align End" description="alignment='end'" variant="primary" />
                </Frame>
              </Frame>
            </Frame>
          </Frame>
        </Frame>

        {/* SECTION 5: WRAP & SPACING PROPERTIES (4) */}
        <Frame layout="stack" direction="vertical" gap padding>
          <h2>🌊 Section 5: Wrap & Spacing Properties (4/22)</h2>
          <p>Control wrapping behavior and spacing - the finishing touches for perfect layouts</p>

          {/* Wrap Examples */}
          <Frame layout="stack" direction="vertical" gap>
            <h3>5.1-5.2 Wrap Properties</h3>

            <Frame layout="stack" direction="vertical" gap>
              <h4>Wrap: Yes</h4>
              <p><strong>Token:</strong> <code>--wrap-yes: wrap</code> in tokens.css</p>
              <p><strong>Utility:</strong> <code>.u-wrap-yes</code> in utilities.css</p>
              <p><strong>Framer Prop:</strong> <code>wrap=&quot;yes&quot;</code></p>
              <p>Elements wrap to new lines when needed</p>
              <Frame layout="stack" direction="horizontal" wrap="yes" gap style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}>
                <Card width="fit-content" title="Wrap Card 1" description="wrap='yes'" variant="primary" style={{ minWidth: '200px' }} />
                <Card width="fit-content" title="Wrap Card 2" description="Will wrap if needed" variant="secondary" style={{ minWidth: '200px' }} />
                <Card width="fit-content" title="Wrap Card 3" description="Resize browser to see" variant="primary" style={{ minWidth: '200px' }} />
                <Card width="fit-content" title="Wrap Card 4" description="Responsive wrapping" variant="secondary" style={{ minWidth: '200px' }} />
              </Frame>
            </Frame>

            <Frame layout="stack" direction="vertical" gap>
              <h4>Wrap: No</h4>
              <p><strong>Token:</strong> <code>--wrap-no: nowrap</code> in tokens.css</p>
              <p><strong>Utility:</strong> <code>.u-wrap-no</code> in utilities.css</p>
              <p><strong>Framer Prop:</strong> <code>wrap=&quot;no&quot;</code></p>
              <p>Elements stay on single line, may overflow</p>
              <Frame layout="stack" direction="horizontal" wrap="no" gap style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px', overflow: 'auto' }}>
                <Card width="fixed" title="No Wrap 1" description="wrap='no'" variant="primary" style={{ minWidth: '200px', flexShrink: 0 }} />
                <Card width="fixed" title="No Wrap 2" description="Stays in line" variant="secondary" style={{ minWidth: '200px', flexShrink: 0 }} />
                <Card width="fixed" title="No Wrap 3" description="May cause overflow" variant="primary" style={{ minWidth: '200px', flexShrink: 0 }} />
                <Card width="fixed" title="No Wrap 4" description="Scroll horizontally →" variant="secondary" style={{ minWidth: '200px', flexShrink: 0 }} />
              </Frame>
            </Frame>
          </Frame>

          {/* Spacing Examples */}
          <Frame layout="stack" direction="vertical" gap>
            <h3>5.3-5.4 Spacing Properties</h3>

            <Frame layout="stack" direction="horizontal" gap>
              <Frame width="relative">
                <h4>Gap Spacing</h4>
                <p><strong>Token:</strong> <code>--spacing-gap: 16px</code> in tokens.css</p>
                <p><strong>Utility:</strong> <code>.u-gap</code> in utilities.css</p>
                <p><strong>Framer Prop:</strong> <code>gap={true}</code></p>
                <Frame layout="stack" direction="vertical" gap style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}>
                  <Card title="Gap Card 1" description="gap={true} - 16px between items" variant="primary" />
                  <Card title="Gap Card 2" description="Consistent spacing" variant="secondary" />
                  <Card title="Gap Card 3" description="No margin needed!" variant="primary" />
                </Frame>
              </Frame>

              <Frame width="relative">
                <h4>Padding Spacing</h4>
                <p><strong>Token:</strong> <code>--spacing-padding: 16px</code> in tokens.css</p>
                <p><strong>Utility:</strong> <code>.u-padding</code> in utilities.css</p>
                <p><strong>Framer Prop:</strong> <code>padding={true}</code></p>
                <Frame padding style={{ border: '1px solid #e5e7eb', borderRadius: '8px', background: '#f9fafb' }}>
                  <Card title="Padded Card" description="padding={true} - 16px around me" variant="secondary" />
                </Frame>
              </Frame>
            </Frame>
          </Frame>
        </Frame>

        {/* MASTERY SUMMARY */}
        <Frame layout="stack" direction="vertical" gap padding>
          <h2>🎓 Congratulations! Complete Framer → Flexbox Mastery</h2>
          <p>You&apos;ve experienced all 22 Framer layout properties through live Card and Frame examples!</p>

          <Frame layout="grid" gap style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <Frame padding style={{ background: '#f0f9ff', border: '1px solid #0ea5e9', borderRadius: '8px' }}>
              <h3>Layer 1: Design Tokens</h3>
              <p>22 CSS variables in <code>src/styles/tokens.css</code></p>
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
            </Frame>

            <Frame padding style={{ background: '#f0fdf4', border: '1px solid #10b981', borderRadius: '8px' }}>
              <h3>Layer 2: Utility Classes</h3>
              <p>22 utility classes in <code>src/styles/utilities.css</code></p>
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
            </Frame>

            <Frame padding style={{ background: '#fef7ff', border: '1px solid #a855f7', borderRadius: '8px' }}>
              <h3>Layer 3: Component Scoping</h3>
              <p>CSS Modules for component-specific styles</p>
              <ul style={{ fontSize: '14px', marginLeft: '16px' }}>
                <li><code>src/components/Card/card.module.css</code></li>
                <li><code>src/components/Frame/frame.module.css</code></li>
                <li>Encapsulated styling</li>
                <li>Token-based consistency</li>
                <li>Perfect Framer parity</li>
              </ul>
            </Frame>
          </Frame>

          <Frame padding style={{ background: '#fffbeb', border: '1px solid #f59e0b', borderRadius: '8px' }}>
            <h3>🚀 What You&apos;ve Learned</h3>
            <p>This page IS the C-MOD/VAR Standard in action. Every layout you see was built using:</p>
            <ul style={{ marginLeft: '20px' }}>
              <li><strong>Framer Props:</strong> Every Card and Frame uses actual TypeScript props from your <code>framerProps.ts</code></li>
              <li><strong>Prop Conversion:</strong> Your <code>propConversion.ts</code> utility converts props to utility classes</li>
              <li><strong>Component Architecture:</strong> Card.tsx and Frame.tsx with CSS Modules while staying token-consistent</li>
              <li><strong>Perfect Framer Parity:</strong> Every property maps 1:1 with Framer&apos;s layout panel</li>
            </ul>
            <p><strong>Result:</strong> Maintainable, scalable, designer-friendly CSS architecture using your actual components!</p>

            <Frame layout="stack" direction="vertical" gap style={{ marginTop: '16px' }}>
              <h4>🎯 Your Actual Implementation Files:</h4>
              <ul style={{ fontSize: '14px', marginLeft: '16px', fontFamily: 'monospace' }}>
                <li>src/styles/tokens.css - Design tokens</li>
                <li>src/styles/utilities.css - Utility classes</li>
                <li>src/components/Card/Card.tsx - Card component</li>
                <li>src/components/Frame/Frame.tsx - Frame component</li>
                <li>src/lib/types/framerProps.ts - TypeScript interfaces</li>
                <li>src/lib/utils/propConversion.ts - Prop utilities</li>
              </ul>
            </Frame>
          </Frame>
        </Frame>

      </Frame>
    </Frame>
  );
}