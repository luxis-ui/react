import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { RichTextEditor, ThemeProvider } from '@luxis-ui/react';

const sectionLabel = (text: string) => (
  <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#737373', margin: '0 0 12px' }}>
    {text}
  </p>
);

const meta: Meta<typeof RichTextEditor> = {
  title: 'Components/RichTextEditor',
  component: RichTextEditor,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '24px', maxWidth: 760 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label above the editor' },
    helperText: { control: 'text', description: 'Helper text below the editor' },
    error: { control: 'text', description: 'Error message (error state)' },
    success: { control: 'text', description: 'Success message (success state)' },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Editor size' },
    fullWidth: { control: 'boolean', description: 'Take full container width' },
    clearable: { control: 'boolean', description: 'Show clear button when content is present' },
    showCount: { control: 'boolean', description: 'Show character counter' },
    maxLength: { control: 'number', description: 'Maximum character count' },
    required: { control: 'boolean', description: 'Mark field as required' },
    disabled: { control: 'boolean', description: 'Disable the editor' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    minHeight: { control: 'number', description: 'Minimum editor height (px)' },
    hideToolbar: { control: 'boolean', description: 'Hide the formatting toolbar' },
    value: { control: 'text', description: 'Controlled HTML content' },
    defaultValue: { control: 'text', description: 'Initial HTML content (uncontrolled)' },
    onChange: { control: false, description: 'Change callback — (html, text) => void' },
    onClear: { control: false, description: 'Clear callback' },
    onInsertLink: { control: false, description: 'Custom link-insert handler' },
    sanitize: { control: false, description: 'HTML sanitizer applied before setting value' },
    toolbarButtons: { control: false, description: 'Custom toolbar button list' },
    wrapperClassName: { control: false },
    labelClassName: { control: false },
    editorClassName: { control: false },
    toolbarClassName: { control: false },
  },
  args: {
    label: 'Content',
    placeholder: 'Start typing...',
    size: 'md',
    fullWidth: true,
    clearable: false,
    showCount: false,
    required: false,
    disabled: false,
    minHeight: 200,
    hideToolbar: false,
  },
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

// ── Playground ────────────────────────────────────────────────────────────────
/** Fully interactive — tweak every prop from the Controls panel. */
export const Playground: Story = {};

// ── Default ───────────────────────────────────────────────────────────────────
/** Minimal editor with label and placeholder. */
export const Default: Story = {
  args: {
    label: 'Article Content',
    placeholder: 'Start writing your article...',
  },
};

// ── With Helper Text ──────────────────────────────────────────────────────────
export const WithHelperText: Story = {
  args: {
    label: 'Product Description',
    helperText: 'Describe the product in detail. Markdown-style formatting is supported.',
    placeholder: 'Enter a rich product description...',
  },
};

// ── Validation States ─────────────────────────────────────────────────────────
/** Error and success states. */
export const ValidationStates: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {sectionLabel('Error')}
      <RichTextEditor
        {...args}
        label="Comment"
        error="Comment cannot be empty."
        placeholder="Write your comment..."
      />
      {sectionLabel('Success')}
      <RichTextEditor
        {...args}
        label="Bio"
        success="Bio saved successfully."
        defaultValue="<p>Hello! I'm a software engineer.</p>"
      />
    </div>
  ),
};

// ── Character Counter ─────────────────────────────────────────────────────────
const CharacterCounterDemo = (args: ComponentProps<typeof RichTextEditor>) => {
  const [html, setHtml] = useState('');
  return (
    <RichTextEditor
      {...args}
      label="Short Bio"
      placeholder="Write a short bio (max 300 characters)..."
      showCount
      maxLength={300}
      value={html}
      onChange={(h) => setHtml(h)}
      helperText="Used on your public profile."
    />
  );
};
/** Live character counter with a 300-character limit. */
export const WithCharacterCounter: Story = {
  render: (args) => <CharacterCounterDemo {...args} />,
  args: { showCount: true, maxLength: 300 },
};

