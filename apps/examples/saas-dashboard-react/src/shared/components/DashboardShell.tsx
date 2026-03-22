import { useAuthStore } from '@/modules/auth';
import { Header, SideMenu, UserIcon, type NotificationItem, type SideMenuItemProps } from '@luxis-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, type ReactNode } from 'react';

// ─── Icons ─────────────────────────────────────────────────────────────────────
const LabIcon = () => (
  <Icon
    d="M7 2v6l-3 6v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6l-3-6V2"
    d2="M7 2h10"
  />
);
const Icon = ({ d, d2 }: { d: string; d2?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
    {d2 && <path d={d2} />}
  </svg>
);

const DashboardIcon = () => <Icon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />;
const SettingsIcon = () => (
  <Icon d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
);
const ProfileIcon = () => <Icon d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />;
const LogoutIcon = () => <Icon d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9" />;
// ─── Sidebar Logo ──────────────────────────────────────────────────────────────
function SidebarLogo({ collapsed }: { readonly collapsed: boolean }) {
  return (
    <div className="dash-shell__logo">
      <div className="dash-shell__logo-icon">L</div>
      {!collapsed && <span className="dash-shell__logo-text">Luxis UI</span>}
    </div>
  );
}

// ─── Sidebar Footer (user pill) ────────────────────────────────────────────────
function SidebarFooter({
  name,
  role,
  collapsed,
}: {
  readonly name?: string;
  readonly role?: string;
  readonly collapsed: boolean;
}) {
  const initials = name
    ? name
        .split(' ')
        .map((p) => p[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '??';

  return (
    <div className="dash-shell__user-pill">
      <div className="dash-shell__user-avatar" aria-hidden="true">
        {initials}
      </div>
      {!collapsed && (
        <div className="dash-shell__user-info">
          <span className="dash-shell__user-name">{name ?? 'Unknown'}</span>
          <span className="dash-shell__user-role">{role ?? 'User'}</span>
        </div>
      )}
    </div>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function deriveTitle(pathname: string): string {
  // Strip leading slash, split on '/', drop empty segments
  const segments = pathname.replace(/^\//, '').split('/').filter(Boolean);
  if (segments.length === 0) return 'Dashboard';
  return (segments.at(-1) ?? '')
    .replaceAll('-', ' ')
    .replaceAll(/\b\w/g, (c) => c.toUpperCase());
}

function isActive(pathname: string, href: string): boolean {
  return href === '/'
    ? pathname === '/'
    : pathname === href || pathname.startsWith(`${href}/`);
}

// ─── Nav config ───────────────────────────────────────────────────────────────
const SAMPLE_NOTIFICATIONS: NotificationItem[] = [
  { id: '1', title: 'New order received', description: 'Order #1024 is waiting for review.', time: '2m ago', type: 'info', read: false },
  { id: '2', title: 'Payment confirmed', description: 'Invoice #892 has been paid.', time: '15m ago', type: 'success', read: false },
  { id: '3', title: 'Low inventory alert', description: 'Product SKU-441 has only 3 units left.', time: '1h ago', type: 'warning', read: true },
  { id: '4', title: 'Deployment failed', description: 'CI pipeline failed on main branch.', time: '3h ago', type: 'error', read: true },
];

function buildNavItems(
  pathname: string,
  navigate: (href: string) => void,
): SideMenuItemProps[] {
  const item = (
    label: string,
    icon: ReactNode,
    href: string,
    badge?: string | number,
    sub?: Array<{ label: string; href: string; badge?: string | number }>,
  ): SideMenuItemProps => ({
    label,
    icon,
    href,
    badge,
    active: isActive(pathname, href),
    onClick: sub ? undefined : () => navigate(href),
    items: sub?.map((s) => ({
      label: s.label,
      href: s.href,
      badge: s.badge,
      active: isActive(pathname, s.href),
      onClick: () => navigate(s.href),
    })),
  });

 return [
  item('Dashboard', <DashboardIcon />, '/'),

  // High-Density Data Management (Shows off DataGrid/Table)
  item('Management', <UserIcon />, '/management', undefined, [
    { label: 'Team Members', href: '/management/team' },
    { label: 'Projects', href: '/management/projects', badge: 'Live' }, // Text badge
  ]),

  // Advanced Widgets
  item('Widgets', <DashboardIcon />, '/widgets'),

  // The Developer/UI Lab (CRITICAL for open-source library adoption) (CRITICAL for open-source library adoption)
  item('Component Lab', <LabIcon />, '/components', undefined, [
    { label: 'Base', href: '/components/base' },
    { label: 'Forms & Inputs', href: '/components/forms' },
    { label: 'Buttons', href: '/components/buttons' }
  ]),
  item('Error Pages', <LabIcon />, '/error', undefined, [
    { label: '404 Page', href: '/error/404' },
    { label: '500 Page', href: '/error/500' },
  ])
];
}

// ─── Shell ────────────────────────────────────────────────────────────────────
interface DashboardShellProps {
  readonly children: ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    navigate('/login', { replace: true });
  };

  const navItems = buildNavItems(pathname, navigate);

  return (
    <div className="dash-shell">
      {/* ── Sidebar ───────────────────────────────────────────────────────── */}
      <aside className="dash-shell__sidebar" aria-label="Main navigation">
        <SideMenu
          items={navItems}
          collapsed={collapsed}
          onCollapseToggle={setCollapsed}
          theme="dark"
          width="260px"
          collapsedWidth="72px"
          header={<SidebarLogo collapsed={collapsed} />}
          footer={
            <SidebarFooter
              name={user?.name}
              role={user?.role}
              collapsed={collapsed}
            />
          }
        />
      </aside>

      {/* ── Body: header + scrollable content ─────────────────────────────── */}
      <div className="dash-shell__body">
        <Header
          title={deriveTitle(pathname)}
          showToggle
          sticky
          onToggleSidebar={() => setCollapsed((c) => !c)}
          notifications={SAMPLE_NOTIFICATIONS}
          userName={user?.name}
          userSubtitle={user?.role}
          userAvatar={user?.avatarUrl}
          userMenuItems={[
            {
              label: 'Profile',
              icon: <ProfileIcon />,
              onClick: () => navigate('/profile'),
            },
            {
              label: 'Settings',
              icon: <SettingsIcon />,
              onClick: () => navigate('/settings/account'),
            },
            {
              label: 'Logout',
              icon: <LogoutIcon />,
              variant: 'danger',
              divider: true,
              onClick: handleLogout,
            },
          ]}
        />

        <main className="dash-shell__content" id="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
