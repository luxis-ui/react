import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Tooltip, Button, ThemeProvider } from '@luxis-ui/react';
import { useState } from 'react';

// ─────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Text or JSX to display inside the tooltip',
    },
    placement: {
      control: 'select',
      options: [
        'top', 'top-start', 'top-end',
        'right', 'right-start', 'right-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end',
      ],
    },
    variant: {
      control: 'select',
      options: ['dark', 'light', 'error', 'warning', 'success', 'info'],
    },
    delay: { control: { type: 'range', min: 0, max: 1000, step: 50 } },
    hideDelay: { control: { type: 'range', min: 0, max: 1000, step: 50 } },
    arrow: { control: 'boolean' },
    disabled: { control: 'boolean' },
    dismissible: { control: 'boolean' },
    maxWidth: { control: 'text' },
  },
  args: {
    content: 'This is a helpful tooltip',
    placement: 'top',
    variant: 'dark',
    delay: 200,
    hideDelay: 0,
    arrow: false,
    disabled: false,
    dismissible: false,
    maxWidth: '300px',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 160 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// ─────────────────────────────────────────────
// 1. Playground
// ─────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="primary">Hover me</Button>
    </Tooltip>
  ),
};

// ─────────────────────────────────────────────
// 2. All placements
// ─────────────────────────────────────────────

export const AllPlacements: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: 80 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 16, justifyItems: 'center', alignItems: 'center' }}>
      {/* Row 1 — top placements */}
      <Tooltip content="top-start" placement="top-start" arrow>
        <button style={ghostBtn}>top-start</button>
      </Tooltip>
      <Tooltip content="top" placement="top" arrow>
        <button style={ghostBtn}>top</button>
      </Tooltip>
      <Tooltip content="top-end" placement="top-end" arrow>
        <button style={ghostBtn}>top-end</button>
      </Tooltip>

      {/* Row 2 — left / center / right */}
      <Tooltip content="left" placement="left" arrow>
        <button style={ghostBtn}>left</button>
      </Tooltip>
      <div style={{ width: 80 }} />
      <Tooltip content="right" placement="right" arrow>
        <button style={ghostBtn}>right</button>
      </Tooltip>

      {/* Row 3 — bottom placements */}
      <Tooltip content="bottom-start" placement="bottom-start" arrow>
        <button style={ghostBtn}>bottom-start</button>
      </Tooltip>
      <Tooltip content="bottom" placement="bottom" arrow>
        <button style={ghostBtn}>bottom</button>
      </Tooltip>
      <Tooltip content="bottom-end" placement="bottom-end" arrow>
        <button style={ghostBtn}>bottom-end</button>
      </Tooltip>
    </div>
  ),
};

const ghostBtn: React.CSSProperties = {
  padding: '6px 14px',
  borderRadius: 6,
  border: '1px solid #d1d5db',
  background: 'white',
  cursor: 'pointer',
  fontSize: 12,
  whiteSpace: 'nowrap',
};

// ─────────────────────────────────────────────
// 3. Variants
// ─────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', padding: 48 }}>
        {(['dark', 'light', 'error', 'warning', 'success', 'info'] as const).map((variant) => (
          <Tooltip key={variant} content={`${variant} tooltip`} variant={variant} placement="top" arrow>
            <Button variant="outline" size="sm">
              {variant}
            </Button>
          </Tooltip>
        ))}
      </div>
    </ThemeProvider>
  ),
  decorators: [(Story) => <Story />],
};

// ─────────────────────────────────────────────
// 4. With arrow
// ─────────────────────────────────────────────

export const WithArrow: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', padding: 48 }}>
        <Tooltip content="Top with arrow" placement="top" arrow>
          <Button>Top ↑</Button>
        </Tooltip>
        <Tooltip content="Right with arrow" placement="right" arrow>
          <Button>Right →</Button>
        </Tooltip>
        <Tooltip content="Bottom with arrow" placement="bottom" arrow>
          <Button>Bottom ↓</Button>
        </Tooltip>
        <Tooltip content="Left with arrow" placement="left" arrow>
          <Button>Left ←</Button>
        </Tooltip>
      </div>
    </ThemeProvider>
  ),
  decorators: [(Story) => <Story />],
};

