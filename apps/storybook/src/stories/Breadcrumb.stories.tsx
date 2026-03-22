import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Breadcrumb, ThemeProvider } from '@luxis-ui/react';
import type { BreadcrumbItem, BreadcrumbProps } from '@luxis-ui/react';

// ─── Shared icon helpers ──────────────────────────────────────────────────────

const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const PackageIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

// ─── Shared sample data ───────────────────────────────────────────────────────

const basicItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Laptops', active: true },
];

const longItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Catalogue', href: '/catalogue' },
  { label: 'Electronics', href: '/catalogue/electronics' },
  { label: 'Computers', href: '/catalogue/electronics/computers' },
  { label: 'Laptops', href: '/catalogue/electronics/computers/laptops' },
  { label: 'Gaming', href: '/catalogue/electronics/computers/laptops/gaming' },
  { label: 'ASUS ROG', active: true },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
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
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant — scales typography and spacing',
    },
    linkColor: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral', 'inherit'],
      description: 'Color applied to all navigable link items',
    },
    maxItems: {
      control: 'number',
      description: 'Collapse to first + … + last N items when exceeded',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the root <nav> element',
    },
    separator: {
      control: false,
      description: 'Custom separator node (default: ChevronRight icon)',
    },
    linkComponent: {
      control: false,
      description: 'Custom routing component (React Router Link, Next.js Link, etc.)',
    },
    items: {
      control: false,
      description: 'Array of BreadcrumbItem objects',
    },
    itemClassName: {
      control: 'text',
      description: 'Extra class applied to every item <li>',
    },
    activeItemClassName: {
      control: 'text',
      description: 'Extra class applied only to the active item <li>',
    },
    separatorClassName: {
      control: 'text',
      description: 'Extra class applied to each separator <li>',
    },
  },
  args: {
    items: basicItems,
    size: 'md',
    linkColor: 'inherit',
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// ─── Playground ───────────────────────────────────────────────────────────────

/** Fully interactive — tweak every prop from the Controls panel. */
export const Playground: Story = {};

// ─── Basic ────────────────────────────────────────────────────────────────────

/** A standard 4-level hierarchy with native anchor hrefs. */
export const Basic: Story = {
  args: { items: basicItems },
};

// ─── Size Variants ────────────────────────────────────────────────────────────

/**
 * Three size tokens.
 * - `sm` → `caption` text (12px)
 * - `md` → `body2` text (14px, default)
 * - `lg` → `body1` text (16px)
 */
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['sm', 'md', 'lg'] as BreadcrumbProps['size'][]).map((s) => (
        <div key={s}>
          <p style={{ fontSize: '0.75rem', color: '#737373', marginBottom: 6 }}>size=&quot;{s}&quot;</p>
          <Breadcrumb {...args} size={s} items={basicItems} />
        </div>
      ))}
    </div>
  ),
};

// ─── Link Colours ─────────────────────────────────────────────────────────────

/** All `linkColor` tokens — controls the colour of every navigable link. */
export const LinkColors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {(['primary', 'secondary', 'neutral', 'inherit'] as BreadcrumbProps['linkColor'][]).map((c) => (
        <div key={c}>
          <p style={{ fontSize: '0.75rem', color: '#737373', marginBottom: 6 }}>linkColor=&quot;{c}&quot;</p>
          <Breadcrumb {...args} linkColor={c} items={basicItems} />
        </div>
      ))}
    </div>
  ),
};

// ─── Custom Separator ─────────────────────────────────────────────────────────

/** Any React node works as separator. */
export const CustomSeparator: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Breadcrumb {...args} separator="/" items={basicItems} />
      <Breadcrumb {...args} separator="›" items={basicItems} />
      <Breadcrumb {...args} separator="·" items={basicItems} />
      <Breadcrumb
        {...args}
        separator={<span style={{ color: '#e11d48', fontWeight: 700 }}>→</span>}
        items={basicItems}
      />
    </div>
  ),
};

// ─── With Icons ───────────────────────────────────────────────────────────────

/** Icons in the `icon` slot — required for icon-only items, recommended with short labels. */
export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', icon: <HomeIcon /> },
      { label: 'Products', href: '/products', icon: <PackageIcon /> },
      { label: 'Laptops', active: true },
    ],
  },
};

/** Icon-only first item — pass `ariaLabel` for screen-reader accessibility. */
export const IconOnly: Story = {
  args: {
    items: [
      { icon: <HomeIcon />, href: '/', ariaLabel: 'Home' },
      { label: 'Products', href: '/products' },
      { label: 'Laptops', active: true },
    ],
  },
};

// ─── Collapsing (maxItems) ────────────────────────────────────────────────────

/**
 * `maxItems` collapses long paths to first + … + last N items.
 * The ellipsis is marked `aria-hidden` — AT reads only the visible items.
 */
export const Collapsed: Story = {
  args: {
    items: longItems,
    maxItems: 4,
  },
};

/** Vary maxItems to see different collapse thresholds. */
export const CollapseThresholds: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {[3, 4, 5].map((n) => (
        <div key={n}>
          <p style={{ fontSize: '0.75rem', color: '#737373', marginBottom: 6 }}>maxItems={n}</p>
          <Breadcrumb {...args} items={longItems} maxItems={n} />
        </div>
      ))}
    </div>
  ),
};

