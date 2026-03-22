import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { ActivityFeed, ThemeProvider, Button, UserIcon, ShoppingBagIcon, ServerIcon, CheckCircleIcon, ErrorIcon } from '@luxis-ui/react';

const meta: Meta<typeof ActivityFeed> = {
  title: 'Widgets/ActivityFeed',
  component: ActivityFeed,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the feed widget',
    },
    withCard: {
      control: 'boolean',
      description: 'Render inside a card container',
    },
    emptyMessage: {
      control: 'text',
      description: 'Custom message when there are no items',
    },
    maxItems: {
      control: 'number',
      description: 'Max items to display before hiding the rest',
    },
  },
  args: {
    title: 'Recent Activity',
    withCard: true,
    emptyMessage: 'No recent activity',
  },
};

export default meta;
type Story = StoryObj<typeof ActivityFeed>;

const SAMPLE_DATA = [
  {
    id: 1,
    title: 'New user registered',
    time: '2 mins ago',
    description: 'Alice Freeman (alice@example.com) joined the platform.',
    icon: <UserIcon />,
    status: 'info' as const,
  },
  {
    id: 2,
    title: 'Subscription upgraded',
    time: '1 hour ago',
    description: 'Acme Corp upgraded to the Enterprise plan.',
    icon: <CheckCircleIcon />,
    status: 'success' as const,
  },
  {
    id: 3,
    title: 'New purchase',
    time: '3 hours ago',
    description: 'Order #10293 for $499.00 was completed.',
    icon: <ShoppingBagIcon />,
    status: 'primary' as const,
  },
  {
    id: 4,
    title: 'Server downtime',
    time: 'Yesterday',
    description: 'API node 3 experienced 5 minutes of downtime.',
    icon: <ErrorIcon />,
    status: 'error' as const,
  },
  {
    id: 5,
    title: 'System update',
    time: '2 days ago',
    description: 'Deployed version 2.4.1 to production.',
    icon: <ServerIcon />,
    status: 'neutral' as const,
  },
];

export const Standard: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 500 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    items: SAMPLE_DATA,
    headerAction: <Button variant="ghost" size="sm">View All</Button>,
  },
};

export const WithoutCard: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 500, padding: '20px 0' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'Audit Log',
    withCard: false,
    items: SAMPLE_DATA.slice(0, 3),
  },
};

export const EmptyState: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 500 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'Notifications',
    items: [],
    emptyMessage: "You're all caught up!",
  },
};
