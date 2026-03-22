import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { ThemeProvider, Tabs, TabList, Tab, TabPanels, TabPanel } from '@luxis-ui/react';
import type { TabsVariant } from '@luxis-ui/react';
import { useState } from 'react';

// ─────────────────────────────────────────────
// Icons (inline SVGs to avoid extra dependencies)
// ─────────────────────────────────────────────

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

// ─────────────────────────────────────────────
// Shared panel content style
// ─────────────────────────────────────────────

const panelStyle: React.CSSProperties = {
  padding: '16px 0',
  lineHeight: 1.6,
  color: 'var(--lxs-color-text-secondary, #6b7280)',
  fontSize: 14,
};

// ─────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'enclosed', 'soft-rounded', 'solid-rounded', 'segmented'],
      description: 'Visual style of the tab list',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the tab buttons',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction of the tab list',
    },
    isLazy: {
      control: 'boolean',
      description: 'Mount panels lazily (only when first activated)',
    },
  },
  args: {
    variant: 'line',
    size: 'md',
    orientation: 'horizontal',
    isLazy: false,
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// ─────────────────────────────────────────────
// 1. Default
// ─────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <ThemeProvider>
      <Tabs defaultValue="overview" {...args}>
        <TabList>
          <Tab value="overview">Overview</Tab>
          <Tab value="activity">Activity</Tab>
          <Tab value="settings">Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="overview">
            <p style={panelStyle}>
              <strong>Overview panel.</strong> This is the default tab content. It gives users a
              high-level summary of the section.
            </p>
          </TabPanel>
          <TabPanel value="activity">
            <p style={panelStyle}>
              <strong>Activity panel.</strong> Here you can see recent actions, logs, and events
              from your account.
            </p>
          </TabPanel>
          <TabPanel value="settings">
            <p style={panelStyle}>
              <strong>Settings panel.</strong> Configure your preferences, notifications, and
              security options here.
            </p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 2. All variants
// ─────────────────────────────────────────────

const VARIANTS: TabsVariant[] = ['line', 'enclosed', 'soft-rounded', 'solid-rounded', 'segmented'];

export const Variants: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {VARIANTS.map((variant) => (
          <div key={variant}>
            <p style={{ marginBottom: 12, fontWeight: 600, fontSize: 13, textTransform: 'capitalize' }}>
              variant="{variant}"
            </p>
            <Tabs defaultValue="a" variant={variant}>
              <TabList>
                <Tab value="a">Overview</Tab>
                <Tab value="b">Analytics</Tab>
                <Tab value="c">Reports</Tab>
              </TabList>
              <TabPanels>
                <TabPanel value="a"><p style={panelStyle}>Overview content for the <em>{variant}</em> variant.</p></TabPanel>
                <TabPanel value="b"><p style={panelStyle}>Analytics content.</p></TabPanel>
                <TabPanel value="c"><p style={panelStyle}>Reports content.</p></TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        ))}
      </div>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 3. Sizes
// ─────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <div key={size}>
            <p style={{ marginBottom: 12, fontWeight: 600, fontSize: 13 }}>size="{size}"</p>
            <Tabs defaultValue="a" size={size}>
              <TabList>
                <Tab value="a">Dashboard</Tab>
                <Tab value="b">Users</Tab>
                <Tab value="c">Settings</Tab>
              </TabList>
              <TabPanels>
                <TabPanel value="a"><p style={panelStyle}>Dashboard content — {size} size.</p></TabPanel>
                <TabPanel value="b"><p style={panelStyle}>Users content.</p></TabPanel>
                <TabPanel value="c"><p style={panelStyle}>Settings content.</p></TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        ))}
      </div>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 4. With icons
