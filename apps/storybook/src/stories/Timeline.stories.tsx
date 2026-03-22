import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Timeline, ThemeProvider, CheckIcon, StarIcon, UserIcon, ZapIcon } from '@luxis-ui/react';
import type { TimelineStep } from '@luxis-ui/react';
import { useState } from 'react';

// ─────────────────────────────────────────────
// Sample data
// ─────────────────────────────────────────────

const ORDER_STEPS: TimelineStep[] = [
  { label: 'Order Placed', description: 'Jan 10, 2026' },
  { label: 'Processing', description: 'Jan 11, 2026' },
  { label: 'Shipped', description: 'Jan 12, 2026' },
  { label: 'Out for Delivery', description: 'Jan 13, 2026' },
  { label: 'Delivered', description: 'Jan 14, 2026' },
];

const ONBOARDING_STEPS: TimelineStep[] = [
  { label: 'Create Account', description: 'Sign up with your email' },
  { label: 'Verify Email', description: 'Check your inbox' },
  { label: 'Complete Profile', description: 'Add your details' },
  { label: 'Invite Team', description: 'Add team members' },
  { label: 'Go Live', description: 'Start using the platform' },
];

const STRING_STEPS = ['Requirements', 'Design', 'Development', 'Testing', 'Deployment'];

// ─────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────

const meta: Meta<typeof Timeline> = {
  title: 'Widgets/Timeline',
  component: Timeline,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: { type: 'range', min: 0, max: 4, step: 1 },
      description: 'Index of the current active step (0-based)',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['default', 'circle', 'numbered', 'simple'],
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'info', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showCheckmarks: { control: 'boolean' },
  },
  args: {
    currentStep: 2,
    orientation: 'horizontal',
    variant: 'default',
    color: 'success',
    size: 'md',
    showCheckmarks: true,
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

// ─────────────────────────────────────────────
// 1. Playground — fully controls-driven
// ─────────────────────────────────────────────

export const Playground: Story = {
  args: {
    steps: ONBOARDING_STEPS,
  },
};

// ─────────────────────────────────────────────
// 2. Interactive stepper
// ─────────────────────────────────────────────

const InteractiveStepperDemo = () => {
  const [step, setStep] = useState(0);
  const total = ONBOARDING_STEPS.length;

  return (
    <div>
      <Timeline
        steps={ONBOARDING_STEPS}
        currentStep={step}
        variant="numbered"
        color="primary"
        size="md"
      />
      <div style={{ display: 'flex', gap: 12, marginTop: 28, justifyContent: 'center' }}>
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          style={btnStyle(false)}
        >
          ← Back
        </button>
        <span style={{ fontSize: 13, color: 'var(--lxs-color-text-muted)', alignSelf: 'center' }}>
          Step {step + 1} of {total}
        </span>
        <button
          onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
          disabled={step === total - 1}
          style={btnStyle(true)}
        >
          Next →
        </button>
      </div>
      <div style={{ marginTop: 24, padding: '16px 20px', background: 'var(--lxs-color-background-subtle)', borderRadius: 8, border: '1px solid var(--lxs-color-border)', fontSize: 14 }}>
        <strong>{ONBOARDING_STEPS[step].label}</strong>
        <p style={{ margin: '4px 0 0', color: 'var(--lxs-color-text-muted)', fontSize: 13 }}>{ONBOARDING_STEPS[step].description}</p>
      </div>
    </div>
  );
};

const btnStyle = (primary: boolean): React.CSSProperties => ({
  padding: '8px 20px',
  borderRadius: 8,
  border: '1px solid ' + (primary ? 'var(--lxs-color-primary)' : 'var(--lxs-color-border)'),
  background: primary ? 'var(--lxs-color-primary)' : 'var(--lxs-color-background)',
  color: primary ? 'var(--lxs-color-primary-foreground)' : 'var(--lxs-color-text)',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 500,
});

export const InteractiveStepper: Story = {
  render: () => <InteractiveStepperDemo />,
};

// ─────────────────────────────────────────────
// 3. All variants
// ─────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {(['default', 'circle', 'numbered', 'simple'] as const).map((variant) => (
        <div key={variant}>
          <p style={{ marginBottom: 12, fontWeight: 600, fontSize: 13, textTransform: 'capitalize' }}>
            variant="{variant}"
          </p>
          <Timeline steps={STRING_STEPS} currentStep={2} variant={variant} />
        </div>
      ))}
    </div>
  ),
};

// ─────────────────────────────────────────────
// 4. All colors
// ─────────────────────────────────────────────

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {(['primary', 'success', 'info', 'warning', 'error'] as const).map((color) => (
        <div key={color}>
          <p style={{ marginBottom: 12, fontWeight: 600, fontSize: 13, textTransform: 'capitalize' }}>
            color="{color}"
          </p>
          <Timeline steps={STRING_STEPS} currentStep={2} color={color} />
        </div>
      ))}
    </div>
  ),
};

// ─────────────────────────────────────────────
// 5. Sizes
// ─────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <p style={{ marginBottom: 12, fontWeight: 600, fontSize: 13 }}>size="{size}"</p>
          <Timeline steps={STRING_STEPS} currentStep={2} size={size} />
        </div>
      ))}
    </div>
  ),
};

