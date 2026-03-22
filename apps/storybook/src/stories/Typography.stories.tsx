import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Typography, ThemeProvider } from '@luxis-ui/react';
import type { TypographyProps } from '@luxis-ui/react';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
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
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'subtitle1', 'subtitle2', 'caption', 'overline', 'button', 'label'],
      description: 'Typographic scale variant',
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div', 'label', 'strong', 'em', 'small'],
      description: 'Override the rendered HTML element',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'muted', 'disabled', 'inherit'],
      description: 'Semantic color token',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    weight: {
      control: 'select',
      options: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      description: 'Font weight override',
    },
    transform: {
      control: 'select',
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
      description: 'Text transform',
    },
    decoration: {
      control: 'select',
      options: ['none', 'underline', 'line-through', 'overline'],
      description: 'Text decoration',
    },
    truncate: {
      control: 'boolean',
      description: 'Truncate to single line with ellipsis',
    },
    lineClamp: {
      control: 'number',
      description: 'Clamp to N lines with ellipsis (multi-line truncation)',
    },
    italic: {
      control: 'boolean',
      description: 'Italic style',
    },
    underline: {
      control: 'boolean',
      description: 'Underline',
    },
    strikethrough: {
      control: 'boolean',
      description: 'Strikethrough',
    },
    breakWord: {
      control: 'boolean',
      description: 'Break long words / URLs',
    },
    noMargin: {
      control: 'boolean',
      description: 'Remove default bottom margin',
    },
    noSelect: {
      control: 'boolean',
      description: 'Disable text selection',
    },
    textColor: {
      control: 'color',
      description: 'Direct CSS color override (bypasses semantic tokens)',
    },
    size: {
      control: 'text',
      description: 'Custom font-size override (e.g. "2rem", "20px")',
    },
    lineHeight: {
      control: 'text',
      description: 'Custom line-height override',
    },
    letterSpacing: {
      control: 'text',
      description: 'Custom letter-spacing override',
    },
    gradient: {
      control: false,
      description: 'Gradient text — pass an array of CSS color stops',
    },
    children: {
      control: 'text',
      description: 'Text content',
    },
  },
  args: {
    variant: 'body1',
    children: 'The quick brown fox jumps over the lazy dog.',
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

// ─── Playground ─────────────────────────────────────────────────────────────

/** Fully interactive — tweak every prop from the Controls panel. */
export const Playground: Story = {};

// ─── All Variants ────────────────────────────────────────────────────────────

/** Every typographic scale variant rendered together. */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Typography variant="h1">Heading 1 — h1</Typography>
      <Typography variant="h2">Heading 2 — h2</Typography>
      <Typography variant="h3">Heading 3 — h3</Typography>
      <Typography variant="h4">Heading 4 — h4</Typography>
      <Typography variant="h5">Heading 5 — h5</Typography>
      <Typography variant="h6">Heading 6 — h6</Typography>
      <Typography variant="subtitle1">Subtitle 1 — subtitle1</Typography>
      <Typography variant="subtitle2">Subtitle 2 — subtitle2</Typography>
      <Typography variant="body1">
        Body 1 (default) — The quick brown fox jumps over the lazy dog.
      </Typography>
      <Typography variant="body2">
        Body 2 — The quick brown fox jumps over the lazy dog.
      </Typography>
      <Typography variant="caption">Caption — supplemental text</Typography>
      <Typography variant="overline">Overline — section label</Typography>
      <Typography variant="button">Button Label</Typography>
      <Typography variant="label">Form Label</Typography>
    </div>
  ),
};

// ─── Colors ─────────────────────────────────────────────────────────────────

/** All semantic colour tokens including the new muted & disabled variants. */
export const SemanticColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {(
        ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'muted', 'disabled'] as TypographyProps['color'][]
      ).map((c) => (
        <Typography key={c} variant="body1" color={c}>
          color=&quot;{c}&quot; — The quick brown fox jumps over the lazy dog.
        </Typography>
      ))}
      <Typography variant="body1" textColor="#e11d48">
        textColor=&quot;#e11d48&quot; — direct CSS colour override
      </Typography>
    </div>
  ),
};

// ─── Font Weights ────────────────────────────────────────────────────────────