// ── Clearable ─────────────────────────────────────────────────────────────────
const ClearableDemo = (args: ComponentProps<typeof RichTextEditor>) => {
  const [html, setHtml] = useState('<p>Edit me and then click the × button to clear.</p>');
  return (
    <RichTextEditor
      {...args}
      label="Draft"
      clearable
      value={html}
      onChange={(h) => setHtml(h)}
      onClear={() => setHtml('')}
    />
  );
};
/** Shows a clear-content button in the toolbar once content is added. */
export const Clearable: Story = {
  render: (args) => <ClearableDemo {...args} />,
  args: { clearable: true },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <RichTextEditor key={s} {...args} label={`Size: ${s}`} size={s} minHeight={120} />
      ))}
    </div>
  ),
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  args: {
    label: 'Archived Content',
    disabled: true,
    defaultValue: '<p>This content is locked and cannot be edited.</p>',
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

// ── Without Toolbar ───────────────────────────────────────────────────────────
/** Plain textarea-style editing with no formatting toolbar. */
export const WithoutToolbar: Story = {
  args: {
    label: 'Plain Notes',
    hideToolbar: true,
    placeholder: 'Write free-form notes...',
    minHeight: 160,
  },
};

// ── Custom Toolbar Buttons ────────────────────────────────────────────────────
/** Only expose the most common formatting buttons. */
export const CustomToolbarButtons: Story = {
  args: {
    label: 'Comment',
    toolbarButtons: ['bold', 'italic', 'underline', 'orderedList', 'unorderedList', 'link', 'undo', 'redo'],
    placeholder: 'Write a focused comment...',
  },
};

// ── Controlled ────────────────────────────────────────────────────────────────
/** Value driven externally — shows live HTML output beneath the editor. */
const ControlledDemo = (args: ComponentProps<typeof RichTextEditor>) => {
  const [html, setHtml] = useState('<p>Edit this content and watch the HTML update below.</p>');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <RichTextEditor
        {...args}
        label="Controlled Editor"
        value={html}
        onChange={(h) => setHtml(h)}
      />
      <section style={{ background: '#f5f5f5', borderRadius: 8, padding: '12px 16px' }}>
        <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: '#737373', margin: '0 0 8px' }}>HTML Output</p>
        <pre style={{ fontSize: 12, whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0, color: '#171717' }}>{html}</pre>
      </section>
    </div>
  );
};
/** Value driven externally -- shows live HTML output beneath the editor. */
export const Controlled: Story = { render: (args) => <ControlledDemo {...args} /> };

// ── All Variants Overview ─────────────────────────────────────────────────────
const AllVariantsDemo = () => {
  const [post, setPost] = useState('');
  const [bio, setBio] = useState('');

  return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

        <section>
          {sectionLabel('Basic')}
          <RichTextEditor label="Notes" placeholder="Start typing..." minHeight={150} />
        </section>

        <section>
          {sectionLabel('Controlled with counter')}
          <RichTextEditor
            label="Post Content"
            placeholder="Write your post..."
            value={post}
            onChange={(html) => setPost(html)}
            showCount
            maxLength={500}
            clearable
            onClear={() => setPost('')}
            helperText="Posts are visible publicly."
          />
        </section>

        <section>
          {sectionLabel('Validation states')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <RichTextEditor label="Error State" error="This field is required." minHeight={120} />
            <RichTextEditor
              label="Success State"
              success="Content saved."
              defaultValue="<p>Saved content.</p>"
              minHeight={120}
            />
          </div>
        </section>

        <section>
          {sectionLabel('Compact — custom toolbar, small size')}
          <RichTextEditor
            label="Bio"
            size="sm"
            minHeight={100}
            value={bio}
            onChange={(html) => setBio(html)}
            toolbarButtons={['bold', 'italic', 'link', 'clearFormat']}
            showCount
            maxLength={200}
            required
            placeholder="A short bio (max 200 chars)..."
          />
        </section>

        <section>
          {sectionLabel('Disabled')}
          <RichTextEditor label="Archived" disabled defaultValue="<p>Locked content.</p>" minHeight={100} />
        </section>

      </div>
    );
};
/** Full feature showcase. */
export const AllVariants: Story = { render: () => <AllVariantsDemo /> };
