import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { DateRangePicker, ThemeProvider } from '@luxis-ui/react';
import React, { useState } from 'react';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: false, description: 'Selected date range' },
    onChange: { control: false, description: 'Callback when range changes' },
    label: { control: 'text', description: 'Label text' },
    startPlaceholder: { control: 'text', description: 'Start date placeholder' },
    endPlaceholder: { control: 'text', description: 'End date placeholder' },
    helperText: { control: 'text', description: 'Helper text' },
    error: { control: 'text', description: 'Error message' },
    success: { control: 'text', description: 'Success message' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    fullWidth: { control: 'boolean', description: 'Full width' },
    disabled: { control: 'boolean', description: 'Disabled' },
    required: { control: 'boolean', description: 'Required' },
    minDate: { control: false, description: 'Minimum selectable date' },
    maxDate: { control: false, description: 'Maximum selectable date' },
    disabledDates: { control: false, description: 'Array of disabled dates' },
    isDateDisabled: { control: false, description: 'Custom function to disable dates' },
    format: { control: 'text', description: 'Date format' },
    separator: { control: 'text', description: 'Range separator' },
    presets: { control: false, description: 'Preset ranges' },
    className: { control: false, description: 'Custom class name' },
    inputClassName: { control: false, description: 'Input class name' },
    dropdownClassName: { control: false, description: 'Dropdown class name' },
    clearable: { control: 'boolean', description: 'Show clear button' },
  },
  args: {
    label: 'Select Date Range',
    startPlaceholder: 'Start date',
    endPlaceholder: 'End date',
    helperText: '',
    error: '',
    success: '',
    size: 'md',
    fullWidth: false,
    disabled: false,
    required: false,
    format: 'MM/DD/YYYY',
    separator: 'to',
    clearable: false,
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

const ControlledTemplate = (args: any) => {
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  return (
    <ThemeProvider>
      <DateRangePicker {...args} value={range} onChange={setRange} />
    </ThemeProvider>
  );
};

export const Default: Story = {
  render: ControlledTemplate,
  args: {
    label: 'Date Range',
    startPlaceholder: 'Start',
    endPlaceholder: 'End',
  },
};

export const WithHelperText: Story = {
  render: ControlledTemplate,
  args: {
    label: 'Reporting Period',
    helperText: 'Select a reporting period',
  },
};

export const WithError: Story = {
  render: ControlledTemplate,
  args: {
    label: 'Range',
    error: 'Invalid range',
  },
};

export const Disabled: Story = {
  render: ControlledTemplate,
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

export const Required: Story = {
  render: ControlledTemplate,
  args: {
    label: 'Required',
    required: true,
  },
};

export const WithMinMax: Story = {
  render: ControlledTemplate,
  args: {
    label: 'March Range',
    minDate: new Date(2026, 2, 1),
    maxDate: new Date(2026, 2, 31),
    helperText: 'Only March 2026 is selectable',
  },
};

export const WithPresets: Story = {
  render: ControlledTemplate,
  args: {
    label: 'Presets',
    presets: [
      { label: 'This Week', range: { start: new Date(2026, 2, 2), end: new Date(2026, 2, 8) } },
      { label: 'This Month', range: { start: new Date(2026, 2, 1), end: new Date(2026, 2, 31) } },
    ],
  },
};

export const Clearable: Story = {
  render: ControlledTemplate,
  args: {
    label: 'Clearable',
    clearable: true,
  },
};

export const LargeSize: Story = {
  render: ControlledTemplate,
  args: {
    label: 'Large',
    size: 'lg',
  },
};

export const SmallSize: Story = {
  render: ControlledTemplate,
  args: {
    label: 'Small',
    size: 'sm',
  },
};
