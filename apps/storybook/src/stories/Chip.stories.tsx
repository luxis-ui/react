import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Chip, ThemeProvider, InfoIcon, CheckCircleIcon, WarningIcon, ErrorIcon, BellIcon } from '@luxis-ui/react';
import type { ChipProps } from '@luxis-ui/react';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
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
    label: {
      control: 'text',
      description: 'The label text displayed inside the chip',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'light'],
      description: 'Visual style variant',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'error', 'warning', 'info'],
      description: 'Color theme',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state — prevents all interactions',
    },
    icon: {
      control: false,
      description: 'Icon node to display at the start of the chip',
    },
    avatar: {
      control: 'text',
      description: 'Avatar image URL to display at the start',
    },
    onDelete: {
      control: false,
      description: 'Callback when the delete button is clicked. Shows the delete button when provided.',
    },
    onClick: {
      control: false,
      description: 'Callback when the chip is clicked. Makes the chip interactive.',
    },
    'aria-label': {
      control: 'text',
      description: 'Custom accessible label (falls back to label prop)',
    },
  },
  args: {
    label: 'Chip',
    size: 'md',
    variant: 'filled',
    color: 'default',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: 'Default Chip',
  },
};

// ─── Colors ───────────────────────────────────────────────────────────────────

export const AllColors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
      <Chip {...args} color="default" label="Default" />
      <Chip {...args} color="primary" label="Primary" />
      <Chip {...args} color="success" label="Success" />
      <Chip {...args} color="error" label="Error" />
      <Chip {...args} color="warning" label="Warning" />
      <Chip {...args} color="info" label="Info" />
    </div>
  ),
  args: {
    variant: 'filled',
    size: 'md',
  },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {(['filled', 'outlined', 'light'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', minWidth: '4.5rem', color: 'var(--lxs-color-neutral-500)' }}>
            {variant}
          </span>
          {(['default', 'primary', 'success', 'error', 'warning', 'info'] as const).map((color) => (
            <Chip key={color} {...args} variant={variant} color={color} label={color.charAt(0).toUpperCase() + color.slice(1)} />
          ))}
        </div>
      ))}
    </div>
  ),
  args: { size: 'md' },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <Chip {...args} size="sm" label="Small" />
      <Chip {...args} size="md" label="Medium" />
      <Chip {...args} size="lg" label="Large" />
    </div>
  ),
  args: {
    variant: 'filled',
    color: 'primary',
  },
};

// ─── With Icon ────────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
      <Chip {...args} icon={<InfoIcon />} color="info" label="Information" />
      <Chip {...args} icon={<CheckCircleIcon />} color="success" label="Verified" />
      <Chip {...args} icon={<WarningIcon />} color="warning" label="Attention" />
      <Chip {...args} icon={<ErrorIcon />} color="error" label="Critical" />
      <Chip {...args} icon={<BellIcon />} color="primary" label="Notification" />
    </div>
  ),
  args: { variant: 'light', size: 'md' },
};

// ─── With Avatar ──────────────────────────────────────────────────────────────

export const WithAvatar: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
      <Chip
        {...args}
        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice"
        label="Alice"
        variant="outlined"
        color="default"
      />
      <Chip
        {...args}
        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob"
        label="Bob"
        variant="outlined"
        color="primary"
      />
      <Chip
        {...args}
        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie"
        label="Charlie"
        variant="outlined"
        color="info"
      />
    </div>
  ),
  args: { size: 'md' },
};

// ─── Deletable ────────────────────────────────────────────────────────────────

const initialChips = [
  { id: 1, label: 'React', color: 'primary' as const },
  { id: 2, label: 'TypeScript', color: 'info' as const },
  { id: 3, label: 'Node.js', color: 'success' as const },
  { id: 4, label: 'GraphQL', color: 'warning' as const },
  { id: 5, label: 'Docker', color: 'error' as const },
];