// ─────────────────────────────────────────────
// 5. Rich content
// ─────────────────────────────────────────────

const RichContent = () => (
  <div>
    <strong style={{ display: 'block', marginBottom: 4 }}>Keyboard shortcut</strong>
    <p style={{ margin: 0, opacity: 0.8, fontSize: 12 }}>Press <kbd style={{ background: 'rgba(255,255,255,0.15)', padding: '1px 4px', borderRadius: 3 }}>⌘S</kbd> to save your work.</p>
  </div>
);

export const RichContentTooltip: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', padding: 48 }}>
        <Tooltip content={<RichContent />} placement="bottom" arrow maxWidth="220px">
          <Button>Hover for shortcut</Button>
        </Tooltip>
        <Tooltip
          content={
            <div>
              <strong>Pro tip</strong>
              <p style={{ margin: '4px 0 0', fontSize: 12, opacity: 0.85 }}>
                You can drag and drop items to reorder them anywhere in this list.
              </p>
            </div>
          }
          placement="right"
          variant="info"
          arrow
          maxWidth="200px"
        >
          <Button variant="outline">Info tooltip</Button>
        </Tooltip>
      </div>
    </ThemeProvider>
  ),
  decorators: [(Story) => <Story />],
};

// ─────────────────────────────────────────────
// 6. Delay controls
// ─────────────────────────────────────────────

export const Delays: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', padding: 48 }}>
        <div style={{ textAlign: 'center' }}>
          <Tooltip content="No delay" placement="top" delay={0}>
            <Button size="sm">Instant (0ms)</Button>
          </Tooltip>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Tooltip content="Default delay" placement="top" delay={200}>
            <Button size="sm">Default (200ms)</Button>
          </Tooltip>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Tooltip content="Slow delay" placement="top" delay={800}>
            <Button size="sm">Slow (800ms)</Button>
          </Tooltip>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Tooltip content="Persists on hover" placement="top" delay={0} hideDelay={400}>
            <Button size="sm">Hide delay (400ms)</Button>
          </Tooltip>
        </div>
      </div>
    </ThemeProvider>
  ),
  decorators: [(Story) => <Story />],
};

// ─────────────────────────────────────────────
// 7. Dismissible
// ─────────────────────────────────────────────

const DismissibleDemo = () => {
  const [dismissed, setDismissed] = useState(false);

  return (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: 48 }}>
        <Tooltip
          content="This can be closed with the × button"
          placement="top"
          arrow
          dismissible
          onDismiss={() => setDismissed(true)}
        >
          <Button>Hover — then click ×</Button>
        </Tooltip>
        {dismissed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, color: '#16a34a' }}>✓ Tooltip was dismissed</span>
            <button
              onClick={() => setDismissed(false)}
              style={{ fontSize: 12, color: '#6b7280', border: 'none', background: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export const Dismissible: Story = {
  render: () => <DismissibleDemo />,
  decorators: [(Story) => <Story />],
};

// ─────────────────────────────────────────────
// 8. Always visible (open prop)
// ─────────────────────────────────────────────

const AlwaysVisibleDemo = () => {
  const [open, setOpen] = useState(true);

  return (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: 64 }}>
        <Tooltip content="I am always visible when open=true" placement="top" arrow open={open} variant="info">
          <Button variant={open ? 'primary' : 'outline'}>
            {open ? 'Tooltip visible' : 'Tooltip hidden'}
          </Button>
        </Tooltip>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => setOpen(true)}
            style={{ ...ghostBtn, background: open ? '#2563eb' : 'white', color: open ? 'white' : '#374151', borderColor: open ? '#2563eb' : '#d1d5db' }}
          >
            open=true
          </button>
          <button
            onClick={() => setOpen(false)}
            style={{ ...ghostBtn, background: open ? 'white' : '#2563eb', color: open ? '#374151' : 'white', borderColor: open ? '#d1d5db' : '#2563eb' }}
          >
            open=false
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export const AlwaysVisible: Story = {
  render: () => <AlwaysVisibleDemo />,
  decorators: [(Story) => <Story />],
};

// ─────────────────────────────────────────────
// 9. Disabled
// ─────────────────────────────────────────────

export const DisabledTooltip: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', padding: 48 }}>
        <Tooltip content="This one works" placement="top">
          <Button>Enabled tooltip</Button>
        </Tooltip>
        <Tooltip content="You will never see this" placement="top" disabled>
          <Button variant="outline">Disabled tooltip</Button>
        </Tooltip>
      </div>
    </ThemeProvider>
  ),
  decorators: [(Story) => <Story />],
};

