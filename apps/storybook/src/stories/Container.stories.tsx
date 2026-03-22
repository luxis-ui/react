import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Container, ThemeProvider } from '@luxis-ui/react';

// ── Demo helpers (purely presentational, no inline styles on Container) ──────

const SectionBlock = ({ label, color = 'var(--lxs-color-primary-100)' }: { label: string; color?: string }) => (
  <div
    style={{
      background: color,
      border: '1px dashed var(--lxs-color-primary-300)',
      borderRadius: '6px',
      padding: '1rem',
      textAlign: 'center',
      fontSize: '0.875rem',
      color: 'var(--lxs-color-primary-700)',
      fontFamily: 'var(--lxs-font-family-sans)',
    }}
  >
    {label}
  </div>
);

const ContentRow = () => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <SectionBlock label="Column A" />
    <SectionBlock label="Column B" />
    <SectionBlock label="Column C" />
  </div>
);

const Ruler = () => (
  <div
    style={{
      width: '100%',
      background: 'var(--lxs-color-neutral-100)',
      border: '1px solid var(--lxs-color-neutral-300)',
      borderRadius: '4px',
      padding: '0.5rem 1rem',
      fontSize: '0.75rem',
      color: 'var(--lxs-color-neutral-600)',
      fontFamily: 'var(--lxs-font-family-sans)',
      textAlign: 'center',
    }}
  >
    ← container width →
  </div>
);

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Container> = {
  title: 'Components/Container',
  component: Container,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'aside', 'main', 'header', 'footer', 'nav'],
      description: 'Underlying HTML element',
    },
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'full', 'none', 'responsive'],
      description:
        'Maximum width. `responsive` steps up at each breakpoint (like Bootstrap `.container`).',
    },
    fluid: {
      control: 'boolean',
      description: 'Full viewport width. Overrides `maxWidth`.',
    },
    gutter: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Horizontal padding. `md` and `lg` grow at wider screens.',
    },
    centered: {
      control: 'boolean',
      description: 'Center the container horizontally with `margin: auto`.',
    },
  },
  args: {
    as: 'div',
    maxWidth: 'responsive',
    fluid: false,
    gutter: 'md',
    centered: true,
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

// ── Default (playground) ──────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <Container {...args}>
      <Ruler />
      <ContentRow />
    </Container>
  ),
};

// ── Max-width variants ────────────────────────────────────────────────────────

export const MaxWidths: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const).map((mw) => (
        <Container key={mw} maxWidth={mw} gutter="md">
          <SectionBlock label={`maxWidth="${mw}"`} />
        </Container>
      ))}
    </div>
  ),
  parameters: { layout: 'fullscreen' },
};

// ── Responsive (default behaviour) ───────────────────────────────────────────

export const Responsive: Story = {
  render: () => (
    <Container maxWidth="responsive" gutter="md">
      <SectionBlock label='maxWidth="responsive" — resize the window to see it step up' />
    </Container>
  ),
  parameters: { layout: 'fullscreen' },
};

// ── Fluid ─────────────────────────────────────────────────────────────────────

export const Fluid: Story = {
  render: () => (
    <Container fluid gutter="md">
      <SectionBlock label='fluid — always 100% width' color="var(--lxs-color-success-50)" />
    </Container>
  ),
  parameters: { layout: 'fullscreen' },
};

// ── Gutter variants ───────────────────────────────────────────────────────────

export const Gutters: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0' }}>
      {(['none', 'sm', 'md', 'lg'] as const).map((g) => (
        <Container key={g} maxWidth="lg" gutter={g}>
          <SectionBlock label={`gutter="${g}"`} />
        </Container>
      ))}
    </div>
  ),
  parameters: { layout: 'fullscreen' },
};

// ── Semantic elements ─────────────────────────────────────────────────────────

export const SemanticElements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Container as="header" maxWidth="xl" gutter="md">
        <SectionBlock label='as="header"' color="var(--lxs-color-primary-50)" />
      </Container>
      <Container as="main" maxWidth="xl" gutter="md">
        <SectionBlock label='as="main"' color="var(--lxs-color-secondary-100)" />
      </Container>
      <Container as="section" maxWidth="xl" gutter="md">
        <SectionBlock label='as="section"' color="var(--lxs-color-success-50)" />
      </Container>
      <Container as="footer" maxWidth="xl" gutter="md">
        <SectionBlock label='as="footer"' color="var(--lxs-color-neutral-100)" />
      </Container>
    </div>
  ),
  parameters: { layout: 'fullscreen' },
};

// ── Uncenter ─────────────────────────────────────────────────────────────────

export const NotCentered: Story = {
  render: () => (
    <Container maxWidth="md" gutter="md" centered={false}>
      <SectionBlock label='centered={false} — aligned to the left' />
    </Container>
  ),
  parameters: { layout: 'fullscreen' },
};

// ── Full page layout (real-world) ─────────────────────────────────────────────

export const PageLayout: Story = {
  name: 'Page Layout (Real-world)',
  render: () => (
    <div>
      {/* Hero — always full width */}
      <Container as="header" fluid gutter="none">
        <div
          style={{
            background: 'var(--lxs-color-primary-600)',
            color: '#fff',
            padding: '3rem 2rem',
            textAlign: 'center',
            fontFamily: 'var(--lxs-font-family-sans)',
          }}
        >
          <h1 style={{ margin: 0, fontSize: '2rem' }}>Hero Banner</h1>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.8 }}>Container fluid — spans full width</p>
        </div>
      </Container>

      {/* Main content area — capped width */}
      <Container as="main" maxWidth="xl" gutter="lg">
        <div style={{ padding: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <SectionBlock label="Content area — maxWidth xl, large gutters" />
          <ContentRow />
        </div>
      </Container>

      {/* Footer — responsive */}
      <Container as="footer" maxWidth="responsive" gutter="md">
        <SectionBlock label="Footer — responsive container" color="var(--lxs-color-neutral-100)" />
      </Container>
    </div>
  ),
  parameters: { layout: 'fullscreen' },
};
