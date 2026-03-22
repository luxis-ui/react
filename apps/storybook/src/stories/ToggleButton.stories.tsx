import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ToggleButton, ThemeProvider, type ToggleButtonProps } from '@luxis-ui/react';

const meta: Meta<typeof ToggleButton> = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    helperText: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
    },
    labelPlacement: {
      control: 'select',
      options: ['start', 'end', 'top', 'bottom'],
    },
    onChange: { action: 'changed' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: 32 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

// ─────────────────────────────────────────────
// 1. Playground — fully controlled via Controls
// ─────────────────────────────────────────────
const PlaygroundWrapper = (args: ToggleButtonProps) => {
  const [checked, setChecked] = useState(false);
  return (
    <ToggleButton
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

// ─────────────────────────────────────────────
// 2. Controlled toggle
// ─────────────────────────────────────────────
const ControlledDemo = () => {
  const [checked, setChecked] = useState(false);
  return (
    <ThemeProvider>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: 32 }}>
        <ToggleButton
          label={checked ? 'On' : 'Off'}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          variant="success"
        />
        <span style={{ fontSize: 13, color: '#6b7280' }}>
          State: <strong style={{ color: checked ? '#16a34a' : '#374151' }}>{checked ? 'checked' : 'unchecked'}</strong>
        </span>
      </div>
    </ThemeProvider>
  );
};

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

// ─────────────────────────────────────────────
// 3. Uncontrolled (no checked prop)
// ─────────────────────────────────────────────
export const Uncontrolled: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ padding: 32 }}>
        <ToggleButton label="Uncontrolled toggle" />
      </div>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 4. Sizes
// ─────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 32 }}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <ToggleButton
            key={size}
            size={size}
            label={`Size: ${size}`}
            defaultChecked={size === 'md'}
          />
        ))}
      </div>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 5. Variants
// ─────────────────────────────────────────────
export const Variants: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 32 }}>
        {(['primary', 'secondary', 'success', 'error', 'warning', 'info'] as const).map((variant) => (
          <ToggleButton
            key={variant}
            variant={variant}
            label={variant.charAt(0).toUpperCase() + variant.slice(1)}
            defaultChecked
          />
        ))}
      </div>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 6. Label Placements
// ─────────────────────────────────────────────
export const LabelPlacements: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, padding: 32, alignItems: 'flex-start' }}>
        {(['start', 'end', 'top', 'bottom'] as const).map((placement) => (
          <div key={placement} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1 }}>
              {placement}
            </span>
            <ToggleButton
              label={`Label ${placement}`}
              labelPlacement={placement}
              defaultChecked
            />
          </div>
        ))}
      </div>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 7. Disabled states
// ─────────────────────────────────────────────
export const Disabled: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 32 }}>
        <ToggleButton label="Disabled (unchecked)" disabled />
        <ToggleButton label="Disabled (checked)" disabled defaultChecked />
      </div>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 8. Error state with helper text
// ─────────────────────────────────────────────
export const ErrorState: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 32 }}>
        <ToggleButton
          label="Accept terms"
          error
          helperText="You must accept the terms to continue."
        />
        <ToggleButton
          label="Accept terms"
          error
          defaultChecked
          helperText="Terms accepted."
        />
      </div>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 9. With helper text
// ─────────────────────────────────────────────
export const WithHelperText: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 32 }}>
        <ToggleButton
          label="Email notifications"
          helperText="Receive updates via email."
          defaultChecked
        />
        <ToggleButton
          label="SMS notifications"
          helperText="Standard message rates may apply."
          variant="secondary"
        />
        <ToggleButton
          label="Marketing emails"
          helperText="We will never share your data."
          variant="info"
          defaultChecked
        />
      </div>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 10. With icons
// ─────────────────────────────────────────────
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-5a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1zM4.22 4.22a1 1 0 0 1 1.42 0l.7.71a1 1 0 1 1-1.41 1.41l-.71-.7a1 1 0 0 1 0-1.42zm13.36 13.36a1 1 0 0 1 1.42 0l.7.71a1 1 0 0 1-1.41 1.41l-.71-.7a1 1 0 0 1 0-1.42zM3 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm16 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1zM4.22 19.78a1 1 0 0 1 0-1.42l.71-.7a1 1 0 0 1 1.41 1.41l-.7.71a1 1 0 0 1-1.42 0zm13.36-13.36a1 1 0 0 1 0-1.42l.71-.7a1 1 0 1 1 1.41 1.41l-.7.71a1 1 0 0 1-1.42 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
  </svg>
);

