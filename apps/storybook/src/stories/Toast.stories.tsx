import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { ThemeProvider, useToast } from '@luxis-ui/react';
import type { ToastOptions, ToastPosition, ToastVariant } from '@luxis-ui/react';

// ---------- Demo helpers ----------

interface ToastDemoProps extends ToastOptions {
  message: string;
  position: ToastPosition;
}

/**
 * Inner trigger â€” MUST live inside ThemeProvider's tree so useToast()
 * connects to the same ToastProvider that ToastContainerInner uses.
 * This avoids the imperative singleton routing to the wrong container.
 */
const ToastTrigger: React.FC<Omit<ToastDemoProps, 'position'>> = ({
  message,
  variant,
  autoClose,
  closeButton,
  progressBar,
  pauseOnHover,
  title,
  description,
  animationDuration,
}) => {
  const { addToast } = useToast();

  const fire = () => {
    addToast(message, {
      variant,
      autoClose,
      closeButton,
      progressBar,
      pauseOnHover,
      title,
      description,
      animationDuration,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
      <p style={{ margin: 0, fontSize: 14, color: 'var(--lxs-color-neutral-600)' }}>
        Click the button to trigger a toast notification.
      </p>
      <button
        onClick={fire}
        style={{
          padding: '8px 20px',
          borderRadius: 6,
          border: 'none',
          background: 'var(--lxs-color-primary-500)',
          color: '#fff',
          fontWeight: 600,
          cursor: 'pointer',
          fontSize: 14,
        }}
      >
        Show Toast
      </button>
    </div>
  );
};

/** Outer wrapper â€” provides ThemeProvider with the configured position. */
const ToastDemo: React.FC<ToastDemoProps> = ({ position, ...rest }) => (
  <ThemeProvider toastPosition={position}>
    <ToastTrigger {...rest} />
  </ThemeProvider>
);

// ---------- Meta ----------

const meta: Meta<typeof ToastDemo> = {
  title: 'Components/Toast',
  component: ToastDemo,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'Toast message content',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info', 'primary'],
      description: 'Visual variant of the toast',
    },
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      description: 'Position of the toast container',
    },
    autoClose: {
      control: 'number',
      description: 'Auto-close duration in ms (set 0 for no auto-close)',
    },
    closeButton: {
      control: 'boolean',
      description: 'Show close button',
    },
    progressBar: {
      control: 'boolean',
      description: 'Show progress bar',
    },
    pauseOnHover: {
      control: 'boolean',
      description: 'Pause auto-close timer when hovering',
    },
    title: {
      control: 'text',
      description: 'Optional title above the message',
    },
    description: {
      control: 'text',
      description: 'Optional description below the title',
    },
    animationDuration: {
      control: 'number',
      description: 'Enter/exit animation duration in ms',
    },
  },
  args: {
    message: 'This is a toast notification.',
    variant: 'default',
    position: 'top-right',
    autoClose: 5000,
    closeButton: true,
    progressBar: true,
    pauseOnHover: true,
    animationDuration: 300,
  },
};

export default meta;
type Story = StoryObj<typeof ToastDemo>;

// ---------- Variants ----------

export const Default: Story = {
  args: {
    message: 'This is a default notification.',
    variant: 'default',
  },
};

export const Success: Story = {
  args: {
    message: 'Your changes have been saved successfully.',
    variant: 'success',
  },
};

export const ErrorToast: Story = {
  args: {
    message: 'Something went wrong. Please try again.',
    variant: 'error',
  },
};

export const Warning: Story = {
  args: {
    message: 'This action cannot be undone.',
    variant: 'warning',
  },
};

export const Info: Story = {
  args: {
    message: 'Here is some useful information for you.',
    variant: 'info',
  },
};

export const Primary: Story = {
  args: {
    message: 'New feature available â€” check it out!',
    variant: 'primary',
  },
};

// ---------- With Title & Description ----------

export const WithTitle: Story = {
  args: {
    variant: 'info',
    title: 'Update Available',
    message: 'A new version is ready to install.',
  },
};

export const WithTitleAndDescription: Story = {
  args: {
    variant: 'success',
    title: 'Payment Successful',
    description: 'Your payment of $49.00 has been processed.',
    message: 'Payment processed.',
  },
};

// ---------- Behaviour ----------

export const NoAutoClose: Story = {
  args: {
    message: 'This toast stays until you close it.',
    variant: 'warning',
    autoClose: false as unknown as number,
  },
};

export const LongDuration: Story = {
  args: {
    message: 'This toast stays for 10 seconds.',
    variant: 'info',
    autoClose: 10000,
  },
};

export const NoProgressBar: Story = {
  args: {
    message: 'No progress bar.',
    variant: 'default',
    progressBar: false,
  },
};

export const NoCloseButton: Story = {
  args: {
    message: 'No close button â€” auto-dismisses.',
    variant: 'default',
    closeButton: false,
  },
};

export const NoPauseOnHover: Story = {
  args: {
    message: 'Timer continues even when you hover.',
    variant: 'info',
    pauseOnHover: false,
  },
};

// ---------- Positions ----------

export const TopLeft: Story = {
  args: { message: 'Toast at top-left.', variant: 'default', position: 'top-left' },
};

export const TopCenter: Story = {
  args: { message: 'Toast at top-center.', variant: 'default', position: 'top-center' },
};

export const TopRight: Story = {
  args: { message: 'Toast at top-right.', variant: 'default', position: 'top-right' },
};

export const BottomLeft: Story = {
  args: { message: 'Toast at bottom-left.', variant: 'default', position: 'bottom-left' },
};

export const BottomCenter: Story = {
  args: { message: 'Toast at bottom-center.', variant: 'default', position: 'bottom-center' },
};

export const BottomRight: Story = {
  args: { message: 'Toast at bottom-right.', variant: 'default', position: 'bottom-right' },
};

// ---------- All Variants Showcase ----------

const AllVariantsTriggers: React.FC<{ autoClose: number | false; progressBar: boolean; closeButton: boolean }> = ({
  autoClose,
  progressBar,
  closeButton,
}) => {
  const { addToast } = useToast();
  const variants: ToastVariant[] = ['default', 'success', 'error', 'warning', 'info', 'primary'];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {variants.map((v) => (
        <button
          key={v}
          onClick={() => addToast(`This is a ${v} toast.`, { variant: v, autoClose, progressBar, closeButton })}
          style={{
            padding: '8px 18px',
            borderRadius: 6,
            border: 'none',
            background: 'var(--lxs-color-primary-500)',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: 14,
            textTransform: 'capitalize',
          }}
        >
          {v}
        </button>
      ))}
    </div>
  );
};

export const AllVariants: Story = {
  render: (args) => (
    <ThemeProvider toastPosition={args.position}>
      <AllVariantsTriggers
        autoClose={args.autoClose ?? 4000}
        progressBar={args.progressBar ?? true}
        closeButton={args.closeButton ?? true}
      />
    </ThemeProvider>
  ),
  args: {
    position: 'top-right',
    autoClose: 4000,
    progressBar: true,
    closeButton: true,
  },
};

