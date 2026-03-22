import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { DatePicker, ThemeProvider } from '@luxis-ui/react';
import React, { useState } from 'react';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: false, description: 'Selected date value' },
    onChange: { control: false, description: 'Callback when date changes' },
    label: { control: 'text', description: 'Label text' },
    placeholder: { control: 'text', description: 'Placeholder text' },
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
    showToday: { control: 'boolean', description: 'Show today button' },
    className: { control: false, description: 'Custom class name' },
    inputClassName: { control: false, description: 'Input class name' },
    dropdownClassName: { control: false, description: 'Dropdown class name' },
    clearable: { control: 'boolean', description: 'Show clear button' },
  },
  args: {
    label: 'Select Date',
    placeholder: 'MM/DD/YYYY',
    helperText: '',
    error: '',
    success: '',
    size: 'md',
    fullWidth: false,
    disabled: false,
    required: false,
    format: 'MM/DD/YYYY',
    showToday: true,
    clearable: false,
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

const ControlledTemplate = (args: any) => {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <ThemeProvider>
      <DatePicker {...args} value={date} onChange={setDate} />
    </ThemeProvider>
  );
};

export const Default: Story = {
  render: ControlledTemplate,
  args: {
    label: 'Birth Date',
    placeholder: 'MM/DD/YYYY',
  },
};

export const WithHelperText: Story = {
  render: ControlledTemplate,
  args: {
    label: 'Event Date',
    helperText: 'Pick a date for your event',
  },
};

export const WithError: Story = {
  render: ControlledTemplate,
  args: {
    label: 'Start Date',
    error: 'Invalid date',
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
    label: 'Booking Date',
    minDate: new Date(2026, 2, 1),
    maxDate: new Date(2026, 2, 31),
    helperText: 'Only March 2026 is selectable',
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