// ─────────────────────────────────────────────
// 6. Vertical orientation
// ─────────────────────────────────────────────

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 60 }}>
      <div>
        <p style={{ marginBottom: 12, fontWeight: 600, fontSize: 13 }}>Default</p>
        <Timeline steps={ORDER_STEPS} currentStep={2} orientation="vertical" color="primary" />
      </div>
      <div>
        <p style={{ marginBottom: 12, fontWeight: 600, fontSize: 13 }}>Numbered</p>
        <Timeline steps={ORDER_STEPS} currentStep={2} orientation="vertical" variant="numbered" color="success" />
      </div>
      <div>
        <p style={{ marginBottom: 12, fontWeight: 600, fontSize: 13 }}>Circle</p>
        <Timeline steps={ORDER_STEPS} currentStep={2} orientation="vertical" variant="circle" color="info" />
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────
// 7. With descriptions
// ─────────────────────────────────────────────

export const WithDescriptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div>
        <p style={{ marginBottom: 12, fontWeight: 600, fontSize: 13 }}>Horizontal + descriptions</p>
        <Timeline steps={ORDER_STEPS} currentStep={3} color="primary" />
      </div>
      <div>
        <p style={{ marginBottom: 12, fontWeight: 600, fontSize: 13 }}>Vertical + descriptions</p>
        <Timeline steps={ORDER_STEPS} currentStep={3} orientation="vertical" color="primary" />
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────
// 8. Custom icons
// ─────────────────────────────────────────────

const ICON_STEPS: TimelineStep[] = [
  { label: 'Sign Up', description: 'Create your account', icon: <UserIcon /> },
  { label: 'Highlights', description: 'Explore features', icon: <StarIcon /> },
  { label: 'Set Up', description: 'Configure preferences', icon: <CheckIcon /> },
  { label: 'Launch', description: 'You are ready!', icon: <ZapIcon /> },
];

export const CustomIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <Timeline steps={ICON_STEPS} currentStep={1} color="primary" />
      <Timeline steps={ICON_STEPS} currentStep={1} color="primary" orientation="vertical" />
    </div>
  ),
};

// ─────────────────────────────────────────────
// 9. Clickable steps
// ─────────────────────────────────────────────

const ClickableStepsDemo = () => {
  const [active, setActive] = useState(0);

  const steps: TimelineStep[] = ONBOARDING_STEPS.map((s, i) => ({
    ...s,
    onClick: () => setActive(i),
  }));

  return (
    <div>
      <p style={{ marginBottom: 16, fontSize: 13, color: 'var(--lxs-color-text-muted)' }}>
        Click any step to navigate directly to it.
      </p>
      <Timeline steps={steps} currentStep={active} variant="numbered" color="primary" />
      <div style={{ marginTop: 24, padding: '16px 20px', background: 'var(--lxs-color-background-subtle)', borderRadius: 8, border: '1px solid var(--lxs-color-border)', fontSize: 14 }}>
        <strong>Active: {ONBOARDING_STEPS[active].label}</strong>
        <p style={{ margin: '4px 0 0', color: 'var(--lxs-color-text-muted)', fontSize: 13 }}>
          {ONBOARDING_STEPS[active].description}
        </p>
      </div>
    </div>
  );
};

export const ClickableSteps: Story = {
  render: () => <ClickableStepsDemo />,
};

// ─────────────────────────────────────────────
// 10. No checkmarks
// ─────────────────────────────────────────────

export const NoCheckmarks: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ marginBottom: 12, fontWeight: 600, fontSize: 13 }}>showCheckmarks=true (default)</p>
        <Timeline steps={STRING_STEPS} currentStep={2} showCheckmarks />
      </div>
      <div>
        <p style={{ marginBottom: 12, fontWeight: 600, fontSize: 13 }}>showCheckmarks=false</p>
        <Timeline steps={STRING_STEPS} currentStep={2} showCheckmarks={false} />
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────
// 11. Real-world: order tracking
// ─────────────────────────────────────────────

const TRACKING_STATUSES = ['Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'] as const;

const OrderTrackingDemo = () => {
  const [status, setStatus] = useState(2);

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: 24, background: 'var(--lxs-color-background)', borderRadius: 12, boxShadow: 'var(--lxs-shadow-sm)', border: '1px solid var(--lxs-color-border)' }}>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>Order #LXS-2026-01</h3>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--lxs-color-text-muted)' }}>Estimated delivery Jan 14, 2026</p>
      </div>
      <Timeline steps={ORDER_STEPS} currentStep={status} color="primary" variant="default" />
      <div style={{ marginTop: 24, borderTop: '1px solid var(--lxs-color-border)', paddingTop: 16 }}>
        <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--lxs-color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Simulate status update
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {TRACKING_STATUSES.map((s, i) => (
            <button
              key={s}
              onClick={() => setStatus(i)}
              style={{
                padding: '4px 12px',
                borderRadius: 6,
                border: '1px solid ' + (status === i ? 'var(--lxs-color-primary)' : 'var(--lxs-color-border)'),
                background: status === i ? 'var(--lxs-color-primary)' : 'var(--lxs-color-background)',
                color: status === i ? 'var(--lxs-color-primary-foreground)' : 'var(--lxs-color-text)',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const OrderTracking: Story = {
  render: () => <OrderTrackingDemo />,
};
