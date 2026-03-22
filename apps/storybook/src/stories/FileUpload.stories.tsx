import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { FileUpload, ThemeProvider } from '@luxis-ui/react';
import React, { useState } from 'react';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label text' },
    helperText: { control: 'text', description: 'Helper text' },
    error: { control: 'text', description: 'Error message' },
    accept: { control: 'text', description: 'Accepted file types' },
    multiple: { control: 'boolean', description: 'Allow multiple files' },
    maxSize: { control: 'number', description: 'Max file size (bytes)' },
    disabled: { control: 'boolean', description: 'Disabled' },
    required: { control: 'boolean', description: 'Required' },
    className: { control: false, description: 'Custom class name' },
    customIcons: { control: false, description: 'Custom icons' },
    initialFiles: { control: false, description: 'Initial files' },
    onUpload: { control: false, description: 'Upload callback' },
    onRemove: { control: false, description: 'Remove callback' },
  },
  args: {
    label: 'Upload Files',
    helperText: '',
    error: '',
    accept: '',
    multiple: false,
    maxSize: undefined,
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

const ControlledTemplate = (args: any) => {
  const [files, setFiles] = useState([]);
  return (
    <ThemeProvider>
      <FileUpload
        {...args}
        onUpload={setFiles}
        onRemove={(id) => setFiles((prev: any) => prev.filter((f: any) => f.id !== id))}
      />
      <pre style={{ marginTop: 16, background: '#f6f8fa', padding: 12, borderRadius: 6 }}>
        {JSON.stringify(files, null, 2)}
      </pre>
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
    helperText: 'Drag and drop files or click to select',
  },
};

export const WithError: Story = {
  render: ControlledTemplate,
  args: {
    error: 'File type not supported',
  },
};

export const Multiple: Story = {
  render: ControlledTemplate,
  args: {
    multiple: true,
    helperText: 'You can upload multiple files',
  },
};

export const AcceptImages: Story = {
  render: ControlledTemplate,
  args: {
    accept: 'image/*',
    helperText: 'Only images are allowed',
  },
};

export const MaxSize: Story = {
  render: ControlledTemplate,
  args: {
    maxSize: 1024 * 1024,
    helperText: 'Max file size: 1MB',
  },
};

export const Disabled: Story = {
  render: ControlledTemplate,
  args: {
    disabled: true,
    helperText: 'File upload is disabled',
  },
};
