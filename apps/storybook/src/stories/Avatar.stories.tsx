import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Avatar, ThemeProvider } from '@luxis-ui/react';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the avatar',
    },
    shape: {
      control: 'radio',
      options: ['circular', 'rounded', 'square'],
      description: 'Shape of the avatar',
    },
    src: {
      control: 'text',
      description: 'Image URL for the avatar',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image',
    },
    fallback: {
      control: 'text',
      description: 'Fallback text (up to 2 chars) shown when no image is provided or image fails to load. Use "?" to show the default user icon.',
    },
    priority: {
      control: 'boolean',
      description: 'Eager-loads the image with high fetchPriority. Useful when the avatar is the LCP element.',
    },
    statusPosition: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'Position of the optional status indicator',
    },
  },
  args: {
    size: 'md',
    shape: 'circular',
    src: 'https://i.pravatar.cc/150?img=3',
    alt: 'Jane Doe',
    fallback: 'JD',
    priority: false,
    statusPosition: 'bottom-right',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// ─── Status badge helper ────────────────────────────────────────────────────
const StatusDot = ({ color }: { color: string }) => (
  <span
    style={{
      display: 'inline-block',
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: color,
      border: '2px solid white',
    }}
  />
);

// ─── Stories ────────────────────────────────────────────────────────────────

/** Fully interactive: tweak every prop from the Controls panel. */
export const Playground: Story = {};

/** Default avatar with an image. */
export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=3',
    alt: 'Jane Doe',
  },
};

/** Shows initials when no image is supplied. */
export const WithFallbackText: Story = {
  args: {
    src: undefined,
    fallback: 'JD',
  },
};

/** Shows the default user icon when fallback is "?". */
export const WithFallbackIcon: Story = {
  args: {
    src: undefined,
    fallback: '?',
  },
};

/** Simulates a broken image URL — falls back to initials. */
export const ImageError: Story = {
  args: {
    src: 'https://this-url-does-not-exist.example/broken.jpg',
    fallback: 'ER',
    alt: 'Broken image',
  },
};

/** Three sizes side-by-side. */
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
    </div>
  ),
};

/** All three shapes side-by-side. */
export const Shapes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {(['circular', 'rounded', 'square'] as const).map((shape) => (
        <div key={shape} style={{ textAlign: 'center' }}>
          <Avatar {...args} shape={shape} />
          <p style={{ fontSize: 11, marginTop: 6, color: '#888' }}>{shape}</p>
        </div>
      ))}
    </div>
  ),
};

/** All four status indicator positions. */
export const StatusPositions: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      {(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const).map(
        (pos) => (
          <div key={pos} style={{ textAlign: 'center' }}>
            <Avatar
              {...args}
              statusIndicator={<StatusDot color="#22c55e" />}
              statusPosition={pos}
            />
            <p style={{ fontSize: 11, marginTop: 6, color: '#888' }}>{pos}</p>
          </div>
        )
      )}
    </div>
  ),
};

/** Common status colours mapped to semantic meaning. */
export const StatusColors: Story = {
  render: (args) => {
    const statuses = [
      { color: '#22c55e', label: 'Online' },
      { color: '#f59e0b', label: 'Away' },
      { color: '#ef4444', label: 'Busy' },
      { color: '#94a3b8', label: 'Offline' },
    ];
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {statuses.map(({ color, label }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <Avatar
              {...args}
              statusIndicator={<StatusDot color={color} />}
              statusPosition="bottom-right"
            />
            <p style={{ fontSize: 11, marginTop: 6, color: '#888' }}>{label}</p>
          </div>
        ))}
      </div>
    );
  },
};

/** Small size. */
export const Small: Story = {
  args: { size: 'sm' },
};

/** Large size. */
export const Large: Story = {
  args: { size: 'lg' },
};

/** Circular shape (fully round). */
export const Circular: Story = {
  args: { shape: 'circular' },
};

/** Rounded shape (soft corners). */
export const Rounded: Story = {
  args: { shape: 'rounded' },
};

/** Square shape (no border radius). */
export const Square: Story = {
  args: { shape: 'square' },
};

/** A group of avatars showing a typical user list. */
export const AvatarGroup: Story = {
  render: () => {
    const users = [
      { src: 'https://i.pravatar.cc/150?img=1', fallback: 'A1', alt: 'User 1' },
      { src: 'https://i.pravatar.cc/150?img=2', fallback: 'A2', alt: 'User 2' },
      { src: 'https://i.pravatar.cc/150?img=3', fallback: 'A3', alt: 'User 3' },
      { src: undefined, fallback: 'JD', alt: 'Jane Doe' },
      { src: undefined, fallback: '?', alt: 'Unknown user' },
    ];
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {users.map((u, i) => (
          <div key={i} style={{ marginLeft: i === 0 ? 0 : -10 }}>
            <Avatar
              src={u.src}
              fallback={u.fallback}
              alt={u.alt}
              size="md"
              shape="circular"
              style={{ border: '2px solid white' }}
            />
          </div>
        ))}
      </div>
    );
  },
};
