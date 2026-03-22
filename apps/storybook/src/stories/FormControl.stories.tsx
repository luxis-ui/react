import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { FormControl, Input, ThemeProvider } from '@luxis-ui/react';
import React, { useState } from 'react';

const meta: Meta<typeof FormControl> = {
  title: 'Components/FormControl',
  component: FormControl,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label text' },
    helperText: { control: 'text', description: 'Helper text' },
    error: { control: 'text', description: 'Error message' },
    success: { control: 'text', description: 'Success message' },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Size' },
    fullWidth: { control: 'boolean', description: 'Full width' },
    required: { control: 'boolean', description: 'Required' },
    disabled: { control: 'boolean', description: 'Disabled' },
    wrapperClassName: { control: false, description: 'Wrapper class' },
    labelClassName: { control: false, description: 'Label class' },
    spacing: { control: 'select', options: ['none', 'sm', 'md', 'lg'], description: 'Spacing' },
    className: { control: false, description: 'Custom class name' },
  },
  args: {
    label: 'Label',
    helperText: '',
    error: '',
    success: '',
    size: 'md',
    fullWidth: true,
    required: false,
    disabled: false,
    spacing: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof FormControl>;

const ControlledTemplate = (args: any) => {
  const [value, setValue] = useState('');
  return (
    <ThemeProvider>
      <FormControl {...args}>
        <Input value={value} onChange={e => setValue(e.target.value)} placeholder="Type here..." />
      </FormControl>
    </ThemeProvider>
  );
};

export const Default: Story = {
  render: ControlledTemplate,
  args: {},
};

export const WithHelperText: Story = {
  render: ControlledTemplate,
  args: {
    helperText: 'This is some helper text',
  },
};

export const WithError: Story = {
  render: ControlledTemplate,
  args: {
    error: 'This field is required',
  },
};

export const WithSuccess: Story = {
  render: ControlledTemplate,
  args: {
    success: 'Looks good!',
  },
};

export const Disabled: Story = {
  render: ControlledTemplate,
  args: {
    disabled: true,
  },
};

export const Required: Story = {
  render: ControlledTemplate,
  args: {
    required: true,
  },
};

export const LargeSize: Story = {
  render: ControlledTemplate,
  args: {
    size: 'lg',
  },
};

export const SmallSize: Story = {
  render: ControlledTemplate,
  args: {
    size: 'sm',
  },
};
