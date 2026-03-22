import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Badge, ThemeProvider } from '@luxis-ui/react';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ minHeight: 120 }}>
          <Story />
        </div>
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
      options: ['neutral', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge',
    },
    pill: {
      control: 'boolean',
      description: 'Pill shape (fully rounded ends)',
    },
    rounded: {
      control: 'boolean',
      description: 'Rounded corners (large border radius)',
    },
    dot: {
      control: 'boolean',
      description: 'Show a dot indicator before the content',
    },
    outline: {
      control: 'boolean',
      description: 'Outline style (not filled)',
    },
    lightMode: {
      control: 'boolean',
      description: 'Light background with dark text',
    },
    darkText: {
      control: 'boolean',
      description: 'Force dark text (overrides contrast)',
    },
    maxLength: {
      control: 'number',
      description: 'Truncate content after this many characters',
    },
    children: {
      control: 'text',
      description: 'Badge content',
    },
    icon: {
      control: false,
      description: 'Icon before the badge content',
    },
    onRemove: {
      control: false,
      description: 'Callback for removable badge',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    pill: false,
    rounded: false,
    dot: false,
    outline: false,
    lightMode: false,
    darkText: undefined,
    maxLength: undefined,
    children: 'Badge',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// ─── Stories ────────────────────────────────────────────────────────────────

/** Fully interactive: tweak every prop from the Controls panel. */
export const Playground: Story = {};

/** All variants side-by-side. */
export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {['neutral', 'primary', 'secondary', 'success', 'warning', 'error', 'info'].map((v) => (
        // eslint-disable-next-line
        <Badge key={v} {...args} variant={v as any}>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Badge>
      ))}
    </div>
  ),
};

/** Pill and rounded shapes. */
export const Shapes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Badge {...args} pill>pill</Badge>
      <Badge {...args} rounded>rounded</Badge>
    </div>
  ),
};

/** Dot indicator. */
export const WithDot: Story = {
  args: {
    dot: true,
    children: 'Status',
    variant: 'success',
  },
};

/** Outline and light mode. */
export const OutlineAndLight: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Badge {...args} outline>
        Outline
      </Badge>
      <Badge {...args} lightMode>
        Light
      </Badge>
    </div>
  ),
};

/** Removable badge. */
export const Removable: Story = {
  args: {
    children: 'Tag',
    variant: 'primary',
    onRemove: () => alert('Removed!'),
  },
};

/** Truncated content. */
export const Truncated: Story = {
  args: {
    children: 'Very long badge content',
    maxLength: 8,
  },
};

/** All sizes. */
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16 }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <Badge key={s} {...args} size={s}>
          {s}
        </Badge>
      ))}
    </div>
  ),
};
