/*
  FRAME DEMO PAGE

  Demonstrates the new C-MOD/VAR system with Frame component.
  Shows contextual intelligence and Framer parity in action.
*/

import { Frame, Button, Card } from '@/components/ui';

export default function FrameDemo() {
  return (
    <Frame
      layout="stack"
      direction="vertical"
      width="fill"
      height="viewport"
      padding
      gap
      distribute="center"
      align="center"
    >
      <h1>C-MOD/VAR Frame System Demo</h1>

      {/* Horizontal Stack Layout */}
      <Frame
        layout="stack"
        direction="horizontal"
        width="fill"
        gap
        distribute="space-between"
        align="center"
        className="u-bg-surface u-border-subtle u-border-radius u-p-fluid"
      >
        <Card title="Fill Width" description="This card fills available space" />
        <Frame width="fixed" height="fit-content">
          <Button>Fixed Width Button</Button>
        </Frame>
      </Frame>

      {/* Vertical Stack with Different Sizing */}
      <Frame
        layout="stack"
        direction="vertical"
        width="fit-content"
        gap
        align="center"
      >
        <h2>Vertical Stack with Various Widths</h2>

        <Frame width="fill">
          <Button>Fill Width Button</Button>
        </Frame>

        <Frame width="fit-content">
          <Button>Fit Content Button</Button>
        </Frame>

        <Frame width="fixed">
          <Button>Fixed Width Button</Button>
        </Frame>
      </Frame>

      {/* Nested Frame Example */}
      <Frame
        layout="stack"
        direction="horizontal"
        width="fill"
        height="fixed"
        gap
        className="u-bg-surface u-border-subtle u-border-radius u-p-fluid"
      >
        <Frame
          layout="stack"
          direction="vertical"
          width="relative"
          gap
        >
          <h3>Relative Width (1fr equivalent)</h3>
          <p>This frame takes proportional space</p>
        </Frame>

        <Frame
          layout="stack"
          direction="vertical"
          width="relative"
          gap
        >
          <h3>Also Relative Width</h3>
          <p>Both frames share space equally</p>
        </Frame>

        <Frame width="fit-content">
          <Button>Sidebar Action</Button>
        </Frame>
      </Frame>
    </Frame>
  );
}