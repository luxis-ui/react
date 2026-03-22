import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Autocomplete, ThemeProvider } from '@luxis-ui/react';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ minHeight: 320 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
    },
    label: {
      control: 'text',
      description: 'Label displayed above the input',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input',
    },
    error: {
      control: 'text',
      description: 'Error message — puts the input in an error state',
    },
    success: {
      control: 'text',
      description: 'Success message — puts the input in a success state',
    },
    placeholder: {
      control: 'text',
      description: 'Input placeholder text',
    },
    noOptionsMessage: {
      control: 'text',
      description: 'Message shown when no options match',
    },
    loadingMessage: {
      control: 'text',
      description: 'Message shown when loading is true',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretches the input to fill its container',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input',
    },
    loading: {
      control: 'boolean',
      description: 'Shows a loading spinner',
    },
    required: {
      control: 'boolean',
      description: 'Marks the field as required',
    },
    showSearchIcon: {
      control: 'boolean',
      description: 'Shows a search icon on the left',
    },
    clearable: {
      control: 'boolean',
      description: 'Shows a clear button when the input has a value',
    },
    openOnFocus: {
      control: 'boolean',
      description: 'Opens the dropdown immediately on focus',
    },
    minSearchLength: {
      control: 'number',
      description: 'Minimum characters required before showing options',
    },
  },
  args: {
    size: 'md',
    label: 'Search',
    placeholder: 'Type to search...',
    helperText: '',
    error: '',
    success: '',
    noOptionsMessage: 'No options',
    loadingMessage: 'Loading...',
    fullWidth: false,
    disabled: false,
    loading: false,
    required: false,
    showSearchIcon: false,
    clearable: false,
    openOnFocus: true,
    minSearchLength: 0,
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

// ─── Shared datasets ─────────────────────────────────────────────────────────

const fruits = [
  { value: 'apple', label: 'Apple', description: 'A sweet red or green fruit' },
  { value: 'banana', label: 'Banana', description: 'A yellow tropical fruit' },
  { value: 'cherry', label: 'Cherry', description: 'A small red stone fruit' },
  { value: 'durian', label: 'Durian', description: 'The king of fruits', disabled: true },
  { value: 'elderberry', label: 'Elderberry', description: 'A dark purple berry' },
  { value: 'fig', label: 'Fig', description: 'A sweet Mediterranean fruit' },
  { value: 'grape', label: 'Grape', description: 'Small clustered berries' },
  { value: 'honeydew', label: 'Honeydew', description: 'A smooth green melon' },
];

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
  { value: 'ca', label: 'Canada' },
  { value: 'br', label: 'Brazil' },
];

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Fully interactive — tweak every prop from the Controls panel. */
export const Playground: Story = {
  args: {
    options: fruits,
  },
};

/** Basic autocomplete with a label and placeholder. */
export const Default: Story = {
  args: {
    label: 'Fruit',
    placeholder: 'Search fruits...',
    options: fruits,
  },
};

/** Search icon shown on the left side of the input. */
export const WithSearchIcon: Story = {
  args: {
    label: 'Country',
    placeholder: 'Search countries...',
    options: countries,
    showSearchIcon: true,
  },
};

/** Clear button appears when the input has a value. */
export const Clearable: Story = {
  args: {
    label: 'Fruit',
    placeholder: 'Search fruits...',
    options: fruits,
    clearable: true,
    showSearchIcon: true,
  },
};

/** Options include a description line below the label. */
export const WithDescriptions: Story = {
  args: {
    label: 'Fruit',
    placeholder: 'Search fruits...',
    options: fruits,
    showSearchIcon: true,
    clearable: true,
  },
};

/** Small size variant. */
export const Small: Story = {
  args: {
    label: 'Fruit',
    placeholder: 'Search...',
    options: fruits,
    size: 'sm',
  },
};

/** Large size variant. */
export const Large: Story = {
  args: {
    label: 'Fruit',
    placeholder: 'Search...',
    options: fruits,
    size: 'lg',
  },
};