/** The complete font-weight scale. */
export const FontWeights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {(
        ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'] as TypographyProps['weight'][]
      ).map((w) => (
        <Typography key={w as string} variant="body1" weight={w} noMargin>
          weight=&quot;{w as string}&quot; — The quick brown fox jumps over the lazy dog.
        </Typography>
      ))}
    </div>
  ),
};

// ─── Transforms & Decorations ────────────────────────────────────────────────

/** Text transform and decoration utilities. */
export const TransformsAndDecorations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Typography variant="body1" transform="uppercase" noMargin>transform: uppercase</Typography>
      <Typography variant="body1" transform="lowercase" noMargin>transform: LOWERCASE</Typography>
      <Typography variant="body1" transform="capitalize" noMargin>transform: capitalize each word</Typography>
      <Typography variant="body1" decoration="underline" noMargin>decoration: underline</Typography>
      <Typography variant="body1" decoration="line-through" noMargin>decoration: line-through</Typography>
      <Typography variant="body1" decoration="overline" noMargin>decoration: overline</Typography>
      <Typography variant="body1" italic noMargin>italic: true</Typography>
      <Typography variant="body1" strikethrough noMargin>strikethrough: true</Typography>
    </div>
  ),
};

// ─── Text Alignment ──────────────────────────────────────────────────────────

/** All alignment options. */
export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['left', 'center', 'right', 'justify'] as TypographyProps['align'][]).map((a) => (
        <Typography key={a} variant="body1" align={a} noMargin>
          align=&quot;{a}&quot; — The quick brown fox jumps over the lazy dog. Sphinx of black quartz, judge my vow.
        </Typography>
      ))}
    </div>
  ),
};

// ─── Truncation ──────────────────────────────────────────────────────────────

/** Single-line truncation with ellipsis. */
export const Truncate: Story = {
  render: () => (
    <div style={{ maxWidth: 320, border: '1px dashed #d4d4d4', padding: 12 }}>
      <Typography variant="body1" truncate noMargin>
        This is a very long sentence that should be clipped to a single line and terminated with an ellipsis character when it overflows.
      </Typography>
    </div>
  ),
};

/** Multi-line truncation via CSS line-clamp. */
export const LineClamp: Story = {
  render: () => (
    <div style={{ maxWidth: 400, border: '1px dashed #d4d4d4', padding: 12 }}>
      <Typography variant="body1" lineClamp={3} noMargin>
        This paragraph is clamped to exactly three visible lines of text. Everything beyond the third line is clipped and replaced by an ellipsis. You can use any numeric value with the lineClamp prop to control how many lines are shown before the truncation occurs.
      </Typography>
    </div>
  ),
};

/** Ensures lineClamp overrides the white-space:nowrap set by the truncate class. */
export const LineClampWithTruncateFallback: Story = {
  render: () => (
    <div style={{ maxWidth: 400, padding: 12, border: '1px dashed #d4d4d4' }}>
      <Typography variant="caption" noMargin style={{ marginBottom: 4, display: 'block' }}>
        lineClamp=2 (truncate prop intentionally also set — must still show 2 lines, not 1):
      </Typography>
      <Typography variant="body1" lineClamp={2} truncate noMargin>
        When both lineClamp and truncate are passed, lineClamp wins because the CSS
        overrides white-space: nowrap. This sentence should wrap to a second line before
        being clipped with an ellipsis — it must NOT be cut to a single line.
      </Typography>
    </div>
  ),
};

// ─── Gradient Text ───────────────────────────────────────────────────────────

/** Gradient computed from multiple colour stops. */
export const GradientText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Typography variant="h2" gradient={['#667eea', '#764ba2']} noMargin>
        Purple → Violet gradient
      </Typography>
      <Typography variant="h3" gradient={['#f093fb', '#f5576c']} noMargin>
        Pink → Red gradient
      </Typography>
      <Typography variant="h3" gradient={['#4facfe', '#00f2fe']} noMargin>
        Sky → Cyan gradient
      </Typography>
      <Typography variant="h4" gradient={['#43e97b', '#38f9d7']} noMargin>
        Green → Teal gradient
      </Typography>
    </div>
  ),
};

