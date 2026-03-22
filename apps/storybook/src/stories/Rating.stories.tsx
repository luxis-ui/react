import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Rating, ThemeProvider } from '@luxis-ui/react';

const sectionLabel = (text: string) => (
  <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#737373', margin: '0 0 12px' }}>
    {text}
  </p>
);

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '24px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
      description: 'Current rating value (0 – max)',
    },
    max: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum number of stars',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Star size',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'neutral'],
      description: 'Filled star color',
    },
    selectable: {
      control: 'boolean',
      description: 'Allow user to click and select a rating',
    },
    allowHalf: {
      control: 'boolean',
      description: 'Enable half-star precision',
    },
    showValue: {
      control: 'boolean',
      description: 'Show numeric value beside the stars',
    },
    readOnly: {
      control: 'boolean',
      description: 'Read-only — ignores clicks even when selectable',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    filledIcon: { control: false, description: 'Custom filled star icon' },
    emptyIcon: { control: false, description: 'Custom empty star icon' },
    halfIcon: { control: false, description: 'Custom half star icon' },
    onChange: { control: false, description: 'Change callback (selectable only)' },
    valueFormat: { control: false, description: 'Custom value formatter' },
  },
  args: {
    value: 3,
    max: 5,
    size: 'md',
    color: 'warning',
    selectable: false,
    allowHalf: false,
    showValue: false,
    readOnly: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

// ── Playground ────────────────────────────────────────────────────────────────
/** Fully interactive — tweak every prop from the Controls panel. */
export const Playground: Story = {};

// ── Display ───────────────────────────────────────────────────────────────────
/** Read-only display with a fixed value and numeric label. */
export const Display: Story = {
  args: { value: 4.5, allowHalf: true, showValue: true },
};

// ── Selectable ────────────────────────────────────────────────────────────────
const SelectableDemo = (args: ComponentProps<typeof Rating>) => {
  const [val, setVal] = useState(3);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Rating {...args} value={val} selectable onChange={setVal} />
      <span style={{ fontSize: 13, color: '#525252' }}>Selected: {val} / {args.max}</span>
    </div>
  );
};
/** Click the stars to choose a rating. */
export const Selectable: Story = { render: (args) => <SelectableDemo {...args} /> };

// ── Half Stars ────────────────────────────────────────────────────────────────
const HalfStarsDemo = (args: ComponentProps<typeof Rating>) => {
  const [val, setVal] = useState(3.5);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Rating {...args} value={val} selectable allowHalf showValue onChange={setVal} />
      <span style={{ fontSize: 13, color: '#525252' }}>Selected: {val}</span>
    </div>
  );
};
/** Hover over the left half of a star for 0.5-step precision. */
export const HalfStars: Story = {
  render: (args) => <HalfStarsDemo {...args} />,
  args: { allowHalf: true, showValue: true },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────
/** All four sizes displayed together. */
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 24, fontSize: 12, color: '#737373' }}>{s}</span>
          <Rating {...args} size={s} value={4} />
        </div>
      ))}
    </div>
  ),
};

// ── Colors ────────────────────────────────────────────────────────────────────
/** All six color options. */
export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['warning', 'primary', 'secondary', 'success', 'error', 'neutral'] as const).map((c) => (
        <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 72, fontSize: 12, color: '#737373' }}>{c}</span>
          <Rating {...args} color={c} value={4} />
        </div>
      ))}
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────
/** Default, read-only, and disabled states side-by-side. */
export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {sectionLabel('Default (selectable)')}
      <Rating {...args} value={3} selectable />

      {sectionLabel('Read-only')}
      <Rating {...args} value={3} selectable readOnly />

      {sectionLabel('Disabled')}
      <Rating {...args} value={3} selectable disabled />
    </div>
  ),
};

// ── Custom Max ────────────────────────────────────────────────────────────────
/** 10-star rating scale. */
export const CustomMax: Story = {
  args: { max: 10, value: 7, showValue: true, size: 'sm' },
};

// ── Custom Value Format ───────────────────────────────────────────────────────
/** Using a custom formatter for the displayed value. */
export const CustomValueFormat: Story = {
  args: {
    value: 4,
    showValue: true,
    valueFormat: (v) => `${v} / 5 stars`,
  },
};

// ── All Variants Overview ─────────────────────────────────────────────────────
const AllVariantsDemo = () => {
  const [interactive, setInteractive] = useState(3);
  const [half, setHalf] = useState(2.5);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 480 }}>

        <section>
          {sectionLabel('Display (read-only)')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Rating value={5} />
            <Rating value={3.5} allowHalf showValue />
            <Rating value={4.2} allowHalf showValue valueFormat={(v) => `${v}/5`} />
          </div>
        </section>

        <section>
          {sectionLabel('Selectable')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Rating value={interactive} selectable onChange={setInteractive} />
            <Rating value={half} selectable allowHalf showValue onChange={setHalf} />
          </div>
        </section>

        <section>
          {sectionLabel('Sizes')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
              <Rating key={s} value={4} size={s} />
            ))}
          </div>
        </section>

        <section>
          {sectionLabel('Colors')}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {(['warning', 'primary', 'success', 'error'] as const).map((c) => (
              <Rating key={c} value={4} color={c} size="sm" />
            ))}
          </div>
        </section>

        <section>
          {sectionLabel('States')}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Rating value={4} selectable />
              <span style={{ fontSize: 11, color: '#737373' }}>Default</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Rating value={4} selectable readOnly />
              <span style={{ fontSize: 11, color: '#737373' }}>Read-only</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Rating value={4} selectable disabled />
              <span style={{ fontSize: 11, color: '#737373' }}>Disabled</span>
            </div>
          </div>
        </section>

      </div>
    );
};
/** Full feature showcase. */
export const AllVariants: Story = { render: () => <AllVariantsDemo /> };
