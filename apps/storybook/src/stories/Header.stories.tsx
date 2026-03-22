import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Header, ThemeProvider, Button, Badge } from '@luxis-ui/react';
import React from 'react';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    logo: { control: false, description: 'Logo element' },
    title: { control: 'text', description: 'Title text' },
    showToggle: { control: 'boolean', description: 'Show sidebar toggle' },
    notifications: { control: false, description: 'Notifications list' },
    userName: { control: 'text', description: 'User name' },
    userSubtitle: { control: 'text', description: 'User subtitle' },
    userAvatar: { control: 'text', description: 'User avatar URL' },
    userMenuItems: { control: false, description: 'User menu items' },
    actions: { control: false, description: 'Custom actions' },
    className: { control: false, description: 'Custom class name' },
    sticky: { control: 'boolean', description: 'Sticky header' },
  },
  args: {
    title: 'Dashboard',
    showToggle: true,
    sticky: true,
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

const notifications = [
  { id: '1', title: 'New message', time: '2m ago', type: 'info' },
  { id: '2', title: 'Server restarted', time: '10m ago', type: 'success' },
  { id: '3', title: 'Payment failed', time: '1h ago', type: 'error' },
];

const userMenuItems = [
  { label: 'Profile' },
  { label: 'Settings' },
  { label: 'Logout', variant: 'danger', divider: true },
];

export const Default: Story = {
  render: (args) => (
    <ThemeProvider>
      <Header {...args} />
    </ThemeProvider>
  ),
  args: {
    title: 'Dashboard',
    userName: 'Jane Doe',
    userSubtitle: 'Admin',
    userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    notifications,
    userMenuItems,
  },
};

export const WithLogo: Story = {
  render: (args) => (
    <ThemeProvider>
      <Header {...args} logo={<img src="/logo192.png" alt="Logo" style={{ height: 32 }} />} />
    </ThemeProvider>
  ),
  args: {
    title: 'With Logo',
  },
};

export const WithActions: Story = {
  render: (args) => (
    <ThemeProvider>
      <Header {...args} actions={<Button variant="primary">New Item</Button>} />
    </ThemeProvider>
  ),
  args: {
    title: 'With Actions',
  },
};

export const NoToggle: Story = {
  render: (args) => (
    <ThemeProvider>
      <Header {...args} showToggle={false} />
    </ThemeProvider>
  ),
  args: {
    title: 'No Sidebar Toggle',
  },
};

export const StickyOff: Story = {
  render: (args) => (
    <ThemeProvider>
      <Header {...args} sticky={false} />
    </ThemeProvider>
  ),
  args: {
    title: 'Not Sticky',
  },
};
