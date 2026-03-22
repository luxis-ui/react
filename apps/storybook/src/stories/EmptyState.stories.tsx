import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { EmptyState, ThemeProvider, EmptyBoxIcon, EmptyDataIcon, EmptySearchIcon, PlusIcon } from '@luxis-ui/react';

const meta: Meta<typeof EmptyState> = {
  title: 'Widgets/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text',
    },
    description: {
      control: 'text',
      description: 'Detailed description or instructions',
    },
    theme: {
      control: 'select',
      options: ['standard', 'minimal', 'card', 'dashed'],
      description: 'Visual theme layout',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Overall size',
    },
  },
  args: {
    theme: 'standard',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Standard: Story = {
  args: {
    title: 'No projects found',
    description: "You haven't created any projects yet. Start by creating a new one.",
    icon: <EmptyBoxIcon />,
    action: {
      label: 'Create Project',
      icon: <PlusIcon />,
      onClick: () => alert('Create clicked'),
    },
  },
};

export const DashedTheme: Story = {
  args: {
    theme: 'dashed',
    title: 'Upload files',
    description: 'Drag and drop your files here, or click to select files from your computer.',
    icon: <EmptyDataIcon />,
    action: {
      label: 'Select Files',
      onClick: () => alert('Select clicked'),
    },
  },
};

export const SmallSearch: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 300, border: '1px solid var(--lxs-color-border)', padding: 20 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    size: 'sm',
    theme: 'minimal',
    title: 'No results found',
    description: 'Try adjusting your filters or search query.',
    icon: <EmptySearchIcon />,
    action: {
      label: 'Clear Filters',
      variant: 'ghost',
    },
  },
};
