import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkeletonTheme } from '@luxis-ui/react';

const meta: Meta<typeof SkeletonTheme> = {
  title: 'Components/SkeletonTheme',
  component: SkeletonTheme,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: [
        'card', 'product', 'article', 'blog-post', 'profile', 'comment',
        'list-item', 'table-row', 'form', 'hero', 'about-section',
        'feature-card', 'testimonial', 'pricing-card', 'stats', 'team-member',
        'gallery-item', 'video-card', 'order-card', 'order-confirmation',
        'order-details', 'product-grid', 'content-block', 'cart-list',
        'home-page', 'checkout',
      ],
      description: 'Pre-built layout theme for common content types',
    },
    animation: {
      control: 'select',
      options: ['wave', 'pulse', 'none'],
      description: 'Animation style',
    },
    count: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of items to render (for list/grid themes)',
    },
  },
  args: {
    theme: 'card',
    animation: 'wave',
    count: 1,
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonTheme>;

export const Card: Story = {
  args: { theme: 'card' },
};

export const Product: Story = {
  args: { theme: 'product' },
};

export const Article: Story = {
  args: { theme: 'article' },
};

export const Profile: Story = {
  args: { theme: 'profile' },
};

export const BlogPost: Story = {
  args: { theme: 'blog-post' },
};

export const Comment: Story = {
  args: { theme: 'comment', count: 3 },
};

export const ListItem: Story = {
  args: { theme: 'list-item', count: 4 },
};

export const Form: Story = {
  args: { theme: 'form' },
};

export const Hero: Story = {
  args: { theme: 'hero' },
};

export const Stats: Story = {
  args: { theme: 'stats' },
};

export const PricingCard: Story = {
  args: { theme: 'pricing-card', count: 3 },
};

export const ProductGrid: Story = {
  args: { theme: 'product-grid', count: 6 },
};

export const OrderCard: Story = {
  args: { theme: 'order-card' },
};

export const Checkout: Story = {
  args: { theme: 'checkout' },
};
