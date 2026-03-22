import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Alert, ThemeProvider } from '@luxis-ui/react';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info', 'neutral'],
      description: 'Visual variant of the alert',
    },
    alertStyle: {
      control: 'select',
      options: ['filled', 'outlined', 'subtle', 'left-accent'],
      description: 'Visual style of the alert',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the alert',
    },
    title: {
      control: 'text',
      description: 'Alert title',
    },
    description: {
      control: 'text',
      description: 'Alert description text',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show close button to dismiss the alert',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Alert takes full width of its container',
    },
    icon: {
      control: 'boolean',
      description: 'Set to false to hide the icon',
      mapping: { true: undefined, false: false },
    },
  },
  args: {
    variant: 'info',
    alertStyle: 'subtle',
    size: 'md',
    dismissible: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// ---------- Variants ----------

export const Default: Story = {
  args: {
    title: 'Information',
    description: 'This is an informational alert message.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    description: 'Your changes have been saved successfully.',
  },
};

export const ErrorAlert: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    description: 'Something went wrong. Please try again.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    description: 'This action cannot be undone.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Info',
    description: 'Here is some useful information for you.',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    title: 'Note',
    description: 'This is a neutral alert with no specific severity.',
  },
};

// ---------- Alert Styles ----------

export const Filled: Story = {
  args: {
    variant: 'success',
    alertStyle: 'filled',
    title: 'Filled Style',
    description: 'This alert uses the filled style.',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'info',
    alertStyle: 'outlined',
    title: 'Outlined Style',
    description: 'This alert uses the outlined style.',
  },
};

export const Subtle: Story = {
  args: {
    variant: 'warning',
    alertStyle: 'subtle',
    title: 'Subtle Style',
    description: 'This alert uses the subtle style.',
  },
};

export const LeftAccent: Story = {
  args: {
    variant: 'error',
    alertStyle: 'left-accent',
    title: 'Left Accent Style',
    description: 'This alert uses the left-accent style.',
  },
};

// ---------- Sizes ----------

export const SmallSize: Story = {
  args: {
    size: 'sm',
    title: 'Small Alert',
    description: 'This is a small-sized alert.',
  },
};

export const MediumSize: Story = {
  args: {
    size: 'md',
    title: 'Medium Alert',
    description: 'This is a medium-sized alert.',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    title: 'Large Alert',
    description: 'This is a large-sized alert.',
  },
};

// ---------- Dismissible ----------

export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Dismissible Alert',
    description: 'Click the close button to dismiss this alert.',
    dismissible: true,
    onClose: () => console.log('Alert closed'),
  },
};

// ---------- No Icon ----------

export const NoIcon: Story = {
  args: {
    variant: 'success',
    title: 'No Icon',
    description: 'This alert is shown without an icon.',
    icon: false,
  },
};

// ---------- Children Content ----------

export const WithChildren: Story = {
  args: {
    variant: 'warning',
    title: 'Session Expiring Soon',
    children: (
      <span>
        Your session will expire in <strong>5 minutes</strong>. Please save your work.
      </span>
    ),
  },
};

// ---------- With Action ----------

export const WithAction: Story = {
  args: {
    variant: 'warning',
    alertStyle: 'left-accent',
    title: 'Update Available',
    description: 'A new version is available. Update to get the latest features.',
    action: (
      <button
        style={{
          padding: '4px 12px',
          borderRadius: '4px',
          border: '1px solid currentColor',
          background: 'transparent',
          cursor: 'pointer',
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}
      >
        Update Now
      </button>
    ),
  },
};

// ---------- Full Width ----------

export const FullWidth: Story = {
  args: {
    variant: 'info',
    title: 'Full Width Alert',
    description: 'This alert stretches to fill the full width of its container.',
    fullWidth: true,
  },
};

// ---------- All Variants Showcase ----------

export const AllVariants: Story = {
  render: (args: React.ComponentProps<typeof Alert>) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {(['success', 'error', 'warning', 'info', 'neutral'] as const).map((variant) => (
        <Alert key={variant} {...args} variant={variant} title={variant.charAt(0).toUpperCase() + variant.slice(1)} description={`This is a ${variant} alert.`} />
      ))}
    </div>
  ),
  args: {
    alertStyle: 'subtle',
    size: 'md',
  },
};

// ---------- All Styles Showcase ----------

export const AllStyles: Story = {
  render: (args: React.ComponentProps<typeof Alert>) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {(['filled', 'outlined', 'subtle', 'left-accent'] as const).map((alertStyle) => (
        <Alert key={alertStyle} {...args} alertStyle={alertStyle} title={alertStyle} description={`This is the ${alertStyle} style.`} />
      ))}
    </div>
  ),
  args: {
    variant: 'info',
    size: 'md',
  },
};