const WithIconsDemo = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [wifi, setWifi] = useState(true);

  return (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 32 }}>
        <ToggleButton
          label="Dark Mode"
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
          icon={<SunIcon />}
          checkedIcon={<MoonIcon />}
          variant="secondary"
          size="lg"
        />
        <ToggleButton
          label="Wi-Fi"
          checked={wifi}
          onChange={(e) => setWifi(e.target.checked)}
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 0 0-6 0zm-4-4 2 2a7.074 7.074 0 0 1 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
          }
          variant="info"
        />
      </div>
    </ThemeProvider>
  );
};

export const WithIcons: Story = {
  render: () => <WithIconsDemo />,
};

// ─────────────────────────────────────────────
// 11. Settings panel (real-world)
// ─────────────────────────────────────────────
const SETTINGS = [
  { key: 'notifications', label: 'Push notifications', helperText: 'Get alerts for new activity.', defaultOn: true, variant: 'primary' as const },
  { key: 'emails', label: 'Marketing emails', helperText: 'Weekly digest and product updates.', defaultOn: false, variant: 'primary' as const },
  { key: 'analytics', label: 'Usage analytics', helperText: 'Help us improve by sharing anonymous data.', defaultOn: true, variant: 'info' as const },
  { key: 'beta', label: 'Beta features', helperText: 'Early access to experimental features.', defaultOn: false, variant: 'warning' as const },
  { key: 'twofa', label: 'Two-factor authentication', helperText: 'Adds an extra layer of security.', defaultOn: false, variant: 'success' as const },
];

const SettingsPanelDemo = () => {
  const [settings, setSettings] = useState<Record<string, boolean>>(
    Object.fromEntries(SETTINGS.map((s) => [s.key, s.defaultOn]))
  );

  const toggle = (key: string, on: boolean) =>
    setSettings((prev) => ({ ...prev, [key]: on }));

  const activeCount = Object.values(settings).filter(Boolean).length;

  return (
    <ThemeProvider>
      <div style={{ padding: 32, maxWidth: 480 }}>
        <div
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ padding: '16px 20px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>Notification Settings</p>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>
              {activeCount} of {SETTINGS.length} enabled
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {SETTINGS.map((setting, idx) => (
              <div
                key={setting.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 20px',
                  borderBottom: idx < SETTINGS.length - 1 ? '1px solid #f3f4f6' : 'none',
                }}
              >
                <div>
                  <p style={{ margin: 0, fontWeight: 500, fontSize: 14 }}>{setting.label}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: '#9ca3af' }}>{setting.helperText}</p>
                </div>
                <ToggleButton
                  checked={settings[setting.key]}
                  onChange={(e) => toggle(setting.key, e.target.checked)}
                  variant={setting.variant}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export const SettingsPanel: Story = {
  render: () => <SettingsPanelDemo />,
};

// ─────────────────────────────────────────────
// 12. Bulk toggle (select all style)
// ─────────────────────────────────────────────
const FEATURES = ['Dark mode', 'Compact layout', 'Animations', 'Sound effects'];

const BulkToggleDemo = () => {
  const [checks, setChecks] = useState<boolean[]>([true, false, true, false]);

  const allOn = checks.every(Boolean);
  const someOn = checks.some(Boolean);

  const toggleAll = (on: boolean) => setChecks(checks.map(() => on));
  const toggleOne = (i: number, on: boolean) =>
    setChecks((prev) => prev.map((v, idx) => (idx === i ? on : v)));

  return (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 32, maxWidth: 320 }}>
        <ToggleButton
          label={allOn ? 'Disable all' : someOn ? 'Enable remaining' : 'Enable all'}
          checked={allOn}
          onChange={(e) => toggleAll(e.target.checked)}
          variant="secondary"
          size="lg"
        />
        <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '4px 0' }} />
        {FEATURES.map((feature, i) => (
          <ToggleButton
            key={feature}
            label={feature}
            checked={checks[i]}
            onChange={(e) => toggleOne(i, e.target.checked)}
            size="sm"
          />
        ))}
      </div>
    </ThemeProvider>
  );
};

export const BulkToggle: Story = {
  render: () => <BulkToggleDemo />,
};