// ─────────────────────────────────────────────
// 10. Real-world: action toolbar
// ─────────────────────────────────────────────

const ActionToolbarDemo = () => {
  const ACTIONS = [
    { label: 'Bold', shortcut: '⌘B', icon: 'B' },
    { label: 'Italic', shortcut: '⌘I', icon: 'I' },
    { label: 'Underline', shortcut: '⌘U', icon: 'U' },
    { label: 'Link', shortcut: '⌘K', icon: '⊞' },
    { label: 'Delete selection', shortcut: '⌫', icon: '✕', variant: 'error' as const },
  ];

  return (
    <ThemeProvider>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 12px', background: '#f9fafb', borderRadius: 10, border: '1px solid #e5e7eb', width: 'fit-content' }}>
        {ACTIONS.map(({ label, shortcut, icon, variant }) => (
          <Tooltip
            key={label}
            content={
              <span>
                {label} <kbd style={{ background: 'rgba(255,255,255,0.15)', padding: '1px 4px', borderRadius: 3, fontSize: 11 }}>{shortcut}</kbd>
              </span>
            }
            placement="top"
            variant={variant ?? 'dark'}
            arrow
            delay={150}
          >
            <button
              style={{
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 700,
                color: variant === 'error' ? '#dc2626' : '#374151',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => { (e.currentTarget.style.background = '#e5e7eb'); }}
              onMouseLeave={(e) => { (e.currentTarget.style.background = 'transparent'); }}
            >
              {icon}
            </button>
          </Tooltip>
        ))}
      </div>
    </ThemeProvider>
  );
};

export const ActionToolbar: Story = {
  render: () => <ActionToolbarDemo />,
  decorators: [(Story) => <Story />],
};

// ─────────────────────────────────────────────
// 11. Callbacks (onShow / onHide)
// ─────────────────────────────────────────────

const CallbacksDemo = () => {
  const [log, setLog] = useState<string[]>([]);

  const push = (msg: string) =>
    setLog((prev) => [`${new Date().toLocaleTimeString()} — ${msg}`, ...prev.slice(0, 7)]);

  return (
    <ThemeProvider>
      <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', padding: '32px 0', flexWrap: 'wrap' }}>
        <Tooltip
          content="Hover me to fire callbacks"
          placement="right"
          arrow
          delay={0}
          onShow={() => push('onShow fired')}
          onHide={() => push('onHide fired')}
          dismissible
          onDismiss={() => push('onDismiss fired')}
        >
          <Button>Hover me</Button>
        </Tooltip>
        <div style={{ flex: 1, minWidth: 200 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: 13 }}>Event log</p>
          {log.length === 0
            ? <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>No events yet — hover the button.</p>
            : log.map((entry, i) => (
                <p key={entry} style={{ margin: '2px 0', fontSize: 12, color: i === 0 ? '#2563eb' : '#6b7280', fontFamily: 'monospace' }}>
                  {entry}
                </p>
              ))}
        </div>
      </div>
    </ThemeProvider>
  );
};

export const Callbacks: Story = {
  render: () => <CallbacksDemo />,
  decorators: [(Story) => <Story />],
};
