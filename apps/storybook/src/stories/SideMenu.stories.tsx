import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { SideMenu, SideMenuItem, ThemeProvider } from '@luxis-ui/react';
import type { SideMenuItemProps } from '@luxis-ui/react';

// ── Icons ─────────────────────────────────────────────────────────────────────
const Icon = ({ d }: { d: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const DashboardIcon = () => <Icon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />;
const ProductsIcon = () => <Icon d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />;
const UsersIcon = () => <Icon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" />;
const AnalyticsIcon = () => <Icon d="M18 20V10 M12 20V4 M6 20v-6" />;
const SettingsIcon = () => <Icon d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />;
const OrdersIcon = () => <Icon d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2 M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />;
const TagIcon = () => <Icon d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01" />;

const sectionLabel = (text: string) => (
  <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#737373', margin: '0 0 12px' }}>
    {text}
  </p>
);

// ── Sample data ───────────────────────────────────────────────────────────────
const baseItems: SideMenuItemProps[] = [
  { label: 'Dashboard', icon: <DashboardIcon />, active: true },
  {
    label: 'Products',
    icon: <ProductsIcon />,
    items: [
      { label: 'All Products' },
      { label: 'Categories' },
      { label: 'Inventory', badge: 12 },
    ],
  },
  { label: 'Orders', icon: <OrdersIcon />, badge: 5 },
  { label: 'Customers', icon: <UsersIcon /> },
  { label: 'Analytics', icon: <AnalyticsIcon /> },
  {
    label: 'Settings',
    icon: <SettingsIcon />,
    items: [
      { label: 'Account' },
      { label: 'Billing' },
      { label: 'Notifications' },
    ],
  },
];

const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #3b82f6, #6366f1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>L</div>
    <span style={{ fontWeight: 700, fontSize: 16, color: '#171717' }}>Luxis UI</span>
  </div>
);

const Footer = ({ collapsed }: { collapsed?: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 13, color: '#374151', flexShrink: 0 }}>JD</div>
    {!collapsed && (
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#171717' }}>Jane Doe</div>
        <div style={{ fontSize: 11, color: '#737373' }}>Admin</div>
      </div>
    )}
  </div>
);

const meta: Meta<typeof SideMenu> = {
  title: 'Components/SideMenu',
  component: SideMenu,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    collapsed: { control: 'boolean', description: 'Collapse sidebar to icon-only mode' },
    width: { control: 'text', description: 'Expanded sidebar width (e.g. "260px")' },
    collapsedWidth: { control: 'text', description: 'Collapsed sidebar width (e.g. "80px")' },
    className: { control: false },
    header: { control: false, description: 'Header slot (logo / title)' },
    footer: { control: false, description: 'Footer slot (user profile etc.)' },
    items: { control: false, description: 'Menu items configuration' },
    onCollapseToggle: { control: false },
    headerPadding: { control: 'text', description: 'Header padding override' },
    footerPadding: { control: 'text', description: 'Footer padding override' },
  },
  args: {
    collapsed: false,
    width: '260px',
    collapsedWidth: '80px',
  },
};

export default meta;
type Story = StoryObj<typeof SideMenu>;

// ── Playground ────────────────────────────────────────────────────────────────
/** Toggle "collapsed" in the Controls panel to see icon-only mode. */
export const Playground: Story = {
  render: (args) => (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SideMenu
        {...args}
        items={baseItems}
        header={<Logo />}
        footer={<Footer collapsed={args.collapsed} />}
      />
      <div style={{ flex: 1, padding: 32, background: '#f9fafb' }}>
        <h2 style={{ margin: 0, color: '#171717' }}>Main content area</h2>
        <p style={{ color: '#737373', marginTop: 8 }}>Toggle "collapsed" in the Controls panel →</p>
      </div>
    </div>
  ),
  args: { items: baseItems },
};

// ── Default ───────────────────────────────────────────────────────────────────
/** Expanded sidebar with header, footer, and nested items. */
export const Default: Story = {
  render: (args) => (
    <div style={{ display: 'flex', height: 600 }}>
      <SideMenu
        {...args}
        items={baseItems}
        header={<Logo />}
        footer={<Footer />}
      />
      <div style={{ flex: 1, padding: 24, background: '#f9fafb', color: '#737373', fontSize: 14 }}>
        Content area
      </div>
    </div>
  ),
};

