import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Divider, Box } from '@luxis-ui/react';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation',
    },
    variant: {
      control: 'select',
      options: ['fullWidth', 'inset', 'middle'],
      description: 'Variant',
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment (with children)',
    },
    light: { control: 'boolean', description: 'Light color' },
    flexItem: { control: 'boolean', description: 'Flex item' },
    children: { control: 'text', description: 'Content in divider' },
    className: { control: false, description: 'Custom class name' },
  },
  args: {
    orientation: 'horizontal',
    variant: 'fullWidth',
    textAlign: 'center',
    light: false,
    flexItem: false,
    children: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: (args) =>
    args.orientation === 'vertical' ? (
      <Box style={{ display: 'flex', alignItems: 'center', height: 80 }}>
        <span>Left</span>
        <Divider {...args} style={{ margin: '0 16px', ...args.style }} />
        <span>Right</span>
      </Box>
    ) : (
      <Divider {...args} />
    ),
  args: {},
};

export const WithText: Story = {
  args: {
    children: 'Label',
  },
};

export const Inset: Story = {
  args: {
    variant: 'inset',
  },
};

export const Middle: Story = {
  args: {
    variant: 'middle',
  },
};

export const Light: Story = {
  args: {
    light: true,
  },
};

export const Vertical: Story = {
  render: (args) => (
    <Box style={{ display: 'flex', alignItems: 'center', height: 80 }}>
      <span>Left</span>
      <Divider {...args} style={{ margin: '0 16px' }} />
      <span>Right</span>
    </Box>
  ),
  args: {
    orientation: 'vertical',
  },
};

export const FlexItem: Story = {
  render: (args) => (
    <Box style={{ display: 'flex', alignItems: 'center', height: 80 }}>
      <span>Item 1</span>
      <Divider {...args} style={{ margin: '0 16px' }} />
      <span>Item 2</span>
    </Box>
  ),
  args: {
    orientation: 'vertical',
    flexItem: true,
  },
};
