import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Input, ThemeProvider } from '@luxis-ui/react';
import {
  SearchIcon,
  UserIcon,
  InboxIcon,
  MapPinIcon,
  PhoneIcon,
  CalendarIcon,
  InfoIcon,
} from '@luxis-ui/react';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '24px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label text above the input' },
    helperText: { control: 'text', description: 'Helper text below the input' },
    error: { control: 'text', description: 'Error message (shows error state)' },
    success: { control: 'text', description: 'Success message (shows success state)' },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Input size' },
    fullWidth: { control: 'boolean', description: 'Full width input' },
    leftIcon: { control: false, description: 'Icon at start' },
    rightIcon: { control: false, description: 'Icon at end' },
    clearable: { control: 'boolean', description: 'Show clear button when value is present' },
    onClear: { control: false, description: 'Callback for clear button' },
    showCount: { control: 'boolean', description: 'Show character counter (requires maxLength)' },
    maxLength: { control: 'number', description: 'Maximum input length' },
    prefix: { control: 'text', description: 'Prefix text before value' },
    suffix: { control: 'text', description: 'Suffix text after value' },
    disabled: { control: 'boolean', description: 'Disable input' },
    required: { control: 'boolean', description: 'Mark as required' },
    value: { control: 'text', description: 'Input value' },
    onChange: { control: false, description: 'Change handler' },
    type: { control: 'text', description: 'Input type (text, email, password, etc.)' },
    placeholder: { control: 'text', description: 'Placeholder text' },
  },
  args: {
    label: 'Label',
    placeholder: 'Enter text',
    size: 'md',
    fullWidth: false,
    clearable: false,
    showCount: false,
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// ── Playground ───────────────────────────────────────────────────────────────
export const Default: Story = {
  args: {},
};

// ── All Variants Overview ─────────────────────────────────────────────────────
export const AllVariants: Story = {
  render: () => {
    const [search, setSearch] = useState('');
    const [bio, setBio] = useState('');
    const [phone, setPhone] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, maxWidth: 480 }}>

        {/* States */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#737373', margin: '0 0 12px' }}>States</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Input label="Default" placeholder="Enter value" />
            <Input label="With helper text" placeholder="Enter email" helperText="We'll never share your email." />
            <Input label="Error" placeholder="Enter username" error="Username is already taken." />
            <Input label="Success" placeholder="Enter email" success="Email is available." />
            <Input label="Disabled" placeholder="Cannot edit" disabled value="john.doe@company.com" />
            <Input label="Required field" placeholder="Enter full name" required />
          </div>
        </section>

        {/* Sizes */}
        <section>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#737373', margin: '0 0 12px' }}>Sizes</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Input label="Small" size="sm" placeholder="Small input" />
            <Input label="Medium" size="md" placeholder="Medium input" />
            <Input label="Large" size="lg" placeholder="Large input" />
          </div>
        </section>

        {/* With Icons */}
        <section>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#737373', margin: '0 0 12px' }}>With Icons</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Input
              label="Search"
              leftIcon={<SearchIcon />}
              placeholder="Search anything..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              clearable
              onClear={() => setSearch('')}
            />
            <Input
              label="Email address"
              leftIcon={<InboxIcon />}
              type="email"
              placeholder="you@company.com"
            />
            <Input
              label="Full name"
              leftIcon={<UserIcon />}
              placeholder="John Doe"
            />
            <Input
              label="Date"
              rightIcon={<CalendarIcon />}
              placeholder="DD / MM / YYYY"
            />
            <Input
              label="Info"
              rightIcon={<InfoIcon />}
              placeholder="Enter value"
              helperText="Hover the icon for more details."
            />
          </div>
        </section>

        {/* Prefix & Suffix */}
        <section>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#737373', margin: '0 0 12px' }}>Prefix & Suffix</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Input label="Price" prefix="$" placeholder="0.00" type="number" />
            <Input label="Website" prefix="https://" placeholder="yourdomain.com" />
            <Input label="Weight" suffix="kg" placeholder="0.00" type="number" />
            <Input label="Domain" prefix="www." suffix=".com" placeholder="yourdomain" />
          </div>
        </section>

        {/* Clearable */}
        <section>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#737373', margin: '0 0 12px' }}>Clearable</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Input
              label="Phone number"
              leftIcon={<PhoneIcon />}
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              clearable
              onClear={() => setPhone('')}
            />
          </div>
        </section>

        {/* Character Counter */}
        <section>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#737373', margin: '0 0 12px' }}>Character Counter</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Input
              label="Short bio"
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={80}
              showCount
              helperText="A short summary shown on your public profile."
            />
          </div>
        </section>

        {/* Full width */}
        <section>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#737373', margin: '0 0 12px' }}>Full Width</p>
          <Input
            label="Address"
            leftIcon={<MapPinIcon />}
            placeholder="Enter your full address"
            fullWidth
          />
        </section>

      </div>
    );
  },
  parameters: { layout: 'fullscreen' },
};

