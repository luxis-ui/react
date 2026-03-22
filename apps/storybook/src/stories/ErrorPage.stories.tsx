import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { ErrorPage, ThemeProvider } from '@luxis-ui/react';

const meta: Meta<typeof ErrorPage> = {
  title: 'Widgets/ErrorPage',
  component: ErrorPage,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['minimal', 'modern', 'professional', 'playful', 'technical', 'elegant', 'illustrated', 'full-page', 'split', 'card', 'embedded'],
      description: 'Visual layout style',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
      description: 'Semantic color variant',
    },
    mode: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Light or dark mode',
    },
    centered: {
      control: 'boolean',
      description: 'Center alignment',
    },
    fullHeight: {
      control: 'boolean',
      description: 'Fill 100vh height',
    },
  },
  decorators: [
    (Story, context) => (
      <ThemeProvider>
        <div style={{ padding: '20px', minHeight: '400px', backgroundColor: context.args.mode === 'dark' ? '#171717' : '#fafafa' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ErrorPage>;

export const DefaultAutoContent404: Story = {
  args: {
    statusCode: 404,
    variant: 'primary',
    theme: 'modern',
    actions: [
      { label: 'Go Home', href: '/', icon: 'home' },
    ],
  },
};

export const TechnicalTheme500: Story = {
  args: {
    statusCode: 500,
    variant: 'error',
    theme: 'technical',
    additionalInfo: 'Trace ID: 39a-bd91-4cf1-80a9\nHost: us-west-2-c\nTimestamp: 2023-10-23T14:48:00Z',
    actions: [
      { label: 'Retry request', icon: 'refresh', onClick: () => alert('Retrying...') },
    ],
  },
};

export const ProfessionalTheme403: Story = {
  args: {
    statusCode: 403,
    variant: 'warning',
    theme: 'professional',
    actions: [
      { label: 'Request Access', onClick: () => alert('Requesting access...') },
      { label: 'Go Back', icon: 'back', variant: 'outline', onClick: () => alert('Going back...') },
    ],
  },
};

export const PlayfulThemeSearch: Story = {
  args: {
    statusCode: 'search',
    variant: 'info',
    theme: 'playful',
    actions: [
      { label: 'Browse All Categories', href: '/categories' },
    ],
  },
};

export const ElegantTheme503: Story = {
  args: {
    statusCode: 503,
    variant: 'neutral',
    theme: 'elegant',
  },
};

export const LeftAlignedEmbedded: Story = {
  args: {
    title: 'Failed to load widget',
    description: 'We could not fetch the latest metrics.',
    variant: 'warning',
    theme: 'embedded',
    centered: false,
    showIllustration: false,
    additionalInfo: 'Check your network connection and reload the page.',
    actions: [
      { label: 'Retry', onClick: () => alert('Retrying fetch...') },
    ],
  },
};

export const SplitLayout: Story = {
  args: {
    statusCode: 'OOPS',
    title: 'Something went wrong',
    description: 'We couldn’t complete your request. Our team has been notified.',
    variant: 'primary',
    theme: 'split',
    illustration: (
      <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    actions: [
      { label: 'Return to Dashboard', onClick: () => alert('Returning...') },
    ],
  },
};