// ─────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => (
    <ThemeProvider>
      <Tabs defaultValue="home" variant="line">
        <TabList>
          <Tab value="home" icon={<HomeIcon />}>Home</Tab>
          <Tab value="profile" icon={<UserIcon />}>Profile</Tab>
          <Tab value="notifications" icon={<BellIcon />}>Notifications</Tab>
          <Tab value="settings" icon={<SettingsIcon />}>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="home">
            <p style={panelStyle}>Welcome back! Here's what's happening on your home feed.</p>
          </TabPanel>
          <TabPanel value="profile">
            <p style={panelStyle}>Manage your profile, avatar, and personal information.</p>
          </TabPanel>
          <TabPanel value="notifications">
            <p style={panelStyle}>You have 3 unread notifications. Check them out below.</p>
          </TabPanel>
          <TabPanel value="settings">
            <p style={panelStyle}>Adjust your account, privacy, and application settings.</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 5. Vertical orientation
// ─────────────────────────────────────────────

export const Vertical: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {(['line', 'enclosed', 'soft-rounded'] as TabsVariant[]).map((variant) => (
          <div key={variant}>
            <p style={{ marginBottom: 12, fontWeight: 600, fontSize: 13, textTransform: 'capitalize' }}>
              variant="{variant}" orientation="vertical"
            </p>
            <Tabs defaultValue="a" orientation="vertical" variant={variant}>
              <TabList>
                <Tab value="a" icon={<HomeIcon />}>Overview</Tab>
                <Tab value="b" icon={<UserIcon />}>Profile</Tab>
                <Tab value="c" icon={<SettingsIcon />}>Settings</Tab>
              </TabList>
              <TabPanels>
                <TabPanel value="a"><p style={panelStyle}>Overview content. Select any tab on the left.</p></TabPanel>
                <TabPanel value="b"><p style={panelStyle}>Profile configuration and preferences.</p></TabPanel>
                <TabPanel value="c"><p style={panelStyle}>Application and account settings.</p></TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        ))}
      </div>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 6. Controlled
// ─────────────────────────────────────────────

