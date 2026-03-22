import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { Grid, Box } from '@luxis-ui/react';
import React from 'react';

const meta: Meta<typeof Grid> = {
  title: 'Components/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    container: { control: 'boolean', description: 'Flex container' },
    item: { control: 'boolean', description: 'Flex item' },
    spacing: { control: 'number', description: 'Spacing (container)' },
    rowSpacing: { control: 'number', description: 'Row spacing' },
    columnSpacing: { control: 'number', description: 'Column spacing' },
    xs: { control: 'number', description: 'Columns (xs)' },
    sm: { control: 'number', description: 'Columns (sm)' },
    md: { control: 'number', description: 'Columns (md)' },
    lg: { control: 'number', description: 'Columns (lg)' },
    xl: { control: 'number', description: 'Columns (xl)' },
    justifyContent: { control: 'select', options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'], description: 'Justify content' },
    alignItems: { control: 'select', options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'], description: 'Align items' },
    className: { control: false, description: 'Custom class name' },
  },
  args: {
    container: true,
    spacing: 2,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Basic: Story = {
  render: (args) => (
    <Grid {...args}>
      <Grid item xs={4}><Box style={{ background: '#e3e6ea', padding: 16 }}>Item 1</Box></Grid>
      <Grid item xs={4}><Box style={{ background: '#c5cae9', padding: 16 }}>Item 2</Box></Grid>
      <Grid item xs={4}><Box style={{ background: '#b2dfdb', padding: 16 }}>Item 3</Box></Grid>
    </Grid>
  ),
};

export const Responsive: Story = {
  render: (args) => (
    <Grid {...args} spacing={2}>
      <Grid item xs={12} sm={6} md={4}><Box style={{ background: '#e3e6ea', padding: 16 }}>xs=12 sm=6 md=4</Box></Grid>
      <Grid item xs={12} sm={6} md={4}><Box style={{ background: '#c5cae9', padding: 16 }}>xs=12 sm=6 md=4</Box></Grid>
      <Grid item xs={12} sm={12} md={4}><Box style={{ background: '#b2dfdb', padding: 16 }}>xs=12 sm=12 md=4</Box></Grid>
    </Grid>
  ),
};

export const RowAndColumnSpacing: Story = {
  render: (args) => (
    <Grid {...args} rowSpacing={2} columnSpacing={4}>
      <Grid item xs={6}><Box style={{ background: '#e3e6ea', padding: 16 }}>Item 1</Box></Grid>
      <Grid item xs={6}><Box style={{ background: '#c5cae9', padding: 16 }}>Item 2</Box></Grid>
      <Grid item xs={6}><Box style={{ background: '#b2dfdb', padding: 16 }}>Item 3</Box></Grid>
      <Grid item xs={6}><Box style={{ background: '#ffe082', padding: 16 }}>Item 4</Box></Grid>
    </Grid>
  ),
};