// ── Collapsed ─────────────────────────────────────────────────────────────────
/** Icon-only collapsed state. Hover tooltips appear on items. */
export const Collapsed: Story = {
  render: (args) => (
    <div style={{ display: 'flex', height: 600 }}>
      <SideMenu
        {...args}
        collapsed
        items={baseItems}
        header={<div style={{ display: 'flex', justifyContent: 'center' }}><div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #3b82f6, #6366f1)', borderRadius: 8 }} /></div>}
        footer={<Footer collapsed />}
      />
      <div style={{ flex: 1, padding: 24, background: '#f9fafb', color: '#737373', fontSize: 14 }}>
        Content area
      </div>
    </div>
  ),
};

// ── Toggle Collapse ───────────────────────────────────────────────────────────
/** Click the ☰ button to collapse / expand. */
const ToggleCollapseDemo = (args: ComponentProps<typeof SideMenu>) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div style={{ display: 'flex', height: 680, border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
      <SideMenu
        {...args}
        collapsed={collapsed}
        onCollapseToggle={setCollapsed}
        items={baseItems}
        header={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', width: '100%' }}>
            {!collapsed && <Logo />}
            <button
              onClick={() => setCollapsed((c) => !c)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 6, color: '#737373', fontSize: 18, lineHeight: 1, display: 'flex', alignItems: 'center' }}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? '»' : '«'}
            </button>
          </div>
        }
        footer={<Footer collapsed={collapsed} />}
      />
      <div style={{ flex: 1, padding: 32, background: '#f9fafb' }}>
        <h2 style={{ margin: 0, color: '#171717' }}>Dashboard</h2>
        <p style={{ color: '#737373', marginTop: 8 }}>Click the arrow button to toggle the sidebar.</p>
      </div>
    </div>
  );
};
/** Click the collapse button to expand / collapse. */
export const ToggleCollapse: Story = { render: (args) => <ToggleCollapseDemo {...args} /> };

// ── Active Item ───────────────────────────────────────────────────────────────
const ActiveItemDemo = (args: ComponentProps<typeof SideMenu>) => {
  const [activeLabel, setActiveLabel] = useState('Dashboard');

  const items: SideMenuItemProps[] = baseItems.map((item) => ({
    ...item,
    active: item.label === activeLabel,
    onClick: () => setActiveLabel(item.label),
    items: item.items?.map((sub) => ({
      ...sub,
      active: sub.label === activeLabel,
      onClick: () => setActiveLabel(sub.label),
    })),
  }));

  return (
    <div style={{ display: 'flex', height: 600 }}>
      <SideMenu {...args} items={items} header={<Logo />} footer={<Footer />} />
      <div style={{ flex: 1, padding: 32, background: '#f9fafb' }}>
        <h2 style={{ margin: 0, color: '#171717' }}>{activeLabel}</h2>
        <p style={{ color: '#737373', marginTop: 8 }}>Click a menu item to activate it.</p>
      </div>
    </div>
  );
};
/** Click any item to set the active state. */
export const ActiveItem: Story = { render: (args) => <ActiveItemDemo {...args} /> };

// ── With Badges ───────────────────────────────────────────────────────────────
/** Items can display number or text badges. */
export const WithBadges: Story = {
  render: (args) => {
    const items: SideMenuItemProps[] = [
      { label: 'Dashboard', icon: <DashboardIcon />, active: true },
      { label: 'Orders', icon: <OrdersIcon />, badge: 24 },
      { label: 'Customers', icon: <UsersIcon />, badge: 'New' },
      { label: 'Tags', icon: <TagIcon />, badge: 99 },
    ];
    return (
      <div style={{ display: 'flex', height: 400 }}>
        <SideMenu {...args} items={items} header={<Logo />} />
        <div style={{ flex: 1, padding: 24, background: '#f9fafb' }} />
      </div>
    );
  },
};

// ── Disabled Items ────────────────────────────────────────────────────────────
export const DisabledItems: Story = {
  render: (args) => {
    const items: SideMenuItemProps[] = [
      { label: 'Dashboard', icon: <DashboardIcon />, active: true },
      { label: 'Analytics', icon: <AnalyticsIcon />, disabled: true },
      { label: 'Customers', icon: <UsersIcon /> },
      { label: 'Settings', icon: <SettingsIcon />, disabled: true },
    ];
    return (
      <div style={{ display: 'flex', height: 400 }}>
        <SideMenu {...args} items={items} header={<Logo />} />
        <div style={{ flex: 1, padding: 24, background: '#f9fafb' }} />
      </div>
    );
  },
};

// ── Custom Width ──────────────────────────────────────────────────────────────
/** Wider sidebar for content-heavy navigation. */
export const CustomWidth: Story = {
  render: (args) => (
    <div style={{ display: 'flex', height: 500 }}>
      <SideMenu {...args} items={baseItems} header={<Logo />} footer={<Footer />} />
      <div style={{ flex: 1, padding: 24, background: '#f9fafb' }} />
    </div>
  ),
  args: { width: '320px', collapsedWidth: '64px' },
};

// ── Standalone SideMenuItem ───────────────────────────────────────────────────
/** Individual item component can be used outside the SideMenu wrapper. */
export const IndividualItems: Story = {
  render: () => (
    <div style={{ width: 260, border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', padding: '8px 0' }}>
      {sectionLabel('Menu Items')}
      <SideMenuItem label="Dashboard" icon={<DashboardIcon />} active />
      <SideMenuItem label="Orders" icon={<OrdersIcon />} badge={5} />
      <SideMenuItem label="Settings" icon={<SettingsIcon />} />
      <SideMenuItem label="Analytics (disabled)" icon={<AnalyticsIcon />} disabled />
    </div>
  ),
};
