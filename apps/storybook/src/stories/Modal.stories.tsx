import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Modal, Button, ThemeProvider, type ModalProps } from '@luxis-ui/react';
import React, { useState } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: false, description: 'Open state' },
    onClose: { control: false, description: 'Close callback' },
    title: { control: 'text', description: 'Modal title' },
    description: { control: 'text', description: 'Modal description' },
    footer: { control: false, description: 'Custom footer' },
    footerButtons: { control: false, description: 'Footer buttons' },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'fullscreen', 'auto'], description: 'Modal size' },
    closeOnBackdropClick: { control: 'boolean', description: 'Close on backdrop click' },
    closeOnEscape: { control: 'boolean', description: 'Close on escape' },
    showCloseButton: { control: 'boolean', description: 'Show close button' },
    transparentBackdrop: { control: 'boolean', description: 'Transparent backdrop' },
    className: { control: false, description: 'Modal class' },
    backdropClassName: { control: false, description: 'Backdrop class' },
    preventScroll: { control: 'boolean', description: 'Prevent body scroll' },
    animation: { control: 'select', options: ['fade', 'slide-up', 'slide-down', 'zoom', 'none'], description: 'Animation' },
    scrollable: { control: 'boolean', description: 'Scrollable content' },
    centered: { control: 'boolean', description: 'Vertically centered' },
  },
  args: {
    title: 'Modal Title',
    description: 'This is a modal description.',
    size: 'md',
    closeOnBackdropClick: true,
    closeOnEscape: true,
    showCloseButton: true,
    transparentBackdrop: false,
    preventScroll: true,
    animation: 'fade',
    scrollable: false,
    centered: true,
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalDemo = (args: ModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
        footerButtons={args.footerButtons || [
          { label: 'Cancel', onClick: () => setOpen(false), variant: 'outline' },
          { label: 'Confirm', onClick: () => setOpen(false), variant: 'primary' },
        ]}
      >
        <p>This is the modal content. You can put any React node here.</p>
      </Modal>
    </ThemeProvider>
  );
};

export const Default: Story = {
  render: (args) => <ModalDemo {...args} />,
};

const CustomFooterDemo = (args: ModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary">Save</Button>
          </>
        }
      >
        <p>Custom footer with ReactNode.</p>
      </Modal>
    </ThemeProvider>
  );
};

export const CustomFooter: Story = {
  render: (args) => <CustomFooterDemo {...args} />,
};

export const Large: Story = {
  render: ModalDemo,
  args: {
    size: 'lg',
    title: 'Large Modal',
  },
};

export const Scrollable: Story = {
  render: ModalDemo,
  args: {
    scrollable: true,
    title: 'Scrollable Modal',
    children: (
      <div style={{ height: 400 }}>
        <p>Lots of content here...</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.</p>
        <p>More content...</p>
        <p>Even more content...</p>
        <p>Keep scrolling...</p>
      </div>
    ),
  },
};
