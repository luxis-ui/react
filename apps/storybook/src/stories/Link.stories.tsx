import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Link, ThemeProvider } from '@luxis-ui/react';
import type { LinkProps } from '@luxis-ui/react';

// ─── Shared icon helpers (no extra deps) ─────────────────────────────────────
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'URL to navigate to',
    },
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'caption', 'small'],
      description: 'Text size / typographic variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral', 'inherit'],
      description: 'Semantic colour token',
    },
    hoverColor: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral', 'inherit'],
      description: 'Override colour on hover (preset or any CSS colour string)',
    },
    noUnderline: {
      control: 'boolean',
      description: 'Remove underline decoration',
    },
    disabled: {
      control: 'boolean',
      description: 'Prevent navigation and show disabled state',
    },
    external: {
      control: 'boolean',
      description: 'Open in new tab (adds rel="noopener noreferrer", forces native <a>)',
    },
    download: {
      control: 'boolean',
      description: 'Trigger a browser download (forces native <a>)',
    },
    children: {
      control: 'text',
      description: 'Link label',
    },
    leftIcon: {
      control: false,
      description: 'Icon before the label',
    },
    rightIcon: {
      control: false,
      description: 'Icon after the label',
    },
    component: {
      control: false,
      description: 'Custom routing component (React Router Link, Next.js Link, etc.)',
    },
    componentProps: {
      control: false,
      description: 'Extra props forwarded to the custom component',
    },
  },
  args: {
    href: '#',
    children: 'Click here',
    variant: 'body1',
    color: 'primary',
    noUnderline: true,
    disabled: false,
    external: false,
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

// ─── Playground ───────────────────────────────────────────────────────────────

/** Fully interactive — tweak every prop from the Controls panel. */
export const Playground: Story = {};

// ─── Colour Variants ──────────────────────────────────────────────────────────

/** All semantic colour tokens. */
export const ColorVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['primary', 'secondary', 'neutral', 'inherit'] as LinkProps['color'][]).map((c) => (
        <Link key={c} {...args} color={c}>
          color=&quot;{c}&quot; — The quick brown fox
        </Link>
      ))}
    </div>
  ),
};

// ─── Text Variants (Size Scale) ───────────────────────────────────────────────

/** Every typographic size variant. */
export const TextVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'caption', 'small'] as LinkProps['variant'][]).map(
        (v) => (
          <Link key={v} {...args} variant={v}>
            variant=&quot;{v}&quot; — View documentation
          </Link>
        )
      )}
    </div>
  ),
};

// ─── With Icons ───────────────────────────────────────────────────────────────

/** Left and right icon slots. */
export const WithIcons: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Link {...args} leftIcon={<ArrowIcon />}>Left icon</Link>
      <Link {...args} rightIcon={<ArrowIcon />}>Right icon</Link>
      <Link {...args} leftIcon={<ArrowIcon />} rightIcon={<ExternalIcon />}>Both icons</Link>
    </div>
  ),
};

// ─── External Link ────────────────────────────────────────────────────────────

/**
 * `external=true` forces a native `<a>` with `target="_blank"` and
 * `rel="noopener noreferrer"` — safe for third-party URLs.
 */
export const External: Story = {
  args: {
    href: 'https://example.com',
    external: true,
    children: 'Open in new tab',
    rightIcon: <ExternalIcon />,
  },
};

// ─── Download Link ────────────────────────────────────────────────────────────

/** `download` triggers the browser's native download behaviour. */
export const Download: Story = {
  args: {
    href: '/assets/report.pdf',
    download: true,
    children: 'Download PDF',
    leftIcon: <DownloadIcon />,
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

/**
 * When `disabled=true`:
 * - `href` is removed so the browser treats it as inert
 * - `aria-disabled="true"` is set for assistive technology
 * - `pointer-events: none` prevents mouse interaction
 * - click events are intercepted via `onClick` prevention
 * - **Custom routing components (React Router / Next.js) fall back to a
 *   native `<a>` element** so navigation is always blocked, not just hidden.
 */
export const Disabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Link {...args} disabled href="/should-not-navigate" color="primary">
        Disabled primary link
      </Link>
      <Link {...args} disabled href="/should-not-navigate" color="secondary">
        Disabled secondary link
      </Link>
    </div>
  ),
};

// ─── No Underline ─────────────────────────────────────────────────────────────

/** `noUnderline` suppresses underline on hover as well. */
export const NoUnderline: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Link {...args} noUnderline={false}>With underline (noUnderline=false)</Link>
      <Link {...args} noUnderline={true}>Without underline (noUnderline=true)</Link>
    </div>
  ),
};

// ─── Hover Color Override ─────────────────────────────────────────────────────

/** Preset token hover colours and a custom CSS colour string. */
export const HoverColors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Link {...args} color="neutral" hoverColor="primary">Hover to turn primary</Link>
      <Link {...args} color="neutral" hoverColor="secondary">Hover to turn secondary</Link>
      <Link {...args} color="neutral" hoverColor="#e11d48">Hover to turn custom #e11d48</Link>
    </div>
  ),
};

// ─── React Router DOM pattern ─────────────────────────────────────────────────

/**
 * **React Router DOM** usage pattern.
 *
 * In a real app, import and pass the real React Router `Link`:
 * ```tsx
 * import { Link as RouterLink } from 'react-router-dom';
 *
 * <Link component={RouterLink} to="/dashboard">Dashboard</Link>
 * ```
 *
 * This story simulates the component prop with a plain function component
 * (no actual routing occurs in Storybook) to demonstrate the prop flow.
 */
