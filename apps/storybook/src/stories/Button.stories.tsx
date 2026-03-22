import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Button, ThemeProvider } from '@luxis-ui/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Icon only',
    },
    asLink: {
      control: 'boolean',
      description: 'Render as link',
    },
    href: {
      control: 'text',
      description: 'Link href',
    },
    leftIcon: {
      control: false,
      description: 'Icon before text',
    },
    rightIcon: {
      control: false,
      description: 'Icon after text',
    },
    loadingText: {
      control: 'text',
      description: 'Loading text',
    },
    textColor: {
      control: 'color',
      description: 'Custom text color',
    },
    darkText: {
      control: 'boolean',
      description: 'Force dark text',
    },
    shape: {
      control: 'select',
      options: ['default', 'pill', 'square'],
      description: 'Button shape',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    loading: false,
    disabled: false,
    iconOnly: false,
    asLink: false,
    shape: 'default',
    children: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => (
    <ThemeProvider>
      <Button {...args} />
    </ThemeProvider>
  ),
  args: {
    children: 'Button',
  },
};

export const Variants: Story = {
  render: (args) => (
    <ThemeProvider>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Button {...args} variant="primary">Primary</Button>
        <Button {...args} variant="secondary">Secondary</Button>
        <Button {...args} variant="outline">Outline</Button>
        <Button {...args} variant="ghost">Ghost</Button>
        <Button {...args} variant="danger">Danger</Button>
        <Button {...args} variant="success">Success</Button>
        <Button {...args} variant="warning">Warning</Button>
      </div>
    </ThemeProvider>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <ThemeProvider>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Button {...args} size="sm">Small</Button>
        <Button {...args} size="md">Medium</Button>
        <Button {...args} size="lg">Large</Button>
      </div>
    </ThemeProvider>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <ThemeProvider>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button {...args} leftIcon={<span>💾</span>}>Save</Button>
        <Button {...args} rightIcon={<span>➡️</span>}>Next</Button>
        <Button {...args} iconOnly aria-label="Search">🔍</Button>
      </div>
    </ThemeProvider>
  ),
};

export const Shapes: Story = {
  render: (args) => (
    <ThemeProvider>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Button {...args} shape="default">Default</Button>
        <Button {...args} shape="pill">Pill</Button>
        <Button {...args} shape="square">Square</Button>
      </div>
    </ThemeProvider>
  ),
};

export const Loading: Story = {
  render: (args) => (
    <ThemeProvider>
      <Button {...args} />
    </ThemeProvider>
  ),
  args: {
    loading: true,
    loadingText: 'Loading...',
    children: 'Submit',
  },
};

export const AsLink: Story = {
  render: (args) => (
    <ThemeProvider>
      <Button {...args} />
    </ThemeProvider>
  ),
  args: {
    asLink: true,
    href: '/dashboard',
    children: 'Go to Dashboard',
  },
};

export const FullWidth: Story = {
  render: (args) => (
    <ThemeProvider>
      <Button {...args} />
    </ThemeProvider>
  ),
  args: {
    fullWidth: true,
    children: 'Full Width',
  },
};

export const CustomTextColor: Story = {
  render: (args) => (
    <ThemeProvider>
      <Button {...args} />
    </ThemeProvider>
  ),
  args: {
    textColor: '#e91e63',
    children: 'Custom Color',
  },
};
