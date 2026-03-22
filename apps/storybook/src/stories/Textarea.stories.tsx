import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Textarea, ThemeProvider } from '@luxis-ui/react';

const sectionLabel = (text: string) => (
  <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#737373', margin: '0 0 12px' }}>
    {text}
  </p>
);

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '24px', maxWidth: 560 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label above the textarea' },
    helperText: { control: 'text', description: 'Helper text below the textarea' },
    error: { control: 'text', description: 'Error message (error state)' },
    success: { control: 'text', description: 'Success message (success state)' },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Textarea size' },
    fullWidth: { control: 'boolean', description: 'Take full container width' },
    clearable: { control: 'boolean', description: 'Show clear button when content is present' },
    showCount: { control: 'boolean', description: 'Show character counter' },
    maxLength: { control: 'number', description: 'Maximum character count' },
    required: { control: 'boolean', description: 'Mark field as required' },
    disabled: { control: 'boolean', description: 'Disable the textarea' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    rows: { control: 'number', description: 'Number of visible text rows' },
    resize: { control: 'select', options: ['none', 'both', 'horizontal', 'vertical'], description: 'Resize behaviour' },
    autoResize: { control: 'boolean', description: 'Grow to fit content automatically' },
    value: { control: 'text', description: 'Controlled value' },
    onChange: { control: false, description: 'Change callback' },
    onClear: { control: false, description: 'Clear callback' },
    wrapperClassName: { control: false },
    labelClassName: { control: false },
    textareaClassName: { control: false },
  },
  args: {
    label: 'Message',
    placeholder: 'Start typing...',
    size: 'md',
    fullWidth: true,
    clearable: false,
    showCount: false,
    required: false,
    disabled: false,
    rows: 4,
    resize: 'vertical',
    autoResize: false,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

// ── Playground ────────────────────────────────────────────────────────────────
/** Fully interactive — tweak every prop from the Controls panel. */
export const Playground: Story = {};

// ── Default ───────────────────────────────────────────────────────────────────
/** Minimal textarea with label and placeholder. */
export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description...',
  },
};

// ── With Helper Text ──────────────────────────────────────────────────────────
export const WithHelperText: Story = {
  args: {
    label: 'Bio',
    helperText: 'Write a short bio displayed on your public profile.',
    placeholder: 'Tell us about yourself...',
  },
};

// ── Validation States ─────────────────────────────────────────────────────────
/** Error and success states. */
export const ValidationStates: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {sectionLabel('Error')}
      <Textarea
        {...args}
        label="Feedback"
        error="Feedback cannot be empty."
        placeholder="Share your thoughts..."
      />
      {sectionLabel('Success')}
      <Textarea
        {...args}
        label="Notes"
        success="Notes saved successfully."
        value="Looking good!"
      />
    </div>
  ),
};

// ── Character Counter — maxLength only ────────────────────────────────────────
/** Counter appears automatically when maxLength is set — no extra prop needed. */
const MaxLengthCounterDemo = (args: ComponentProps<typeof Textarea>) => {
  const [value, setValue] = useState('');
  return (
    <Textarea
      {...args}
      label="Short Bio"
      placeholder="Write a short bio (max 150 characters)..."
      maxLength={150}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      helperText="Displayed on your public profile."
    />
  );
};
/** Counter (x / 150) shown automatically just by setting maxLength. */
export const WithMaxLength: Story = {
  render: (args) => <MaxLengthCounterDemo {...args} />,
  args: { maxLength: 150 },
};

// ── Character Counter — showCount ─────────────────────────────────────────────
const ShowCountDemo = (args: ComponentProps<typeof Textarea>) => {
  const [value, setValue] = useState('');
  return (
    <Textarea
      {...args}
      label="Comment"
      placeholder="Write your comment..."
      showCount
      maxLength={300}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      helperText="Counter turns orange near the limit and red at the limit."
    />
  );
};
/** Live character counter with colour cues near and at the limit. */
export const WithCharacterCounter: Story = {
  render: (args) => <ShowCountDemo {...args} />,
  args: { showCount: true, maxLength: 300 },
};