const DeletableStory = (args: ChipProps) => {
  const [chips, setChips] = useState(initialChips);
  const removeChip = (id: number) => setChips((prev) => prev.filter((c) => c.id !== id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--lxs-color-neutral-600)' }}>
        Click ✕ or press <kbd>Delete</kbd>/<kbd>Backspace</kbd> when a chip is focused to remove it.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {chips.length === 0 ? (
          <span style={{ fontSize: '0.875rem', color: 'var(--lxs-color-neutral-400)' }}>All chips removed.</span>
        ) : (
          chips.map((chip) => (
            <Chip
              key={chip.id}
              {...args}
              label={chip.label}
              color={chip.color}
              onDelete={() => removeChip(chip.id)}
            />
          ))
        )}
      </div>
      {chips.length < 5 && (
        <button
          style={{
            alignSelf: 'flex-start',
            padding: '0.25rem 0.75rem',
            fontSize: '0.75rem',
            cursor: 'pointer',
            borderRadius: '6px',
            border: '1px solid var(--lxs-color-border)',
            background: 'transparent',
          }}
          onClick={() => setChips(initialChips)}
        >
          Reset
        </button>
      )}
    </div>
  );
};

export const Deletable: Story = {
  render: (args) => <DeletableStory {...args} />,
  args: { variant: 'light', size: 'md' },
};

// ─── Clickable ────────────────────────────────────────────────────────────────

const clickableOptions = [
  { value: 'default', label: 'All', color: 'default' as const },
  { value: 'primary', label: 'Primary', color: 'primary' as const },
  { value: 'success', label: 'Active', color: 'success' as const },
  { value: 'warning', label: 'Pending', color: 'warning' as const },
  { value: 'error', label: 'Failed', color: 'error' as const },
];

const ClickableStory = (args: ChipProps) => {
  const [selected, setSelected] = useState<string | null>('primary');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--lxs-color-neutral-600)' }}>
        Click a chip to select it as an active filter.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {clickableOptions.map((opt) => (
          <Chip
            key={opt.value}
            {...args}
            label={opt.label}
            color={opt.color}
            variant={selected === opt.value ? 'filled' : 'outlined'}
            onClick={() => setSelected(opt.value)}
            aria-label={`Filter by ${opt.label}`}
          />
        ))}
      </div>
      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--lxs-color-neutral-500)' }}>
        Selected: <strong>{clickableOptions.find((o) => o.value === selected)?.label ?? 'None'}</strong>
      </p>
    </div>
  );
};

export const Clickable: Story = {
  render: (args) => <ClickableStory {...args} />,
  args: { size: 'md' },
};

// ─── Filter Group (real-world) ────────────────────────────────────────────────

const allTags = [
  { id: 'react', label: 'React', color: 'primary' as const },
  { id: 'vue', label: 'Vue', color: 'success' as const },
  { id: 'angular', label: 'Angular', color: 'error' as const },
  { id: 'svelte', label: 'Svelte', color: 'warning' as const },
  { id: 'next', label: 'Next.js', color: 'info' as const },
  { id: 'remix', label: 'Remix', color: 'default' as const },
];

const FilterGroupStory = () => {
  const [active, setActive] = useState<Set<string>>(new Set(['react', 'next']));

  const toggle = (id: string) =>
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Filter by framework</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {allTags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.label}
              color={tag.color}
              variant={active.has(tag.id) ? 'filled' : 'light'}
              size="sm"
              onClick={() => toggle(tag.id)}
              onDelete={active.has(tag.id) ? () => toggle(tag.id) : undefined}
              aria-label={`${active.has(tag.id) ? 'Remove' : 'Add'} ${tag.label} filter`}
            />
          ))}
        </div>
      </div>
      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--lxs-color-neutral-500)' }}>
        Active filters:{' '}
        {active.size === 0
          ? 'None'
          : allTags
              .filter((t) => active.has(t.id))
              .map((t) => t.label)
              .join(', ')}
      </p>
    </div>
  );
};

export const FilterGroup: Story = {
  name: 'Filter Group (Real-world)',
  render: () => <FilterGroupStory />,
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
      <Chip {...args} label="Filled" variant="filled" color="primary" />
      <Chip {...args} label="Outlined" variant="outlined" color="primary" />
      <Chip {...args} label="Light" variant="light" color="primary" />
      <Chip {...args} label="With Delete" variant="filled" color="default" onDelete={() => {}} />
    </div>
  ),
  args: { disabled: true, size: 'md' },
};