const ControlledDemo = () => {
  const [activeTab, setActiveTab] = useState('a');

  return (
    <ThemeProvider>
      <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Externally controlled:</span>
        {['a', 'b', 'c'].map((v, i) => (
          <button
            key={v}
            onClick={() => setActiveTab(v)}
            style={{
              padding: '4px 12px',
              borderRadius: 6,
              border: '1px solid #d1d5db',
              background: activeTab === v ? '#3b82f6' : 'transparent',
              color: activeTab === v ? '#fff' : 'inherit',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            Set Tab {i + 1}
          </button>
        ))}
      </div>
      <Tabs value={activeTab} onChange={(v: string) => setActiveTab(v)} variant="enclosed">
        <TabList>
          <Tab value="a">Tab 1</Tab>
          <Tab value="b">Tab 2</Tab>
          <Tab value="c">Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="a"><p style={panelStyle}>Content for <strong>Tab 1</strong> — controlled from outside the component.</p></TabPanel>
          <TabPanel value="b"><p style={panelStyle}>Content for <strong>Tab 2</strong>.</p></TabPanel>
          <TabPanel value="c"><p style={panelStyle}>Content for <strong>Tab 3</strong>.</p></TabPanel>
        </TabPanels>
      </Tabs>
      <p style={{ marginTop: 12, fontSize: 12, color: '#9ca3af' }}>
        Active value: <code>{activeTab}</code>
      </p>
    </ThemeProvider>
  );
};

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

// ─────────────────────────────────────────────
// 7. Disabled tab
// ─────────────────────────────────────────────

export const DisabledTab: Story = {
  render: () => (
    <ThemeProvider>
      <Tabs defaultValue="a" variant="line">
        <TabList>
          <Tab value="a">Available</Tab>
          <Tab value="b" disabled>Disabled</Tab>
          <Tab value="c">Also Available</Tab>
          <Tab value="d" disabled>Also Disabled</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="a">
            <p style={panelStyle}>This tab is active. Tab "Disabled" and "Also Disabled" cannot be selected.</p>
          </TabPanel>
          <TabPanel value="b">
            <p style={panelStyle}>This panel should never be visible.</p>
          </TabPanel>
          <TabPanel value="c">
            <p style={panelStyle}>Second available tab content.</p>
          </TabPanel>
          <TabPanel value="d">
            <p style={panelStyle}>This panel should never be visible.</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 8. Lazy mounting
// ─────────────────────────────────────────────

const LazyPanel = ({ value, mounted, onMount }: { value: string; mounted: string[]; onMount: (v: string) => void }) => {
  if (!mounted.includes(value)) {
    onMount(value);
  }
  return (
    <p style={panelStyle}>
      Panel <strong>{value}</strong> mounted. All mounted so far: <code>[{mounted.join(', ')}]</code>
    </p>
  );
};

const LazyMountDemo = () => {
  const [mounted, setMounted] = useState<string[]>([]);

  const handleMount = (v: string) =>
    setMounted((prev) => (prev.includes(v) ? prev : [...prev, v]));

  return (
    <ThemeProvider>
      <p style={{ marginBottom: 12, fontSize: 13, color: '#6b7280' }}>
        With <code>isLazy=true</code>, panels are only mounted when first activated. Click each tab to see it mount.
      </p>
      <Tabs defaultValue="a" isLazy>
        <TabList>
          <Tab value="a">Alpha</Tab>
          <Tab value="b">Beta</Tab>
          <Tab value="c">Gamma</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="a"><LazyPanel value="alpha" mounted={mounted} onMount={handleMount} /></TabPanel>
          <TabPanel value="b"><LazyPanel value="beta" mounted={mounted} onMount={handleMount} /></TabPanel>
          <TabPanel value="c"><LazyPanel value="gamma" mounted={mounted} onMount={handleMount} /></TabPanel>
        </TabPanels>
      </Tabs>
    </ThemeProvider>
  );
};

export const LazyMount: Story = {
  render: () => <LazyMountDemo />,
};

// ─────────────────────────────────────────────
// 9. Scroll controls (many tabs)
// ─────────────────────────────────────────────

const MANY_TABS = [
  'Dashboard', 'Analytics', 'Reports', 'Users', 'Settings',
  'Billing', 'Integrations', 'Activity', 'Notifications', 'Help',
  'Docs', 'API Keys',
];

export const ScrollControls: Story = {
  render: () => (
    <ThemeProvider>
      <p style={{ marginBottom: 12, fontSize: 13, color: '#6b7280' }}>
        When there are more tabs than fit in the container, <code>showScrollControls</code> adds
        arrow buttons to scroll through them.
      </p>
      <div style={{ maxWidth: 480 }}>
        <Tabs defaultValue={MANY_TABS[0]} variant="line">
          <TabList showScrollControls>
            {MANY_TABS.map((label) => (
              <Tab key={label} value={label}>{label}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {MANY_TABS.map((label) => (
              <TabPanel key={label} value={label}>
                <p style={panelStyle}>Content for the <strong>{label}</strong> section.</p>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </div>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 10. Playground (argTypes-driven)
// ─────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <ThemeProvider>
      <Tabs defaultValue="home" {...args}>
        <TabList>
          <Tab value="home" icon={<HomeIcon />}>Home</Tab>
          <Tab value="profile" icon={<UserIcon />}>Profile</Tab>
          <Tab value="notifications" icon={<BellIcon />}>Notifications</Tab>
          <Tab value="settings" icon={<SettingsIcon />}>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="home">
            <p style={panelStyle}>Home panel — use the controls panel to experiment with variants, sizes, and orientations.</p>
          </TabPanel>
          <TabPanel value="profile">
            <p style={panelStyle}>Profile panel.</p>
          </TabPanel>
          <TabPanel value="notifications">
            <p style={panelStyle}>Notifications panel.</p>
          </TabPanel>
          <TabPanel value="settings">
            <p style={panelStyle}>Settings panel.</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ThemeProvider>
  ),
};