// ── Clearable ─────────────────────────────────────────────────────────────────
const ClearableDemo = (args: ComponentProps<typeof Textarea>) => {
  const [value, setValue] = useState('Clear me using the × button in the top-right corner.');
  return (
    <Textarea
      {...args}
      label="Draft"
      clearable
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
    />
  );
};
/** Shows a clear button in the top-right corner when content is present. */
export const Clearable: Story = {
  render: (args) => <ClearableDemo {...args} />,
  args: { clearable: true },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <Textarea key={s} {...args} label={`Size: ${s}`} size={s} rows={3} />
      ))}
    </div>
  ),
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  args: {
    label: 'Archived Notes',
    disabled: true,
    value: 'This content is locked and cannot be edited.',
  },
};

// ── Required ──────────────────────────────────────────────────────────────────
export const Required: Story = {
  args: {
    label: 'Terms & Conditions',
    required: true,
    placeholder: 'You must provide this content...',
  },
};

// ── Resize Variants ───────────────────────────────────────────────────────────
/** Different resize handle behaviours. */
export const ResizeVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {(['none', 'vertical', 'horizontal', 'both'] as const).map((r) => (
        <Textarea key={r} {...args} label={`resize: ${r}`} resize={r} rows={3} />
      ))}
    </div>
  ),
};

// ── Auto Resize ───────────────────────────────────────────────────────────────
const AutoResizeDemo = (args: ComponentProps<typeof Textarea>) => {
  const [value, setValue] = useState('');
  return (
    <Textarea
      {...args}
      label="Auto-resize Notes"
      autoResize
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Keep typing — the textarea grows with your content..."
      rows={2}
    />
  );
};
/** Textarea grows vertically as the user types — no manual resize handle. */
export const AutoResize: Story = {
  render: (args) => <AutoResizeDemo {...args} />,
  args: { autoResize: true },
};

// ── Controlled ────────────────────────────────────────────────────────────────
const ControlledDemo = (args: ComponentProps<typeof Textarea>) => {
  const [value, setValue] = useState('Edit this content and watch the live output below.');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Textarea
        {...args}
        label="Controlled Textarea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={200}
      />
      <section style={{ background: '#f5f5f5', borderRadius: 8, padding: '12px 16px' }}>
        <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: '#737373', margin: '0 0 8px' }}>
          Current Value
        </p>
        <pre style={{ fontSize: 12, whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0, color: '#171717' }}>
          {value}
        </pre>
      </section>
    </div>
  );
};
/** Value driven externally — shows live output beneath the textarea. */
export const Controlled: Story = { render: (args) => <ControlledDemo {...args} /> };

// ── All Variants Overview ─────────────────────────────────────────────────────
const AllVariantsDemo = () => {
  const [bio, setBio] = useState('');
  const [feedback, setFeedback] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

      <section>
        {sectionLabel('Basic')}
        <Textarea label="Notes" placeholder="Start typing..." />
      </section>

      <section>
        {sectionLabel('States')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Textarea label="With helper text" helperText="This text gives the user a hint." placeholder="Enter text..." />
          <Textarea label="Error state" error="This field is required." rows={3} />
          <Textarea label="Success state" success="Saved successfully." value="Great content!" rows={3} />
          <Textarea label="Disabled" disabled value="This cannot be edited." rows={3} />
          <Textarea label="Required" required placeholder="Must fill this..." rows={3} />
        </div>
      </section>

      <section>
        {sectionLabel('Sizes')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {(['sm', 'md', 'lg'] as const).map((s) => (
            <Textarea key={s} label={`Size: ${s}`} size={s} rows={3} placeholder={`${s} textarea`} />
          ))}
        </div>
      </section>

      <section>
        {sectionLabel('Character counter — maxLength auto-shows counter')}
        <Textarea
          label="Short Bio"
          placeholder="Write a short bio..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={150}
          helperText="Counter appears automatically when maxLength is set."
        />
      </section>

      <section>
        {sectionLabel('Counter with colour cues')}
        <Textarea
          label="Feedback"
          placeholder="Your feedback..."
          showCount
          maxLength={100}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          clearable
          onClear={() => setFeedback('')}
          helperText="Counter turns orange at 90 % and red at 100 %."
        />
      </section>

      <section>
        {sectionLabel('Auto-resize')}
        <Textarea
          label="Expandable Notes"
          autoResize
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Keep typing to see the textarea grow..."
        />
      </section>

    </div>
  );
};
/** Full feature showcase. */
export const AllVariants: Story = { render: () => <AllVariantsDemo /> };
