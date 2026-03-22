import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import '@luxis-ui/react/theme/base.css';
import { CheckboxGroup, ThemeProvider } from '@luxis-ui/react';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Group label',
    },
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of checkboxes',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all checkboxes',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the group',
    },
  },
  args: {
    label: 'Select options',
    orientation: 'vertical',
    size: 'md',
    disabled: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

const baseOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
];

export const Default: Story = {
  render: (args) => (
    <ThemeProvider>
      <CheckboxGroup {...args} options={baseOptions} defaultValue={['react']} />
    </ThemeProvider>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(['react']);
    return (
      <ThemeProvider>
        <CheckboxGroup
          {...args}
          options={baseOptions}
          value={value}
          onChange={setValue}
        />
        <p style={{ marginTop: 12, color: '#666', fontSize: 13 }}>
          Selected: {value.length ? value.join(', ') : 'none'}
        </p>
      </ThemeProvider>
    );
  },
};

export const Horizontal: Story = {
  render: (args) => (
    <ThemeProvider>
      <CheckboxGroup
        {...args}
        options={baseOptions}
        orientation="horizontal"
        defaultValue={['react', 'vue']}
      />
    </ThemeProvider>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <CheckboxGroup {...args} label="Small" size="sm" options={baseOptions} defaultValue={['react']} />
        <CheckboxGroup {...args} label="Medium" size="md" options={baseOptions} defaultValue={['react']} />
        <CheckboxGroup {...args} label="Large" size="lg" options={baseOptions} defaultValue={['react']} />
      </div>
    </ThemeProvider>
  ),
};

export const WithDisabledOptions: Story = {
  render: (args) => (
    <ThemeProvider>
      <CheckboxGroup
        {...args}
        label="Frameworks"
        options={[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue (unavailable)', disabled: true },
          { value: 'angular', label: 'Angular' },
          { value: 'svelte', label: 'Svelte (unavailable)', disabled: true },
        ]}
        defaultValue={['react']}
      />
    </ThemeProvider>
  ),
};

export const AllDisabled: Story = {
  render: (args) => (
    <ThemeProvider>
      <CheckboxGroup
        {...args}
        disabled
        options={baseOptions}
        defaultValue={['react', 'vue']}
      />
    </ThemeProvider>
  ),
};

export const WithError: Story = {
  render: (args) => (
    <ThemeProvider>
      <CheckboxGroup
        {...args}
        error
        helperText="Please select at least one option."
        options={baseOptions}
      />
    </ThemeProvider>
  ),
};

export const WithHelperText: Story = {
  render: (args) => (
    <ThemeProvider>
      <CheckboxGroup
        {...args}
        helperText="You can select multiple options."
        options={baseOptions}
        defaultValue={['react']}
      />
    </ThemeProvider>
  ),
};

export const SelectAll: Story = {
  render: (args) => {
    const options = baseOptions;
    const [value, setValue] = useState<string[]>([]);
    const allValues = options.map((o) => o.value);
    const allChecked = value.length === allValues.length;
    const someChecked = value.length > 0 && !allChecked;

    return (
      <ThemeProvider>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={allChecked}
              ref={(el) => { if (el) el.indeterminate = someChecked; }}
              onChange={(e) => setValue(e.target.checked ? allValues : [])}
            />
            Select all
          </label>
          <div style={{ paddingLeft: 24 }}>
            <CheckboxGroup
              {...args}
              label=""
              options={options}
              value={value}
              onChange={setValue}
            />
          </div>
          <p style={{ margin: 0, color: '#666', fontSize: 13 }}>
            Selected: {value.length ? value.join(', ') : 'none'}
          </p>
        </div>
      </ThemeProvider>
    );
  },
};
