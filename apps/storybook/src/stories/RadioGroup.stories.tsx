import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { RadioGroup, ThemeProvider } from '@luxis-ui/react';
import React, { useState } from 'react';

const planOptions = [
  { value: 'basic', label: 'Basic' },
  { value: 'pro', label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise' },
];

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text', description: 'Name for all radios' },
    label: { control: 'text', description: 'Group label' },
    options: { control: false, description: 'Radio options' },
    value: { control: false, description: 'Selected value' },
    defaultValue: { control: 'text', description: 'Default value' },
    onChange: { control: false, description: 'Change callback' },
    disabled: { control: 'boolean', description: 'Disable all radios' },
    error: { control: 'boolean', description: 'Error state' },
    helperText: { control: 'text', description: 'Helper text' },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation',
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Size' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'Color variant',
    },
    className: { control: 'text', description: 'Custom class name' },
  },
  args: {
    name: 'plan',
    label: 'Select a plan',
    options: planOptions,
    orientation: 'vertical',
    size: 'md',
    variant: 'primary',
    disabled: false,
    error: false,
    helperText: '',
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const ControlledTemplate = (args: any) => {
  const [value, setValue] = useState('');
  return (
    <ThemeProvider>
      <RadioGroup {...args} value={value} onChange={setValue} />
      <p style={{ marginTop: 16, color: 'var(--lxs-color-neutral-700)' }}>
        Selected: <strong>{value || '—'}</strong>
      </p>
    </ThemeProvider>
  );
};

export const Default: Story = {
  render: ControlledTemplate,
};

export const Horizontal: Story = {
  render: ControlledTemplate,
  args: {
    orientation: 'horizontal',
    label: 'Select a plan (horizontal)',
  },
};

export const WithHelperText: Story = {
  render: ControlledTemplate,
  args: {
    helperText: 'You can change your plan later',
  },
};

export const WithError: Story = {
  render: ControlledTemplate,
  args: {
    error: true,
    helperText: 'Please select a plan',
  },
};

export const Disabled: Story = {
  render: ControlledTemplate,
  args: {
    disabled: true,
  },
};

export const PartiallyDisabled: Story = {
  render: ControlledTemplate,
  args: {
    options: [
      { value: 'basic', label: 'Basic' },
      { value: 'pro', label: 'Pro (Unavailable)', disabled: true },
      { value: 'enterprise', label: 'Enterprise' },
    ],
  },
};

export const Variants: Story = {
  render: (args) => {
    const [values, setValues] = useState<Record<string, string>>({});
    return (
      <ThemeProvider>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {(['primary', 'secondary', 'success', 'error', 'warning', 'info'] as const).map((v) => (
            <RadioGroup
              key={v}
              {...args}
              name={`variant-${v}`}
              label={v.charAt(0).toUpperCase() + v.slice(1)}
              variant={v}
              value={values[v] || ''}
              onChange={(val) => setValues((prev) => ({ ...prev, [v]: val }))}
            />
          ))}
        </div>
      </ThemeProvider>
    );
  },
  args: {
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    orientation: 'horizontal',
  },
};

export const Sizes: Story = {
  render: (args) => {
    const [values, setValues] = useState<Record<string, string>>({});
    return (
      <ThemeProvider>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {(['sm', 'md', 'lg'] as const).map((s) => (
            <RadioGroup
              key={s}
              {...args}
              name={`size-${s}`}
              label={s === 'sm' ? 'Small' : s === 'md' ? 'Medium' : 'Large'}
              size={s}
              value={values[s] || ''}
              onChange={(val) => setValues((prev) => ({ ...prev, [s]: val }))}
            />
          ))}
        </div>
      </ThemeProvider>
    );
  },
};