export const ReactRouterPattern: Story = {
  render: (args) => {
    // Simulate a React Router Link shape (no actual routing)
    const SimulatedRouterLink = ({ children, href, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to?: string }) => (
      // In real usage this would be `import { Link } from 'react-router-dom'`
      <a {...rest} href={rest.to ?? href} data-router="react-router-dom">
        {children}
      </a>
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ fontSize: '0.8rem', color: '#737373', margin: '0 0 8px' }}>
          Pattern: <code>{'<Link component={RouterLink} to="/dashboard">'}</code>
        </p>
        <Link
          {...args}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          component={SimulatedRouterLink as any}
          componentProps={{ to: '/dashboard' }}
          color="primary"
        >
          React Router — /dashboard
        </Link>
        <Link
          {...args}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          component={SimulatedRouterLink as any}
          componentProps={{ to: '/settings' }}
          color="secondary"
        >
          React Router — /settings
        </Link>
        <Link
          {...args}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          component={SimulatedRouterLink as any}
          componentProps={{ to: '/profile' }}
          disabled
          color="neutral"
        >
          React Router — disabled (will NOT navigate)
        </Link>
      </div>
    );
  },
};

// ─── Next.js Link pattern ─────────────────────────────────────────────────────

/**
 * **Next.js** usage pattern.
 *
 * In a real Next.js app:
 * ```tsx
 * import NextLink from 'next/link';
 *
 * <Link component={NextLink} href="/about">About</Link>
 * ```
 *
 * Next.js 13+ `Link` renders a native `<a>` under the hood and accepts standard
 * `href` — no `legacyBehavior` wrapper needed.
 */
export const NextJsPattern: Story = {
  render: (args) => {
    // Simulate a Next.js Link shape (no actual routing)
    const SimulatedNextLink = ({ children, href, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      // In real usage this would be `import NextLink from 'next/link'`
      <a {...rest} href={href} data-router="next/link">
        {children}
      </a>
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ fontSize: '0.8rem', color: '#737373', margin: '0 0 8px' }}>
          Pattern: <code>{'<Link component={NextLink} href="/about">'}</code>
        </p>
        <Link
          {...args}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          component={SimulatedNextLink as any}
          href="/about"
          color="primary"
        >
          Next.js — /about
        </Link>
        <Link
          {...args}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          component={SimulatedNextLink as any}
          href="/blog"
          color="secondary"
          rightIcon={<ArrowIcon />}
        >
          Next.js — /blog with icon
        </Link>
        <Link
          {...args}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          component={SimulatedNextLink as any}
          href="/admin"
          disabled
          color="neutral"
        >
          Next.js — disabled (will NOT navigate)
        </Link>
      </div>
    );
  },
};

// ─── ThemeProvider global linkComponent ──────────────────────────────────────

/**
 * Set the **global** routing component once via `ThemeProvider.linkComponent`.
 * Every `<Link>` in the tree then uses it automatically — no per-instance `component` prop needed.
 *
 * ```tsx
 * import { Link as RouterLink } from 'react-router-dom';
 *
 * <ThemeProvider linkComponent={RouterLink}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const GlobalLinkComponent: Story = {
  decorators: [
    (Story) => {
      const GlobalSimulatedLink = ({ children, href, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a {...rest} href={href} data-router="global">
          {children}
        </a>
      );
      return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <ThemeProvider linkComponent={GlobalSimulatedLink as any}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ fontSize: '0.8rem', color: '#737373', margin: '0 0 8px' }}>
        No <code>component</code> prop needed — ThemeProvider supplies it globally.
      </p>
      <Link {...args} href="/home" color="primary">Home</Link>
      <Link {...args} href="/docs" color="secondary">Documentation</Link>
      <Link {...args} href="/contact" external color="neutral" rightIcon={<ExternalIcon />}>
        External (forces native &lt;a&gt; regardless of global component)
      </Link>
    </div>
  ),
};

// ─── Dark Mode ────────────────────────────────────────────────────────────────

/** All colour tokens under `data-theme="dark"`. */
export const DarkMode: Story = {
  render: (args) => (
    <div data-theme="dark" style={{ background: '#0a0a0a', padding: 24, borderRadius: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {(['primary', 'secondary', 'neutral'] as LinkProps['color'][]).map((c) => (
          <Link key={c} {...args} color={c}>
            color=&quot;{c}&quot; — dark mode
          </Link>
        ))}
        <Link {...args} color="primary" disabled>Disabled (dark mode)</Link>
        <Link {...args} color="primary" external href="https://example.com" rightIcon={<ExternalIcon />}>
          External (dark mode)
        </Link>
      </div>
    </div>
  ),
};

// ─── Enterprise nav bar pattern ───────────────────────────────────────────────

/** Realistic horizontal navigation bar built entirely from Link primitives. */
export const NavigationBar: Story = {
  render: () => (
    <nav
      role="navigation"
      aria-label="Main navigation"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '12px 24px',
        background: '#ffffff',
        borderBottom: '1px solid #e5e5e5',
        borderRadius: 8,
      }}
    >
      <Link href="#" variant="h6" color="primary" noUnderline style={{ marginRight: 'auto' }}>
        Luxis UI
      </Link>
      {['Home', 'Components', 'Theming', 'Examples'].map((label) => (
        <Link key={label} href="#" variant="body2" color="neutral" noUnderline>
          {label}
        </Link>
      ))}
      <Link href="https://github.com" external variant="body2" color="neutral" noUnderline rightIcon={<ExternalIcon />}>
        GitHub
      </Link>
    </nav>
  ),
};
