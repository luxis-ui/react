import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { MetricCard, ThemeProvider } from '@luxis-ui/react';

// ─── Inline icons ────────────────────────────────────────────────────────────

const DollarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const ServerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

const ShoppingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

// ─── Layout helpers ───────────────────────────────────────────────────────────

const CardColumn = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: 300 }}>{children}</div>
);

const CardGrid = ({ children, cols = 3 }: { children: React.ReactNode; cols?: number }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, minmax(200px, 1fr))`,
      gap: '1rem',
    }}
  >
    {children}
  </div>
);

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof MetricCard> = {
  title: 'Widgets/MetricCard',
  component: MetricCard,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['minimal', 'modern', 'glass', 'gradient', 'filled', 'inline', 'centered', 'surface', 'enterprise', 'compact', 'trend'],
      description: 'Visual layout / design style',
      table: { defaultValue: { summary: 'modern' } },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Semantic color variant from ThemeProvider',
      table: { defaultValue: { summary: 'primary' } },
    },
    mode: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Light / dark surface mode',
      table: { defaultValue: { summary: 'light' } },
    },
    color: {
      control: 'color',
      description: 'Text color override — any valid CSS color value',
    },
    appearance: {
      control: 'object',
      description:
        'Per-element typography overrides. ' +
        'E.g. { titleVariant: "h6", valueVariant: "h2", descriptionVariant: "body2" }',
    },
    trend: {
      control: 'radio',
      options: ['up', 'down', 'neutral'],
    },
    change: {
      control: { type: 'number', step: 0.1 },
      description: 'Percentage change (e.g. 12.5 → +12.5%)',
    },
    title: { control: 'text' },
    value: { control: 'text' },
    description: { control: 'text' },
    loading: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    accentColor: {
      control: 'color',
      description: 'Raw CSS accent override — prefer `variant` for theme colors',
    },
    icon: { control: false },
  },
  args: {
    title: 'Total Revenue',
    value: '$48,295',
    change: 12.5,
    trend: 'up',
    description: 'vs last month',
    theme: 'modern',
    variant: 'primary',
    mode: 'light',
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <CardColumn>
      <MetricCard {...args} icon={<DollarIcon />} />
    </CardColumn>
  ),
};

// ─── All Themes ───────────────────────────────────────────────────────────────

export const AllThemes: Story = {
  render: () => (
    <CardGrid cols={4}>
      <MetricCard theme="minimal"    title="Total Revenue"    value="$48,295"  change={12.5}  trend="up"   description="vs last month" />
      <MetricCard theme="modern"     title="Active Users"     value="24,819"   change={8.3}   trend="up"   icon={<UsersIcon />}  description="vs last month" />
      <MetricCard theme="enterprise" title="API Latency"      value="142 ms"   change={-18.2} trend="up"   icon={<ServerIcon />} description="P95 · us-east-1" variant="warning" />
      <MetricCard theme="compact"    title="Conversion Rate"  value="4.28%"    change={21.7}  trend="up"   icon={<ChartIcon />} />
      <MetricCard theme="trend"      title="Monthly Orders"   value="3,841"    change={-5.4}  trend="down" icon={<ShoppingIcon />} description="Target: 4,200" />
      <MetricCard theme="gradient"   title="MRR"              value="$128,400" change={-3.1}  trend="down" icon={<ChartIcon />} description="Target: $135,000" accentColor="#0ea5e9" />
      <MetricCard theme="filled"    title="Total Revenue"     value="$48,295"  change={12.5}  trend="up"   icon={<DollarIcon />} variant="primary" description="vs last month" />
      <MetricCard theme="inline"    title="Total Customers"   value="567,899"  change={2.5}   trend="up"   icon={<UsersIcon />} />
      <MetricCard theme="centered"  title="Total Products"    value="1,525"                              icon={<ShoppingIcon />} />
      <MetricCard theme="surface"   title="Total Orders"      value="687.3k"   change={-9.29} trend="down" icon={<ChartIcon />}  description="Since last month" variant="info" />
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)', borderRadius: 16, padding: '1rem' }}>
        <MetricCard theme="glass" title="Sessions" value="9,241" change={5.4} trend="up" icon={<ChartIcon />} description="Peak: 09:00–11:00" />
      </div>
    </CardGrid>
  ),
  parameters: { controls: { disable: true } },
};

// ─── Theme: Minimal ───────────────────────────────────────────────────────────

export const Minimal: Story = {
  render: (args) => (
    <CardColumn>
      <MetricCard {...args} theme="minimal" />
    </CardColumn>
  ),
};

// ─── Theme: Modern ────────────────────────────────────────────────────────────

export const Modern: Story = {
  render: (args) => (
    <CardColumn>
      <MetricCard {...args} theme="modern" icon={<DollarIcon />} />
    </CardColumn>
  ),
};

// ─── Theme: Glass ─────────────────────────────────────────────────────────────

export const Glass: Story = {
  render: (args) => (
    <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)', padding: '2rem', borderRadius: 16, width: 320 }}>
      <MetricCard {...args} theme="glass" icon={<DollarIcon />} />
    </div>
  ),
  parameters: { backgrounds: { default: 'dark' } },
};

// ─── Theme: Gradient ──────────────────────────────────────────────────────────

export const Gradient: Story = {
  render: (args) => (
    <CardColumn>
      <MetricCard {...args} theme="gradient" variant="primary" icon={<DollarIcon />} />
    </CardColumn>
  ),
};

// ─── Theme: Filled ──────────────────────────────────────────────────────────

export const Filled: Story = {
  render: (args) => (
    <CardGrid cols={3}>
      <MetricCard {...args} theme="filled" variant="primary"   icon={<DollarIcon />} />
      <MetricCard {...args} theme="filled" variant="success"   icon={<ChartIcon />} />
      <MetricCard {...args} theme="filled" variant="secondary" icon={<UsersIcon />} />
    </CardGrid>
  ),
};

// ─── Theme: Inline ──────────────────────────────────────────────────────────

export const Inline: Story = {
  render: (args) => (
    <CardGrid cols={3}>
      <MetricCard {...args} theme="inline" title="Total Customers" value="567,899" change={2.5}    trend="up"      icon={<UsersIcon />} />
      <MetricCard {...args} theme="inline" title="Monthly Revenue" value="$48,295" change={12.5}   trend="up"      icon={<DollarIcon />} />
      <MetricCard {...args} theme="inline" title="Churn Rate"      value="2.4%"    change={-0.5}   trend="down"    icon={<ChartIcon />} variant="error" />
    </CardGrid>
  ),
};

// ─── Theme: Centered ─────────────────────────────────────────────────────────

export const Centered: Story = {
  render: (args) => (
    <CardGrid cols={3}>
      <MetricCard {...args} theme="centered" title="Total Products"   value="1,525"   icon={<ShoppingIcon />} variant="primary" />
      <MetricCard {...args} theme="centered" title="Active Users"     value="24,819"  icon={<UsersIcon />}    variant="secondary" />
      <MetricCard {...args} theme="centered" title="Conversion Rate"  value="4.28%"   icon={<ChartIcon />}    variant="success" />
    </CardGrid>
  ),
};

// ─── Theme: Surface ──────────────────────────────────────────────────────────

export const Surface: Story = {
  render: (args) => (
    <CardGrid cols={3}>
      <MetricCard {...args} theme="surface" title="Total Orders"     value="687.3k"  change={-9.29} trend="down" icon={<ShoppingIcon />} variant="info"      description="Since last month" />
      <MetricCard {...args} theme="surface" title="Monthly Revenue"  value="$48,295" change={12.5}  trend="up"   icon={<DollarIcon />}   variant="success"   description="vs last month" />
      <MetricCard {...args} theme="surface" title="Active Users"     value="24,819"  change={8.3}   trend="up"   icon={<UsersIcon />}    variant="secondary" description="vs last month" />
    </CardGrid>
  ),
};

// ─── Theme: Enterprise ────────────────────────────────────────────────────────

export const Enterprise: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <MetricCard {...args} theme="enterprise" variant="warning" icon={<ServerIcon />} />
    </div>
  ),
};

// ─── Theme: Compact ───────────────────────────────────────────────────────────

export const Compact: Story = {
  name: 'Compact (stacked rows)',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: 320 }}>
      <MetricCard {...args} theme="compact" title="Sessions"      value="9,241"  change={5.4}   trend="up"      icon={<ChartIcon />} />
      <MetricCard {...args} theme="compact" title="Bounce Rate"   value="38.7%"  change={-2.1}  trend="up"      icon={<ChartIcon />} />
      <MetricCard {...args} theme="compact" title="Avg. Duration" value="2m 44s" change={0}     trend="neutral" icon={<UsersIcon />} />
      <MetricCard {...args} theme="compact" title="Conversions"   value="4.28%"  change={21.7}  trend="up"      icon={<ShoppingIcon />} />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

// ─── Theme: Trend ─────────────────────────────────────────────────────────────

export const Trend: Story = {
  render: (args) => (
    <CardColumn>
      <MetricCard {...args} theme="trend" icon={<ChartIcon />} />
    </CardColumn>
  ),
};

// ─── Trend directions ─────────────────────────────────────────────────────────

export const TrendDirections: Story = {
  render: () => (
    <CardGrid cols={3}>
      <MetricCard theme="modern" title="Revenue"    value="$48,295" change={12.5}  trend="up"      icon={<DollarIcon />} />
      <MetricCard theme="modern" title="Churn Rate" value="2.4%"    change={-5.1}  trend="down"    icon={<UsersIcon />} />
      <MetricCard theme="modern" title="Avg. Price" value="$42.00"  change={0}     trend="neutral" icon={<ChartIcon />} />
    </CardGrid>
  ),
  parameters: { controls: { disable: true } },
};

// ─── Dark mode ────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div style={{ background: '#111827', padding: '2rem', borderRadius: 16 }}>
      <CardGrid cols={4}>
        <MetricCard mode="dark" theme="modern"     title="Revenue"     value="$48,295" change={12.5}  trend="up" icon={<DollarIcon />} />
        <MetricCard mode="dark" theme="enterprise" title="API Latency" value="142 ms"  change={-18.2} trend="up" icon={<ServerIcon />} accentColor="#a78bfa" />
        <MetricCard mode="dark" theme="trend"      title="Conversion"  value="4.28%"   change={21.7}  trend="up" icon={<ChartIcon />} />
        <MetricCard mode="dark" theme="compact"    title="Sessions"    value="9,241"   change={5.4}   trend="up" icon={<UsersIcon />} />
      </CardGrid>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
    controls: { disable: true },
  },
};

// ─── Loading state ────────────────────────────────────────────────────────────

export const Loading: Story = {
  name: 'Skeleton Loading',
  render: () => (
    <CardGrid cols={3}>
      <MetricCard theme="modern"     title="" value="" loading />
      <MetricCard theme="gradient"   title="" value="" loading accentColor="#0ea5e9" />
      <MetricCard theme="enterprise" title="" value="" loading />
      <MetricCard theme="compact"    title="" value="" loading />
      <MetricCard theme="trend"      title="" value="" loading />
    </CardGrid>
  ),
  parameters: { controls: { disable: true } },
};

// ─── Color variants ───────────────────────────────────────────────────────────

export const ColorVariants: Story = {
  render: () => (
    <CardGrid cols={3}>
      {(
        [
          { label: 'Primary',   variant: 'primary'   },
          { label: 'Secondary', variant: 'secondary' },
          { label: 'Success',   variant: 'success'   },
          { label: 'Warning',   variant: 'warning'   },
          { label: 'Error',     variant: 'error'     },
          { label: 'Info',      variant: 'info'      },
        ] as const
      ).map(({ label, variant }) => (
        <MetricCard
          key={variant}
          theme="modern"
          title={label}
          value="$48,295"
          change={12.5}
          trend="up"
          icon={<ChartIcon />}
          variant={variant}
        />
      ))}
    </CardGrid>
  ),
  parameters: { controls: { disable: true } },
};

// ─── Appearance overrides ─────────────────────────────────────────────────────

export const AppearanceOverrides: Story = {
  render: () => (
    <CardGrid cols={2}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.75rem', color: '#888' }}>
          Default (overline / h3 / caption)
        </p>
        <MetricCard
          theme="modern"
          title="Total Revenue"
          value="$48,295"
          change={12.5}
          trend="up"
          description="vs last month"
          icon={<DollarIcon />}
        />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.75rem', color: '#888' }}>
          Custom (h6 / h2 / body2)
        </p>
        <MetricCard
          theme="modern"
          title="Total Revenue"
          value="$48,295"
          change={12.5}
          trend="up"
          description="vs last month"
          icon={<DollarIcon />}
          appearance={{ titleVariant: 'h6', valueVariant: 'h2', descriptionVariant: 'body2' }}
        />
      </div>
    </CardGrid>
  ),
  parameters: { controls: { disable: true } },
};

// ─── Dashboard grid ───────────────────────────────────────────────────────────

export const DashboardGrid: Story = {
  render: () => (
    <CardGrid cols={4}>
      <MetricCard theme="modern"     title="Total Revenue"   value="$48,295"  change={12.5}  trend="up"   icon={<DollarIcon />}   description="vs last month" />
      <MetricCard theme="modern"     title="Active Users"    value="24,819"   change={8.3}   trend="up"   icon={<UsersIcon />}    description="vs last month" />
      <MetricCard theme="modern"     title="Conversion Rate" value="4.28%"    change={21.7}  trend="up"   icon={<ChartIcon />}    description="vs last month" />
      <MetricCard theme="modern"     title="Churn Rate"      value="2.4%"     change={-0.5}  trend="down" icon={<UsersIcon />}    description="vs last month" variant="error" />
      <MetricCard theme="enterprise" title="API Latency P95" value="142 ms"   change={-18.2} trend="up"   icon={<ServerIcon />}   description="us-east-1"     variant="warning" />
      <MetricCard theme="enterprise" title="Error Rate"      value="0.03%"    change={-33.3} trend="up"   icon={<ServerIcon />}   description="last 24 h"     variant="error" />
      <MetricCard theme="trend"      title="Monthly Orders"  value="3,841"    change={-5.4}  trend="down" icon={<ShoppingIcon />} description="Target: 4,200" />
      <MetricCard theme="compact"    title="Sessions"        value="9,241"    change={5.4}   trend="up"   icon={<ChartIcon />} />
    </CardGrid>
  ),
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '2rem', background: '#f9fafb', minHeight: '100vh' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
