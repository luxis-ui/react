import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Select, ThemeProvider } from '@luxis-ui/react';
import type { SelectOption } from '@luxis-ui/react';

// ── Sample data ───────────────────────────────────────────────────────────────
const countries: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
];

const frameworks: SelectOption[] = [
  { value: 'react', label: 'React', group: 'Frontend' },
  { value: 'vue', label: 'Vue', group: 'Frontend' },
  { value: 'angular', label: 'Angular', group: 'Frontend' },
  { value: 'svelte', label: 'Svelte', group: 'Frontend' },
  { value: 'node', label: 'Node.js', group: 'Backend' },
  { value: 'django', label: 'Django', group: 'Backend' },
  { value: 'rails', label: 'Ruby on Rails', group: 'Backend' },
  { value: 'spring', label: 'Spring Boot', group: 'Backend' },
];

const statusOptions: SelectOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'suspended', label: 'Suspended', disabled: true },
  { value: 'archived', label: 'Archived', disabled: true },
];

// Custom option shape for getters demo
interface Product {
  id: string;
  name: string;
  category: string;
  outOfStock: boolean;
}
const products: Product[] = [
  { id: 'p1', name: 'Laptop Pro', category: 'Electronics', outOfStock: false },
  { id: 'p2', name: 'Wireless Mouse', category: 'Electronics', outOfStock: false },
  { id: 'p3', name: 'USB-C Hub', category: 'Accessories', outOfStock: true },
  { id: 'p4', name: 'Monitor Stand', category: 'Furniture', outOfStock: false },
  { id: 'p5', name: 'Keyboard', category: 'Electronics', outOfStock: false },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ maxWidth: 400, padding: 24 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    success: { control: 'text' },
    placeholder: { control: 'text' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    fullWidth: { control: 'boolean' },
    grouped: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    options: { control: false },
    getOptionLabel: { control: false },
    getOptionValue: { control: false },
    getOptionDisabled: { control: false },
    getOptionGroup: { control: false },
    onSelectChange: { control: false },
    defaultValue: { control: 'text' },
  },
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countries,
    size: 'md',
    fullWidth: false,
    disabled: false,
    required: false,
    loading: false,
    grouped: false,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// ── Playground ────────────────────────────────────────────────────────────────
/** Explore all props in the Controls panel. */
export const Playground: Story = {};

// ── Default ───────────────────────────────────────────────────────────────────
/** Basic usage with label and placeholder. */
export const Default: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countries,
  },
};

// ── With Helper Text ──────────────────────────────────────────────────────────
export const WithHelperText: Story = {
  args: {
    label: 'Country',
    helperText: 'Choose the country of your billing address.',
    options: countries,
    placeholder: 'Select a country',
  },
};

// ── Validation States ─────────────────────────────────────────────────────────
export const ValidationStates: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Select {...args} label="No state" placeholder="Select..." options={countries} />
      <Select {...args} label="Error" error="Please select a valid country." options={countries} defaultValue="" placeholder="Select..." />
      <Select {...args} label="Success" success="Looks good!" options={countries} defaultValue="fr" />
    </div>
  ),
};

// ── Grouped Options ───────────────────────────────────────────────────────────
/** Use `grouped` with options that have a `group` field. */
export const Grouped: Story = {
  args: {
    label: 'Framework',
    placeholder: 'Select a framework',
    options: frameworks,
    grouped: true,
    helperText: 'Options are grouped by tier.',
  },
};

// ── Change Callback ───────────────────────────────────────────────────────────
const WithChangeCallbackDemo = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [option, setOption] = useState<SelectOption | undefined>(undefined);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Select
        label="Status"
        placeholder="Pick a status"
        options={statusOptions}
        onSelectChange={(val, opt) => {
          setSelected(val);
          setOption(opt);
        }}
      />
      {selected && (
        <div style={{ fontSize: 13, color: '#374151', background: '#f3f4f6', borderRadius: 8, padding: '10px 14px' }}>
          <strong>value:</strong> {selected}<br />
          <strong>label:</strong> {option?.label}
        </div>
      )}
    </div>
  );
};
/** `onSelectChange` provides the string value and the matching SelectOption. */
export const WithChangeCallback: Story = { render: () => <WithChangeCallbackDemo /> };

// ── Loading ───────────────────────────────────────────────────────────────────
export const Loading: Story = {
  args: {
    label: 'Country',
    placeholder: 'Loading options…',
    options: [],
    loading: true,
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <Select key={s} {...args} size={s} label={`Size: ${s}`} placeholder={`Select (${s})`} options={countries} />
      ))}
    </div>
  ),
};

// ── Full Width ────────────────────────────────────────────────────────────────
export const FullWidth: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: 24 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countries,
    fullWidth: true,
    helperText: 'Stretches to fill its container.',
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countries,
    disabled: true,
    helperText: 'This field cannot be changed.',
  },
};

// ── Required ──────────────────────────────────────────────────────────────────
export const Required: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countries,
    required: true,
    helperText: 'This field is required.',
  },
};

// ── Disabled Options ──────────────────────────────────────────────────────────
/** Individual options can be disabled via `disabled: true` in the option object. */
export const DisabledOptions: Story = {
  args: {
    label: 'Account Status',
    placeholder: 'Select a status',
    options: statusOptions,
    helperText: '"Suspended" and "Archived" are disabled.',
  },
};

// ── Custom Getters ────────────────────────────────────────────────────────────
/**
 * When your data doesn't use `value`/`label`/`disabled` field names,
 * use `getOptionLabel`, `getOptionValue`, `getOptionDisabled`, and `getOptionGroup`.
 */
export const CustomGetters: Story = {
  render: (args) => (
    <Select
      {...args}
      label="Product"
      placeholder="Select a product"
      options={products as unknown as SelectOption[]}
      grouped
      getOptionLabel={(opt: Product) => opt.name}
      getOptionValue={(opt: Product) => opt.id}
      getOptionDisabled={(opt: Product) => opt.outOfStock}
      getOptionGroup={(opt: Product) => opt.category}
      helperText="Out-of-stock items are disabled. Grouped by category."
    />
  ),
};

// ── Default Value ─────────────────────────────────────────────────────────────
/** Set an initial selection without controlling value explicitly. */
export const DefaultValue: Story = {
  args: {
    label: 'Country',
    options: countries,
    defaultValue: 'de',
    helperText: 'Germany is pre-selected.',
  },
};

// ── All Variants ──────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: 32 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
      <Select label="Default" placeholder="Select..." options={countries} />
      <Select label="With Helper" helperText="Helpful context here." placeholder="Select..." options={countries} />
      <Select label="Error State" error="This field is required." placeholder="Select..." options={countries} />
      <Select label="Success State" success="Looks good!" options={countries} defaultValue="fr" />
      <Select label="Disabled" disabled placeholder="Not available" options={countries} />
      <Select label="Loading" loading placeholder="Fetching options…" options={[]} />
      <Select label="Required *" required placeholder="Select a country" options={countries} />
      <Select label="Full Width" fullWidth placeholder="Spans container" options={countries} />
      <Select label="Small (sm)" size="sm" placeholder="Select..." options={countries} />
      <Select label="Large (lg)" size="lg" placeholder="Select..." options={countries} />
      <Select label="Grouped" grouped placeholder="Select a framework" options={frameworks} />
      <Select label="Disabled Options" placeholder="Select a status" options={statusOptions} />
    </div>
  ),
};