/** Full-width input stretches to fill its container. */
export const FullWidth: Story = {
  args: {
    label: 'Country',
    placeholder: 'Search countries...',
    options: countries,
    fullWidth: true,
    showSearchIcon: true,
    clearable: true,
  },
};

/** Required field — shows an asterisk next to the label. */
export const Required: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country...',
    options: countries,
    required: true,
    helperText: 'Please select your country of residence.',
  },
};

/** Helper text displayed below the input for guidance. */
export const WithHelperText: Story = {
  args: {
    label: 'Fruit',
    placeholder: 'Search fruits...',
    options: fruits,
    helperText: 'Start typing to filter the list.',
  },
};

/** Error state with a validation message. */
export const WithError: Story = {
  args: {
    label: 'Fruit',
    placeholder: 'Search fruits...',
    options: fruits,
    error: 'Please select a valid fruit.',
  },
};

/** Success state after a valid selection. */
export const WithSuccess: Story = {
  args: {
    label: 'Fruit',
    placeholder: 'Search fruits...',
    options: fruits,
    success: 'Great choice!',
  },
};

/** Loading state — shows a spinner and loading message in the dropdown. */
export const Loading: Story = {
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
    options: [],
    loading: true,
    loadingMessage: 'Fetching results...',
    showSearchIcon: true,
  },
};

/** No options available — shows the empty message. */
export const NoOptions: Story = {
  args: {
    label: 'Search',
    placeholder: 'Type something...',
    options: [],
    noOptionsMessage: 'No results found.',
    showSearchIcon: true,
  },
};

/** Disabled state — input cannot be interacted with. */
export const Disabled: Story = {
  args: {
    label: 'Fruit',
    placeholder: 'Disabled',
    options: fruits,
    disabled: true,
  },
};

/** Options with one disabled entry — Durian cannot be selected. */
export const WithDisabledOption: Story = {
  args: {
    label: 'Fruit',
    placeholder: 'Search fruits...',
    options: fruits,
    helperText: '"Durian" is disabled and cannot be selected.',
  },
};

/** Only opens the dropdown after at least 2 characters are typed. */
export const MinSearchLength: Story = {
  args: {
    label: 'Country',
    placeholder: 'Type at least 2 characters...',
    options: countries,
    minSearchLength: 2,
    showSearchIcon: true,
    helperText: 'Dropdown appears after 2 characters.',
  },
};

/** Custom option renderer — bold label with a coloured badge for the value. */
export const CustomRenderOption: Story = {
  args: {
    label: 'Fruit',
    placeholder: 'Search fruits...',
    options: fruits,
    renderOption: (option, index) => (
      <div
        key={option.value}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          cursor: 'pointer',
          borderBottom: index < fruits.length - 1 ? '1px solid #f0f0f0' : 'none',
        }}
        onClick={() => {}}
      >
        <strong>{option.label}</strong>
        <span
          style={{
            fontSize: 11,
            background: '#e0f2fe',
            color: '#0369a1',
            borderRadius: 4,
            padding: '2px 6px',
          }}
        >
          {option.value}
        </span>
      </div>
    ),
  },
};

/** All three sizes compared side-by-side. */
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <Autocomplete
          key={s}
          {...args}
          size={s}
          label={`Size: ${s}`}
          placeholder={`${s} autocomplete`}
          options={fruits}
        />
      ))}
    </div>
  ),
};

/** Error, success, and helper text states together. */
export const ValidationStates: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Autocomplete
        {...args}
        label="Helper text"
        placeholder="Search..."
        options={fruits}
        helperText="Start typing to filter options."
      />
      <Autocomplete
        {...args}
        label="Error state"
        placeholder="Search..."
        options={fruits}
        error="This field is required."
      />
      <Autocomplete
        {...args}
        label="Success state"
        placeholder="Search..."
        options={fruits}
        success="Valid selection!"
      />
    </div>
  ),
};
