import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Flex, ThemeProvider } from '@luxis-ui/react';

const meta: Meta<typeof Flex> = {
  title: 'Components/Flex',
  component: Flex,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ minHeight: 200 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Flex is a convenience wrapper around Box for flexbox layouts.',
          '',
          'It uses **shorthand prop names** (`justify`, `align`, `direction`, `wrap`) that map to full CSS values.',
          '',
          '| Prop | Maps to | Shorthand values |',
          '|------|---------|-----------------|',
          '| `justify` | `justify-content` | `start` `end` `center` `between` `around` `evenly` |',
          '| `align` | `align-items` | `start` `end` `center` `baseline` `stretch` |',
          '| `direction` | `flex-direction` | `row` `column` `row-reverse` `column-reverse` |',
          '| `wrap` | `flex-wrap` | `nowrap` `wrap` `wrap-reverse` |',
          '',
          '```tsx',
          '// Centered row',
          '<Flex justify="center" align="center" gap={16}>',
          '  <div>A</div>',
          '  <div>B</div>',
          '</Flex>',
          '```',
          '',
          '```tsx',
          '// Centered column',
          '<Flex direction="column" justify="center" align="center" gap={8}>',
          '  <h1>Title</h1>',
          '  <p>Content</p>',
          '</Flex>',
          '```',
        ].join('\n'),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
      description: '`flex-direction`',
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
      description: '`justify-content` — shorthand (`start`→`flex-start`, `between`→`space-between`, …)',
    },
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'baseline', 'stretch'],
      description: '`align-items` — shorthand (`start`→`flex-start`, …)',
    },
    alignContent: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'stretch'],
      description: '`align-content` for multi-line flex containers',
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: '`flex-wrap`',
    },
    gap: { control: 'text', description: 'Gap between items (number → px or CSS string)' },
    rowGap: { control: 'text', description: 'Row gap override' },
    columnGap: { control: 'text', description: 'Column gap override' },
    inline: { control: 'boolean', description: 'Render as `inline-flex` instead of `flex`' },
    fullWidth: { control: 'boolean', description: 'Stretch to 100% width' },
    grow: { control: 'number', description: '`flex-grow`' },
    shrink: { control: 'number', description: '`flex-shrink`' },
    basis: { control: 'text', description: '`flex-basis` (number → px or CSS string)' },
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'aside', 'header', 'footer', 'nav', 'main'],
      description: 'HTML element to render as',
    },
    children: { control: 'text', description: 'Content' },
  },
  args: {
    direction: 'row',
    justify: 'start',
    align: 'stretch',
    wrap: 'nowrap',
    gap: 16,
    inline: false,
    fullWidth: false,
    as: 'div',
  },
};

export default meta;
type Story = StoryObj<typeof Flex>;

// ─── Stories ────────────────────────────────────────────────────────────────

const Item = ({ children, bg = '#bae6fd' }: { children: React.ReactNode; bg?: string }) => (
  <div style={{ background: bg, padding: '10px 18px', borderRadius: 8, fontSize: 14 }}>
    {children}
  </div>
);

/** Fully interactive — tweak every prop from the Controls panel. */
export const Playground: Story = {
  render: (args: React.ComponentProps<typeof Flex>) => (
    <Flex {...args} style={{ minHeight: 80, background: '#f1f5f9', borderRadius: 12, padding: 16 }}>
      <Item>Item 1</Item>
      <Item bg="#fca5a5">Item 2</Item>
      <Item bg="#bbf7d0">Item 3</Item>
    </Flex>
  ),
};

/** Default row — items laid out left-to-right with a gap. */
export const Row: Story = {
  render: () => (
    <Flex gap={16} style={{ background: '#f1f5f9', borderRadius: 12, padding: 16 }}>
      <Item>Item 1</Item>
      <Item bg="#fca5a5">Item 2</Item>
      <Item bg="#bbf7d0">Item 3</Item>
    </Flex>
  ),
};

/** Column direction — items stacked vertically. */
export const Column: Story = {
  render: () => (
    <Flex direction="column" gap={12} style={{ background: '#f1f5f9', borderRadius: 12, padding: 16, width: 200 }}>
      <Item>Item 1</Item>
      <Item bg="#fca5a5">Item 2</Item>
      <Item bg="#bbf7d0">Item 3</Item>
    </Flex>
  ),
};

/** Centered — both axes centered. */
export const Centered: Story = {
  render: () => (
    <Flex
      justify="center"
      align="center"
      gap={16}
      style={{ background: '#f1f5f9', borderRadius: 12, padding: 32, minHeight: 120 }}
    >
      <Item>Left</Item>
      <Item bg="#fca5a5">Center</Item>
      <Item bg="#bbf7d0">Right</Item>
    </Flex>
  ),
};

/** Space between — items pushed to edges. */
export const SpaceBetween: Story = {
  render: () => (
    <Flex
      justify="between"
      align="center"
      fullWidth
      style={{ background: '#f1f5f9', borderRadius: 12, padding: 16 }}
    >
      <Item>Logo</Item>
      <Item bg="#fca5a5">Nav</Item>
      <Item bg="#bbf7d0">Actions</Item>
    </Flex>
  ),
};

/** Wrap — items wrap onto multiple lines when space runs out. */
export const Wrap: Story = {
  render: () => (
    <Flex
      wrap="wrap"
      gap={12}
      style={{ background: '#f1f5f9', borderRadius: 12, padding: 16, width: 280 }}
    >
      {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((l) => (
        <Item key={l} bg="#818cf8">
          <span style={{ color: '#fff' }}>{l}</span>
        </Item>
      ))}
    </Flex>
  ),
};

/** Inline flex — shrinks to content width, sits inline with siblings. */
export const Inline: Story = {
  render: () => (
    <div>
      <span>Before </span>
      <Flex inline gap={8} align="center">
        <Item>A</Item>
        <Item bg="#fca5a5">B</Item>
      </Flex>
      <span> After</span>
    </div>
  ),
};

/** Column-reverse — items stacked bottom to top. */
export const ColumnReverse: Story = {
  render: () => (
    <Flex
      direction="column-reverse"
      gap={12}
      style={{ background: '#f1f5f9', borderRadius: 12, padding: 16, width: 200 }}
    >
      <Item>First (renders last)</Item>
      <Item bg="#fca5a5">Middle</Item>
      <Item bg="#bbf7d0">Last (renders first)</Item>
    </Flex>
  ),
};
