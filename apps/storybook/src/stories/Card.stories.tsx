import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Card, ThemeProvider } from '@luxis-ui/react';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    noPadding: {
      control: 'boolean',
      description: 'Remove padding',
    },
    padding: {
      control: 'text',
      description: 'Custom padding',
    },
    hoverable: {
      control: 'boolean',
      description: 'Hoverable effect',
    },
    clickable: {
      control: 'boolean',
      description: 'Clickable (pointer/tabIndex)',
    },
    header: {
      control: false,
      description: 'Header content',
    },
    footer: {
      control: false,
      description: 'Footer content',
    },
    divider: {
      control: 'boolean',
      description: 'Show dividers',
    },
    children: {
      control: 'text',
      description: 'Card content',
    },
  },
  args: {
    variant: 'elevated',
    size: 'md',
    noPadding: false,
    hoverable: false,
    clickable: false,
    divider: false,
    children: 'Card content',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <ThemeProvider>
      <Card {...args} />
    </ThemeProvider>
  ),
  args: {
    children: 'This is a basic card. You can put any content here.',
  },
};

export const Variants: Story = {
  render: (args) => (
    <ThemeProvider>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <Card {...args} variant="elevated">Elevated</Card>
        <Card {...args} variant="outlined">Outlined</Card>
        <Card {...args} variant="filled">Filled</Card>
      </div>
    </ThemeProvider>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <ThemeProvider>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <Card {...args} size="sm">Small</Card>
        <Card {...args} size="md">Medium</Card>
        <Card {...args} size="lg">Large</Card>
      </div>
    </ThemeProvider>
  ),
};

export const NoPadding: Story = {
  render: (args) => (
    <ThemeProvider>
      <Card {...args} noPadding>
        <img src="https://placehold.co/320x120" alt="Full bleed" style={{ width: '100%', display: 'block' }} />
      </Card>
    </ThemeProvider>
  ),
};

export const CustomPadding: Story = {
  render: (args) => (
    <ThemeProvider>
      <Card {...args} padding="32px">
        Card with custom padding (32px)
      </Card>
    </ThemeProvider>
  ),
};

export const WithHeaderFooter: Story = {
  render: (args) => (
    <ThemeProvider>
      <Card {...args}
        header={<h3 style={{ margin: 0 }}>Card Header</h3>}
        footer={<button>Action</button>}
        divider
      >
        Card with header, content, and footer.
      </Card>
    </ThemeProvider>
  ),
};

export const Interactive: Story = {
  render: (args) => (
    <ThemeProvider>
      <Card {...args} hoverable clickable onClick={() => alert('Card clicked!')}>
        Clickable & hoverable card
      </Card>
    </ThemeProvider>
  ),
};