// ─── Disabled Item ────────────────────────────────────────────────────────────

/**
 * A `disabled` item prevents navigation.
 * The Link component falls back to a native `<a>` without `href`,
 * and `pointer-events: none` / `aria-disabled` handle the rest.
 */
export const WithDisabledItem: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products', disabled: true },
      { label: 'Laptops', active: true },
    ],
  },
};

// ─── React Router DOM pattern ─────────────────────────────────────────────────

/**
 * Pass a React Router `Link` via `linkComponent` and use `linkProps.to` for each item.
 * Items with `href` still work too — the component passes both to the custom component.
 *
 * ```tsx
 * import { Link as RouterLink } from 'react-router-dom';
 *
 * <Breadcrumb
 *   linkComponent={RouterLink}
 *   items={[
 *     { label: 'Home',      linkProps: { to: '/' } },
 *     { label: 'Dashboard', linkProps: { to: '/dashboard' } },
 *     { label: 'Settings',  active: true },
 *   ]}
 * />
 * ```
 */
export const ReactRouterPattern: Story = {
  render: (args) => {
    const SimulatedRouterLink = ({
      children,
      href,
      to,
      ...rest
    }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to?: string }) => (
      <a {...rest} href={to ?? href} data-router="react-router-dom">
        {children}
      </a>
    );

    const routerItems: BreadcrumbItem[] = [
      { label: 'Home',      linkProps: { to: '/' } },
      { label: 'Dashboard', linkProps: { to: '/dashboard' } },
      { label: 'Analytics', linkProps: { to: '/dashboard/analytics' } },
      { label: 'Settings',  active: true },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ fontSize: '0.8rem', color: '#737373', margin: '0 0 8px' }}>
          Pattern: <code>{'<Breadcrumb linkComponent={RouterLink} items={[{ linkProps: { to: \'/...\' } }]} />'}</code>
        </p>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Breadcrumb {...args} component={SimulatedRouterLink as any} items={routerItems} linkColor="primary" />
      </div>
    );
  },
};

// ─── Next.js pattern ─────────────────────────────────────────────────────────

/**
 * Next.js 13+ `Link` accepts standard `href` — no extra `linkProps` needed.
 *
 * ```tsx
 * import NextLink from 'next/link';
 *
 * <Breadcrumb
 *   linkComponent={NextLink}
 *   items={[
 *     { label: 'Home',  href: '/' },
 *     { label: 'About', href: '/about' },
 *     { label: 'Team',  active: true },
 *   ]}
 * />
 * ```
 */
export const NextJsPattern: Story = {
  render: (args) => {
    const SimulatedNextLink = ({
      children,
      href,
      ...rest
    }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a {...rest} href={href} data-router="next/link">
        {children}
      </a>
    );

    const nextItems: BreadcrumbItem[] = [
      { label: 'Home',  href: '/' },
      { label: 'Blog',  href: '/blog' },
      { label: 'React Tips', href: '/blog/react-tips' },
      { label: 'Hooks',  active: true },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ fontSize: '0.8rem', color: '#737373', margin: '0 0 8px' }}>
          Pattern: <code>{'<Breadcrumb linkComponent={NextLink} items={[{ href: \'/...\' }]} />'}</code>
        </p>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Breadcrumb {...args} linkComponent={SimulatedNextLink as any} items={nextItems} linkColor="primary" />
      </div>
    );
  },
};

// ─── Dark Mode ────────────────────────────────────────────────────────────────

/** All size variants under `data-theme="dark"`. */
export const DarkMode: Story = {
  render: (args) => (
    <div data-theme="dark" style={{ background: '#0a0a0a', padding: 24, borderRadius: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {(['sm', 'md', 'lg'] as BreadcrumbProps['size'][]).map((s) => (
          <Breadcrumb key={s} {...args} size={s} items={basicItems} linkColor="primary" />
        ))}
        <Breadcrumb {...args} items={longItems} maxItems={4} linkColor="primary" />
      </div>
    </div>
  ),
};

// ─── Responsive ───────────────────────────────────────────────────────────────

/**
 * Resize the viewport below 768px. The desktop list is hidden and the mobile list
 * (first / … / last) appears instead. The mobile list carries `aria-hidden="true"` so
 * screen-readers always read the full desktop list regardless of viewport.
 */
export const Responsive: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <div style={{ padding: 24 }}>
      <p style={{ fontSize: '0.8rem', color: '#737373', marginBottom: 12 }}>
        Resize viewport ≤768 px to see the mobile (first/…/last) layout.
      </p>
      <Breadcrumb {...args} items={longItems} />
    </div>
  ),
};

// ─── Enterprise page header pattern ──────────────────────────────────────────

/** Breadcrumb inside a typical enterprise page header. */
export const PageHeader: Story = {
  render: () => (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e5e5e5',
        borderRadius: 8,
        padding: '16px 24px',
      }}
    >
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Users',     href: '/dashboard/users' },
          { label: 'Profile',   active: true },
        ]}
        size="sm"
        linkColor="neutral"
      />
      <h1 style={{ margin: '8px 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#171717' }}>
        User Profile
      </h1>
      <p style={{ margin: 0, fontSize: '0.875rem', color: '#737373' }}>
        View and update user account details
      </p>
    </div>
  ),
};
