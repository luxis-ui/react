import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { MultiSelect, ThemeProvider } from '@luxis-ui/react';
import React, { useState } from 'react';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
  { value: 'ember', label: 'Ember' },
  { value: 'backbone', label: 'Backbone' },
];

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
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
    options: { control: false, description: 'Options array' },
    value: { control: false, description: 'Selected values' },
    placeholder: { control: 'text', description: 'Placeholder' },
    selectionStyle: { control: 'select', options: ['checkbox', 'checkmark'], description: 'Selection style' },
    searchable: { control: 'boolean', description: 'Searchable' },
    showSelectAll: { control: 'boolean', description: 'Show select all/clear all' },
    disabled: { control: 'boolean', description: 'Disabled' },
    required: { control: 'boolean', description: 'Required' },
    chipColor: { control: 'select', options: ['default', 'primary', 'success', 'error', 'warning', 'info'], description: 'Chip color' },
    chipVariant: { control: 'select', options: ['filled', 'outlined', 'light'], description: 'Chip variant' },
    loading: { control: 'boolean', description: 'Loading' },
    maxChipsDisplay: { control: 'number', description: 'Max chips display' },
    className: { control: false, description: 'Custom class name' },
  },
  args: {
    label: 'Technologies',
    placeholder: 'Select technologies',
    options,
    size: 'md',
    fullWidth: false,
    selectionStyle: 'checkbox',
    searchable: false,
    showSelectAll: false,
    disabled: false,
    required: false,
    chipColor: 'primary',
    chipVariant: 'light',
    loading: false,
    maxChipsDisplay: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const ControlledTemplate = (args: any) => {
  const [value, setValue] = useState<(string | number)[]>([]);
  return (
    <ThemeProvider>
      <MultiSelect {...args} value={value} onChange={setValue} />
    </ThemeProvider>
  );
};

export const Default: Story = {
  render: ControlledTemplate,
};

export const Searchable: Story = {
  render: ControlledTemplate,
  args: {
    searchable: true,
    placeholder: 'Search and select',
  },
};

export const WithSelectAll: Story = {
  render: ControlledTemplate,
  args: {
    showSelectAll: true,
  },
};

export const CheckmarkStyle: Story = {
  render: ControlledTemplate,
  args: {
    selectionStyle: 'checkmark',
  },
};

export const Disabled: Story = {
  render: ControlledTemplate,
  args: {
    disabled: true,
  },
};

export const WithError: Story = {
  render: ControlledTemplate,
  args: {
    error: 'Please select at least one',
  },
};

export const MaxChips: Story = {
  render: ControlledTemplate,
  args: {
    maxChipsDisplay: 2,
  },
};