// ─── Custom Size / Spacing ───────────────────────────────────────────────────

/** Direct size, lineHeight, and letterSpacing overrides. */
export const CustomTypography: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Typography variant="body1" size="1.5rem" lineHeight={1.8} letterSpacing="0.05em" noMargin>
        size=1.5rem · lineHeight=1.8 · letterSpacing=0.05em
      </Typography>
      <Typography variant="body1" size={13} noMargin>
        size=13 (number, treated as px)
      </Typography>
    </div>
  ),
};

// ─── Word Break ──────────────────────────────────────────────────────────────

/** Long URLs / identifiers without spaces handled by breakWord. */
export const WordBreak: Story = {
  render: () => (
    <div style={{ maxWidth: 280, border: '1px dashed #d4d4d4', padding: 12 }}>
      <Typography variant="body2" breakWord noMargin>
        https://www.example.com/very/long/url/path/that/would/normally/overflow/its/container/without/word-break
      </Typography>
    </div>
  ),
};

// ─── Polymorphic `as` Prop ───────────────────────────────────────────────────

/** Using variant="h2" but rendering a semantic `<p> ` element (e.g. inside an article). */
export const PolymorphicAs: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Typography variant="h2" as="p" noMargin>
        variant=h2 rendered as &lt;p&gt; — same visual style, different DOM element
      </Typography>
      <Typography variant="body1" as="span" noMargin>
        variant=body1 rendered as &lt;span&gt;
      </Typography>
      <Typography variant="label" htmlFor="demo-input" noMargin>
        variant=label with htmlFor — click focuses the input below
      </Typography>
      <input id="demo-input" type="text" placeholder="Focus me" style={{ marginTop: 4 }} />
    </div>
  ),
};

// ─── Responsive Headings ─────────────────────────────────────────────────────

/**
 * Headings scale automatically via CSS custom properties.
 * Resize the viewport to see mobile → tablet → desktop → XL transitions:
 *   Mobile (<768px):  h1 = 2.25rem (36px)
 *   Tablet (≥768px):  h1 = 3rem (48px)
 *   Desktop (≥1024px): h1 = 3.75rem (60px)
 *   XL (≥1280px):     h1 = 4.5rem (72px)
 */
export const ResponsiveHeadings: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ padding: '2rem' }}>
      <Typography variant="overline" noMargin>
        Resize the viewport to see fluid heading scaling
      </Typography>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="body1" noMargin>
        Body text remains constant — only headings scale with the viewport.
      </Typography>
    </div>
  ),
};

// ─── Dark Mode ───────────────────────────────────────────────────────────────

/** Same variants under data-theme="dark". */
export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      style={{ background: '#0a0a0a', padding: '2rem', borderRadius: 8 }}
    >
      <Typography variant="h2">Dark Mode Headings</Typography>
      <Typography variant="body1">
        Body text inherits the dark theme text colour automatically via CSS custom properties.
      </Typography>
      <Typography variant="caption">Caption — muted secondary text in dark mode</Typography>
      <Typography variant="overline">Overline label</Typography>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 12 }}>
        {(['primary', 'secondary', 'success', 'error', 'warning', 'info', 'muted', 'disabled'] as TypographyProps['color'][]).map(
          (c) => (
            <Typography key={c} variant="body2" color={c} noMargin>
              {c}
            </Typography>
          )
        )}
      </div>
    </div>
  ),
};

// ─── Enterprise Form Context ─────────────────────────────────────────────────

/** Realistic label + caption usage inside a form field. */
export const FormField: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 360 }}>
      <Typography variant="label" htmlFor="email-field">
        Email address <Typography as="span" variant="caption" color="error" noMargin>*</Typography>
      </Typography>
      <input
        id="email-field"
        type="email"
        placeholder="you@company.com"
        style={{
          padding: '8px 12px',
          border: '1px solid #d4d4d4',
          borderRadius: 6,
          fontSize: '0.875rem',
        }}
      />
      <Typography variant="caption" color="muted" noMargin>
        We will never share your email with third parties.
      </Typography>
      <Typography variant="caption" color="error" noMargin>
        Please enter a valid email address.
      </Typography>
    </div>
  ),
};
