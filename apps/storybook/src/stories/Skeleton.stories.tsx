import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from '@luxis-ui/react';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
      description: 'Shape of the skeleton',
    },
    animation: {
      control: 'select',
      options: ['wave', 'pulse', 'none'],
      description: 'Animation style',
    },
    width: {
      control: 'text',
      description: 'Width (px number or CSS string like "200px", "100%")',
    },
    height: {
      control: 'text',
      description: 'Height (px number or CSS string)',
    },
    respectMotionPreference: {
      control: 'boolean',
      description: 'Disables animation if user prefers reduced motion',
    },
  },
  args: {
    variant: 'text',
    animation: 'wave',
    respectMotionPreference: true,
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    width: '100%',
    height: 16,
  },
};

export const TextLines: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
      <Skeleton {...args} width="100%" height={16} />
      <Skeleton {...args} width="90%" height={16} />
      <Skeleton {...args} width="75%" height={16} />
    </div>
  ),
  args: {
    variant: 'text',
    animation: 'wave',
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 48,
    height: 48,
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: '100%',
    height: 200,
  },
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    width: '100%',
    height: 120,
  },
};

export const PulseAnimation: Story = {
  args: {
    variant: 'text',
    animation: 'pulse',
    width: '100%',
    height: 16,
  },
};

export const NoAnimation: Story = {
  args: {
    variant: 'text',
    animation: 'none',
    width: '100%',
    height: 16,
  },
};

export const CardLayout: Story = {
  render: (args) => (
    <div style={{ maxWidth: 360, padding: 20, border: '1px solid #e5e7eb', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Skeleton {...args} variant="rectangular" width="100%" height={180} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Skeleton {...args} variant="circular" width={40} height={40} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Skeleton {...args} variant="text" width="60%" height={14} />
          <Skeleton {...args} variant="text" width="40%" height={12} />
        </div>
      </div>
      <Skeleton {...args} variant="text" width="100%" height={14} />
      <Skeleton {...args} variant="text" width="85%" height={14} />
      <Skeleton {...args} variant="text" width="70%" height={14} />
    </div>
  ),
  args: { animation: 'wave' },
};

export const ProfileLayout: Story = {
  render: (args) => (
    <div style={{ maxWidth: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <Skeleton {...args} variant="circular" width={80} height={80} />
      <Skeleton {...args} variant="text" width={160} height={20} />
      <Skeleton {...args} variant="text" width={120} height={14} />
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <Skeleton {...args} variant="rounded" width={80} height={32} />
        <Skeleton {...args} variant="rounded" width={80} height={32} />
      </div>
    </div>
  ),
  args: { animation: 'wave' },
};

export const ListLayout: Story = {
  render: (args) => (
    <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[1, 2, 3, 4].map((n) => (
        <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Skeleton {...args} variant="circular" width={40} height={40} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Skeleton {...args} variant="text" width="70%" height={14} />
            <Skeleton {...args} variant="text" width="50%" height={12} />
          </div>
        </div>
      ))}
    </div>
  ),
  args: { animation: 'wave' },
};

export const TableLayout: Story = {
  render: (args) => (
    <div style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[1, 2, 3, 5].map((n) => (
        <div key={n} style={{ display: 'flex', gap: 12 }}>
          <Skeleton {...args} variant="text" width="30%" height={14} />
          <Skeleton {...args} variant="text" width="25%" height={14} />
          <Skeleton {...args} variant="text" width="20%" height={14} />
          <Skeleton {...args} variant="text" width="25%" height={14} />
        </div>
      ))}
    </div>
  ),
  args: { animation: 'wave' },
};
