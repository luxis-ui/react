import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Box, ThemeProvider } from '@luxis-ui/react';

const meta: Meta<typeof Box> = {
  title: 'Components/Box',
  component: Box,
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
          'Box is a flexible layout primitive that renders as any HTML element.',
          '',
          '**Enum-valued props** (`display`, `position`, `overflow`, `shadow`, `flexDirection`, `justifyContent`, `alignItems`, `flexWrap`, `textAlign`) map to CSS utility classes — zero runtime style cost.',
          '',
          '**Arbitrary-value props** (`bg`, `color`, `w`, `h`, spacing, `border`, `gap`, …) are applied as inline styles.',
          '',
          '**Anything else** — pass via the native `style` or `className` props.',
          '',
          '```tsx',
          '// Flex row centered',
          '<Box display="flex" justifyContent="space-between" alignItems="center" gap={16}>',
          '  <Box>Left</Box>',
          '  <Box>Right</Box>',
          '</Box>',
          '```',
          '',
          '```tsx',
          '// Card',
          '<Box bg="#fff" p={24} borderRadius={12} shadow="md" maxW={400}>',
          '  Content',
          '</Box>',
          '```',
          '',
          '```tsx',
          '// Semantic HTML',
          '<Box as="section" py={32}>',
          '  <Box as="header" mb={16}>Heading</Box>',
          '  <Box as="article">Body</Box>',
          '</Box>',
          '```',
        ].join('\n'),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'aside', 'main', 'header', 'footer', 'nav', 'span'],
      description: 'HTML element to render as',
    },
    display: {
      control: 'select',
      options: ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid', 'none'],
      description: 'CSS display property',
    },
    position: {
      control: 'select',
      options: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
      description: 'CSS position property',
    },
    overflow: {
      control: 'select',
      options: ['visible', 'hidden', 'scroll', 'auto'],
      description: 'CSS overflow property',
    },
    flexDirection: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      description: '`flex-direction` — **requires `display="flex"` or `display="inline-flex"`**',
    },
    justifyContent: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      description: '`justify-content` — **requires `display="flex"` or `display="grid"`**',
    },
    alignItems: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
      description: '`align-items` — **requires `display="flex"` or `display="grid"`**',
    },
    flexWrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: '`flex-wrap` — **requires `display="flex"`**',
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'text-align',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Box shadow preset',
    },
    bg: { control: 'color', description: 'Background color' },
    color: { control: 'color', description: 'Text color' },
    w: { control: 'text', description: 'Width (e.g. 200, "50%")' },
    h: { control: 'text', description: 'Height (e.g. 100, "2rem")' },
    p: { control: 'text', description: 'Padding all sides (e.g. 16, "1rem")' },
    px: { control: 'text', description: 'Padding left + right' },
    py: { control: 'text', description: 'Padding top + bottom' },
    m: { control: 'text', description: 'Margin all sides' },
    mx: { control: 'text', description: 'Margin left + right' },
    my: { control: 'text', description: 'Margin top + bottom' },
    gap: { control: 'text', description: 'Gap between flex/grid children (e.g. 8, "1rem")' },
    border: { control: 'text', description: 'Border shorthand (e.g. "1px solid #ccc", 1)' },
    borderColor: { control: 'color', description: 'Border color override' },
    borderRadius: { control: 'text', description: 'Border radius (e.g. 8, "50%")' },
    opacity: { control: 'number', description: 'Opacity 0–1' },
    zIndex: { control: 'number', description: 'z-index' },
    children: { control: 'text', description: 'Box content' },
  },
  args: {
    as: 'div',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'static',
    bg: '#f8fafc',
    color: '#222',
    w: '240px',
    h: '120px',
    p: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    shadow: 'none',
    children: 'Box content',
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

// ─── Stories ────────────────────────────────────────────────────────────────

/** Fully interactive: tweak every prop from the Controls panel. */
export const Playground: Story = {};

/** Different HTML elements. */
export const AsElements: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['div', 'section', 'article', 'aside', 'main', 'header', 'footer', 'nav', 'span'] as const).map((el) => (
        <Box key={el} {...args} as={el}>
          {`as="${el}"`}
        </Box>
      ))}
    </div>
  ),
};

/** Display types. */
export const DisplayTypes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid'] as const).map((d) => (
        <Box key={d} {...args} display={d}>
          {d}
        </Box>
      ))}
    </div>
  ),
};

/** Spacing and background. */
export const SpacingAndBg: Story = {
  render: () => (
    <Box bg="#e0e7ef" p={32} m={8} borderRadius={16} color="#222">
      <Box bg="#fff" p={16} borderRadius={8} shadow="md">
        Nested Box
      </Box>
    </Box>
  ),
};

/** Flex layout with alignment props (all via CSS classes). */
export const FlexLayout: Story = {
  render: () => (
    <Box display="flex" justifyContent="space-between" alignItems="center" gap={16} p={16} bg="#f1f5f9" borderRadius={12}>
      <Box bg="#bae6fd" p={12} borderRadius={8}>Item 1</Box>
      <Box bg="#fca5a5" p={12} borderRadius={8}>Item 2</Box>
      <Box bg="#bbf7d0" p={12} borderRadius={8}>Item 3</Box>
    </Box>
  ),
};

/** Flex column with wrap. */
export const FlexWrap: Story = {
  render: () => (
    <Box display="flex" flexWrap="wrap" gap={12} p={16} bg="#f1f5f9" borderRadius={12} w={260}>
      {['A', 'B', 'C', 'D', 'E', 'F'].map((l) => (
        <Box key={l} bg="#818cf8" color="#fff" p={12} borderRadius={8}>{l}</Box>
      ))}
    </Box>
  ),
};

/** Text alignment. */
export const TextAlignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {(['left', 'center', 'right'] as const).map((align) => (
        <Box key={align} textAlign={align} bg="#f1f5f9" p={12} borderRadius={8}>
          textAlign="{align}"
        </Box>
      ))}
    </div>
  ),
};

/** Shadow presets. */
export const Shadows: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: 16 }}>
      {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <Box key={s} shadow={s} bg="#fff" p={20} borderRadius={10}>
          shadow="{s}"
        </Box>
      ))}
    </div>
  ),
};

/** Custom border. */
export const CustomBorder: Story = {
  render: () => (
    <Box p={24} borderRadius={16} border="2px solid #6366f1" borderColor="#6366f1" bg="#fff">
      Custom border with borderColor
    </Box>
  ),
};
