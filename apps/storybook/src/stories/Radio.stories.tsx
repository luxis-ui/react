import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Radio, ThemeProvider } from '@luxis-ui/react';
import React, { useState } from 'react';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label text' },
    checked: { control: 'boolean', description: 'Checked state' },
    disabled: { control: 'boolean', description: 'Disabled' },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Size' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'Color variant',
    },
    error: { control: 'boolean', description: 'Error state' },
    helperText: { control: 'text', description: 'Helper text' },
    value: { control: 'text', description: 'Value' },
    name: { control: 'text', description: 'Name attribute' },
    className: { control: 'text', description: 'Custom class on container' },
    inputClassName: { control: 'text', description: 'Custom class on input' },
  },
  args: {
    label: 'Radio option',
    checked: false,
    disabled: false,
    size: 'md',
    variant: 'primary',
    error: false,
    helperText: '',
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <ThemeProvider>
        <Radio
          {...args}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </ThemeProvider>
    );
  },
  args: {
    label: 'Option 1',
    value: '1',
  },
};

export const Variants: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string>('primary');
    return (
      <ThemeProvider>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(['primary', 'secondary', 'success', 'error', 'warning', 'info'] as const).map((v) => (
            <Radio
              key={v}
              {...args}
              label={v.charAt(0).toUpperCase() + v.slice(1)}
              variant={v}
              name="variants"
              value={v}
              checked={selected === v}
              onChange={(e) => setSelected(e.target.value)}
            />
          ))}
        </div>
      </ThemeProvider>
    );
  },
};

export const Sizes: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string>('md');
    return (
      <ThemeProvider>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(['sm', 'md', 'lg'] as const).map((s) => (
            <Radio
              key={s}
              {...args}
              label={s === 'sm' ? 'Small' : s === 'md' ? 'Medium' : 'Large'}
              size={s}
              name="sizes"
              value={s}
              checked={selected === s}
              onChange={(e) => setSelected(e.target.value)}
            />
          ))}
        </div>
      </ThemeProvider>
    );
  },
};

export const RadioGroup: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string>('option1');
    return (
      <ThemeProvider>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Radio
            {...args}
            label="Option 1"
            name="group"
            value="option1"
            checked={selected === 'option1'}
            onChange={(e) => setSelected(e.target.value)}
          />
          <Radio
            {...args}
            label="Option 2"
            name="group"
            value="option2"
            checked={selected === 'option2'}
            onChange={(e) => setSelected(e.target.value)}
          />
          <Radio
            {...args}
            label="Option 3"
            name="group"
            value="option3"
            checked={selected === 'option3'}
            onChange={(e) => setSelected(e.target.value)}
          />
        </div>
        <p style={{ marginTop: 16, color: 'var(--lxs-color-neutral-700)' }}>Selected: {selected}</p>
      </ThemeProvider>
    );
  },
};

export const WithHelperText: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <ThemeProvider>
        <Radio
          {...args}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </ThemeProvider>
    );
  },
  args: {
    label: 'Accept terms',
    helperText: 'You must accept the terms to continue',
  },
};

export const ErrorState: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <ThemeProvider>
        <Radio
          {...args}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </ThemeProvider>
    );
  },
  args: {
    label: 'Required option',
    error: true,
    helperText: 'Please select an option',
  },
};

export const Disabled: Story = {
  render: (args) => (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Radio {...args} label="Disabled unchecked" disabled checked={false} />
        <Radio {...args} label="Disabled checked" disabled checked />
      </div>
    </ThemeProvider>
  ),
};
