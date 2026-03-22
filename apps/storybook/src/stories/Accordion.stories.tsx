import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Accordion, ThemeProvider } from '@luxis-ui/react';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
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
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'separated', 'flush'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    spacing: {
      control: 'select',
      options: ['compact', 'default', 'spacious'],
      description: 'Spacing between items',
    },
    iconType: {
      control: 'select',
      options: ['chevron', 'plus-minus'],
      description: 'Icon style for expand/collapse',
    },
    chevronPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Position of the chevron icon',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple items open at once',
    },
    collapsible: {
      control: 'boolean',
      description: 'Allow all items to be collapsed',
    },
    showChevron: {
      control: 'boolean',
      description: 'Show or hide chevron icons',
    },
    showDivider: {
      control: 'boolean',
      description: 'Show divider lines between items',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all accordion interactions',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    disableAnimations: {
      control: 'boolean',
      description: 'Disable animations',
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    spacing: 'default',
    iconType: 'chevron',
    chevronPosition: 'right',
    allowMultiple: false,
    collapsible: true,
    showChevron: true,
    showDivider: true,
    disabled: false,
    loading: false,
    disableAnimations: false,
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const defaultItems = [
  {
    id: 'item1',
    header: 'What is Luxis UI?',
    children: (
      <p>Luxis UI is a modern React component library with full TypeScript support, dark mode, and accessible components built for enterprise applications.</p>
    ),
  },
  {
    id: 'item2',
    header: 'How do I install it?',
    children: (
      <p>Install via pnpm: <code>pnpm add @luxis-ui/react</code>. Then import the base CSS and use any component.</p>
    ),
  },
  {
    id: 'item3',
    header: 'Does it support dark mode?',
    children: (
      <p>Yes! Add <code>data-theme="dark"</code> to your root element, or use the built-in ThemeProvider to switch themes programmatically.</p>
    ),
  },
  {
    id: 'item4',
    header: 'Is it accessible?',
    children: (
      <p>All components follow WAI-ARIA guidelines. The accordion uses proper roles, keyboard navigation (Enter/Space), and focus management.</p>
    ),
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

export const Bordered: Story = {
  args: {
    items: defaultItems,
    variant: 'bordered',
  },
};

export const Separated: Story = {
  args: {
    items: defaultItems,
    variant: 'separated',
  },
};

export const Flush: Story = {
  args: {
    items: defaultItems,
    variant: 'flush',
  },
};

export const AllowMultiple: Story = {
  args: {
    items: defaultItems,
    allowMultiple: true,
    defaultOpenItems: ['item1', 'item2'],
  },
};

export const PlusMinus: Story = {
  args: {
    items: defaultItems,
    iconType: 'plus-minus',
  },
};

export const SmallSize: Story = {
  args: {
    items: defaultItems,
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    items: defaultItems,
    size: 'lg',
  },
};

export const Compact: Story = {
  args: {
    items: defaultItems,
    spacing: 'compact',
  },
};

export const Disabled: Story = {
  args: {
    items: defaultItems,
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    items: defaultItems,
    loading: true,
  },
};

export const ChevronLeft: Story = {
  args: {
    items: defaultItems,
    chevronPosition: 'left',
  },
};

