import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { PricingCard, ThemeProvider } from '@luxis-ui/react';

const meta: Meta<typeof PricingCard> = {
  title: 'Widgets/PricingCard',
  component: PricingCard,
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
    tierName: {
      control: 'text',
      description: 'Name of the pricing tier (e.g. "Pro", "Enterprise")',
    },
    price: {
      control: 'text',
      description: 'Numeric price or string',
    },
    currency: {
      control: 'text',
      description: 'Currency symbol (e.g. "$", "€")',
    },
    interval: {
      control: 'text',
      description: 'Billing interval (e.g. "/mo", "/year")',
    },
    description: {
      control: 'text',
      description: 'Short description of the tier\'s target audience',
    },
    buttonLabel: {
      control: 'text',
      description: 'Label for the main CTA button',
    },
    highlight: {
      control: 'text',
      description: 'Highlights the card visually (e.g. "Most Popular")',
    },
    badge: {
      control: 'text',
      description: 'Additional top label, e.g. "Save 20%"',
    },
    theme: {
      control: 'select',
      options: ['standard', 'compact', 'modern'],
      description: 'Theme for layout',
    },
    withCard: {
      control: 'boolean',
      description: 'Render inside a standard card shell',
    },
  },
  args: {
    currency: '$',
    interval: '/mo',
    theme: 'standard',
    withCard: true,
  },
};

export default meta;
type Story = StoryObj<typeof PricingCard>;

const basicFeatures = [
  { name: '10 Users' },
  { name: '2GB Storage' },
  { name: 'Community Support' },
  { name: 'Custom Domain', included: false },
  { name: 'Analytics', included: false },
];

const proFeatures = [
  { name: 'Unlimited Users' },
  { name: '50GB Storage' },
  { name: 'Priority Support' },
  { name: 'Custom Domain' },
  { name: 'Advanced Analytics' },
];

export const Basic: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 350 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    tierName: 'Hobby',
    price: 0,
    description: 'Perfect for side projects and learning.',
    features: basicFeatures,
    buttonLabel: 'Start for free',
    onButtonClick: () => alert('Start Hobby'),
  },
};

export const Highlighted: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 350 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    tierName: 'Pro',
    price: 29,
    interval: '/mo',
    description: 'Everything you need for a growing business.',
    features: proFeatures,
    buttonLabel: 'Get Started',
    highlight: 'Most Popular',
    badge: 'Save 20%',
    onButtonClick: () => alert('Start Pro'),
  },
};

export const CustomPriceString: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 350 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    tierName: 'Enterprise',
    price: 'Custom',
    description: 'Dedicated support and infrastructure.',
    features: proFeatures.map((f) => ({ name: f.name + ' + Extra' })),
    buttonLabel: 'Contact Sales',
    onButtonClick: () => alert('Contact Sales'),
  },
};