// ── Controlled ────────────────────────────────────────────────────────────────
const ControlledInputStory = (args: React.ComponentProps<typeof Input>) => {
  const [value, setValue] = useState('');
  return (
    <Input
      {...args}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  );
};

export const Controlled: Story = {
  render: (args) => <ControlledInputStory {...args} />,
  args: {
    label: 'Controlled',
    placeholder: 'Type something...',
  },
};

// ── Validation States ─────────────────────────────────────────────────────────
export const ValidationStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <Input label="Error state" error="This field is required." placeholder="Enter value" />
      <Input label="Error with value" error="Username is already taken." value="john.doe" />
      <Input label="Success state" success="Email is available." value="available@company.com" />
    </div>
  ),
};

// ── With Icons ────────────────────────────────────────────────────────────────
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <Input label="Search" leftIcon={<SearchIcon />} placeholder="Search..." />
      <Input label="Email" leftIcon={<InboxIcon />} type="email" placeholder="you@company.com" />
      <Input label="Location" leftIcon={<MapPinIcon />} placeholder="City, Country" />
      <Input label="Schedule" rightIcon={<CalendarIcon />} placeholder="DD / MM / YYYY" />
    </div>
  ),
};

// ── Prefix & Suffix ───────────────────────────────────────────────────────────
export const WithPrefixSuffix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <Input label="Price (USD)" prefix="$" placeholder="0.00" type="number" />
      <Input label="Website URL" prefix="https://" placeholder="yourdomain.com" />
      <Input label="Weight" suffix="kg" placeholder="0.00" type="number" />
      <Input label="Speed" suffix="km/h" placeholder="0" type="number" />
      <Input label="Domain" prefix="www." suffix=".com" placeholder="yourdomain" />
    </div>
  ),
};

// ── Clearable ─────────────────────────────────────────────────────────────────
const ClearableInputStory = (args: React.ComponentProps<typeof Input>) => {
  const [value, setValue] = useState('Clear me');
  return (
    <Input
      {...args}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      clearable
      onClear={() => setValue('')}
    />
  );
};

export const Clearable: Story = {
  render: (args) => <ClearableInputStory {...args} />,
  args: {
    label: 'Clearable input',
    placeholder: 'Type to add value...',
    leftIcon: <SearchIcon />,
  },
};

// ── Character Counter ─────────────────────────────────────────────────────────
const CounterInputStory = (args: React.ComponentProps<typeof Input>) => {
  const [value, setValue] = useState('');
  return (
    <Input
      {...args}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      maxLength={80}
      showCount
    />
  );
};

export const WithCounter: Story = {
  render: (args) => <CounterInputStory {...args} />,
  args: {
    label: 'Short bio',
    placeholder: 'Tell us about yourself...',
    helperText: 'Visible on your public profile.',
    fullWidth: true,
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <Input label="Small" size="sm" placeholder="Small (32px)" leftIcon={<SearchIcon />} />
      <Input label="Medium" size="md" placeholder="Medium (40px)" leftIcon={<SearchIcon />} />
      <Input label="Large" size="lg" placeholder="Large (48px)" leftIcon={<SearchIcon />} />
    </div>
  ),
};

// ── Disabled & Required ───────────────────────────────────────────────────────
export const DisabledAndRequired: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <Input label="Disabled (empty)" disabled placeholder="Cannot edit" />
      <Input label="Disabled (with value)" disabled value="john.doe@company.com" leftIcon={<InboxIcon />} />
      <Input label="Required field" required placeholder="This field cannot be empty" />
    </div>
  ),
};

// ── Real-world Form Example ───────────────────────────────────────────────────
export const RealWorldForm: Story = {
  render: () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', website: '' });
    const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#171717' }}>Company Information</h3>
        <Input
          label="Full name"
          leftIcon={<UserIcon />}
          placeholder="John Doe"
          value={form.name}
          onChange={set('name')}
          required
          fullWidth
        />
        <Input
          label="Work email"
          leftIcon={<InboxIcon />}
          type="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={set('email')}
          required
          fullWidth
        />
        <Input
          label="Phone number"
          leftIcon={<PhoneIcon />}
          placeholder="+1 (555) 000-0000"
          value={form.phone}
          onChange={set('phone')}
          clearable
          onClear={() => setForm((prev) => ({ ...prev, phone: '' }))}
          fullWidth
        />
        <Input
          label="Company website"
          prefix="https://"
          placeholder="yourcompany.com"
          value={form.website}
          onChange={set('website')}
          helperText="Include your main marketing or product page."
          fullWidth
        />
      </div>
    );
  },
  parameters: { layout: 'fullscreen' },
};
