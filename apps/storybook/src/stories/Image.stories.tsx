import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Image, ThemeProvider } from '@luxis-ui/react';
import React from 'react';

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text', description: 'Image source URL' },
    alt: { control: 'text', description: 'Alternate text' },
    fallback: { control: 'text', description: 'Fallback image URL' },
    priority: { control: 'boolean', description: 'Eager load' },
    fetchPriority: { control: 'select', options: ['auto', 'high', 'low'], description: 'Fetch priority' },
    className: { control: false, description: 'Custom class name' },
    style: { control: false, description: 'Custom style' },
    imageProps: { control: false, description: 'Props for image component' },
    component: { control: false, description: 'Custom image component' },
  },
  args: {
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
    alt: 'Forest',
    fallback: 'https://via.placeholder.com/400x300?text=Loading...',
    priority: false,
    fetchPriority: 'auto',
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  render: (args) => (
    <ThemeProvider>
      <div style={{ width: 400, height: 300 }}>
        <Image {...args} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </ThemeProvider>
  ),
};

export const WithFallback: Story = {
  render: (args) => (
    <ThemeProvider>
      <div style={{ width: 400, height: 300 }}>
        <Image {...args} src="broken-url.jpg" fallback="https://via.placeholder.com/400x300?text=Fallback" />
      </div>
    </ThemeProvider>
  ),
  args: {
    alt: 'Broken image with fallback',
  },
};

export const NoFallback: Story = {
  render: (args) => (
    <ThemeProvider>
      <div style={{ width: 400, height: 300 }}>
        <Image {...args} src="broken-url.jpg" fallback={undefined} />
      </div>
    </ThemeProvider>
  ),
  args: {
    alt: 'Broken image no fallback',
  },
};

export const EagerLoad: Story = {
  render: (args) => (
    <ThemeProvider>
      <div style={{ width: 400, height: 300 }}>
        <Image {...args} priority />
      </div>
    </ThemeProvider>
  ),
  args: {
    alt: 'Eager loaded image',
    priority: true,
  },
};
