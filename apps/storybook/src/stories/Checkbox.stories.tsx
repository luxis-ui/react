import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import '@luxis-ui/react/theme/base.css';
import { Checkbox, ThemeProvider } from '@luxis-ui/react';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'Color variant',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below checkbox',
    },
  },
  args: {
    label: 'Checkbox label',
    size: 'md',
    variant: 'primary',
    indeterminate: false,
    disabled: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => (
    <ThemeProvider>
      <Checkbox {...args} />
    </ThemeProvider>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <ThemeProvider>
        <Checkbox
          {...args}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          label={checked ? 'Checked' : 'Unchecked'}
        />
      </ThemeProvider>
    );
  },
};

export const Variants: Story = {
  render: (args) => (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Checkbox {...args} variant="primary" label="Primary" defaultChecked />
        <Checkbox {...args} variant="secondary" label="Secondary" defaultChecked />
        <Checkbox {...args} variant="success" label="Success" defaultChecked />
        <Checkbox {...args} variant="error" label="Error" defaultChecked />
        <Checkbox {...args} variant="warning" label="Warning" defaultChecked />
        <Checkbox {...args} variant="info" label="Info" defaultChecked />
      </div>
    </ThemeProvider>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Checkbox {...args} size="sm" label="Small" defaultChecked />
        <Checkbox {...args} size="md" label="Medium" defaultChecked />
        <Checkbox {...args} size="lg" label="Large" defaultChecked />
      </div>
    </ThemeProvider>
  ),
};

export const Indeterminate: Story = {
  render: (args) => (
    <ThemeProvider>
      <Checkbox {...args} indeterminate label="Select all" />
    </ThemeProvider>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Checkbox {...args} disabled label="Disabled unchecked" />
        <Checkbox {...args} disabled defaultChecked label="Disabled checked" />
        <Checkbox {...args} disabled indeterminate label="Disabled indeterminate" />
      </div>
    </ThemeProvider>
  ),
};

export const WithError: Story = {
  render: (args) => (
    <ThemeProvider>
      <Checkbox
        {...args}
        error
        label="I agree to the terms and conditions"
        helperText="You must agree to continue."
      />
    </ThemeProvider>
  ),
};

export const WithHelperText: Story = {
  render: (args) => (
    <ThemeProvider>
      <Checkbox
        {...args}
        label="Subscribe to newsletter"
        helperText="You can unsubscribe at any time."
      />
    </ThemeProvider>
  ),
};

export const Group: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string[]>(['react']);
    const options = [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
    ];
    const toggle = (value: string) =>
      setSelected((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    return (
      <ThemeProvider>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Preferred frameworks:</p>
          {options.map((opt) => (
            <Checkbox
              {...args}
              key={opt.value}
              label={opt.label}
              checked={selected.includes(opt.value)}
              onChange={() => toggle(opt.value)}
            />
          ))}
          <p style={{ margin: '8px 0 0', color: '#666', fontSize: 13 }}>
            Selected: {selected.length ? selected.join(', ') : 'none'}
          </p>
        </div>
      </ThemeProvider>
    );
  },
};
