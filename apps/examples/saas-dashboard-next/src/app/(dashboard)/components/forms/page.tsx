"use client";

import React, { useState } from 'react';
import ProtectedRoute from '@/modules/auth/components/ProtectedRoute';
import DashboardShell from '@/shared/components/DashboardShell';
import {
  Card,
  Typography,
  FormControl,
  Input,
  Textarea,
  Select,
  MultiSelect,
  RadioGroup,
  Autocomplete,
  DatePicker,
  DateRangePicker,
  RichTextEditor,
  FileUpload,
  Flex,
  Grid,
  Button
} from '@luxis-ui/react';
import { SearchIcon } from '@luxis-ui/react'; // Need to make sure icons exist or use ones from 'lucide-react' / 'react-icons/fi'

export default function UnifiedFormsPage() {
  const [date, setDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<{ start: Date | null, end: Date | null }>({ start: null, end: null });

  return (
    <ProtectedRoute
      fallback={
        <div className="dashboard-skeleton">
          <div className="dashboard-skeleton__sidebar" />
          <div className="dashboard-skeleton__body">
            <div className="dashboard-skeleton__header" />
            <div className="dashboard-skeleton__content">
              <div className="dashboard-skeleton__card" />
            </div>
          </div>
        </div>
      }
    >
      <DashboardShell>
        <Flex direction="column" gap="xl" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>

          <div style={{ marginBottom: '1rem' }}>
            <Typography variant="h3">Project Creation</Typography>
            <Typography variant="body1" color="secondary">
              Complete the details below to initialize a new project workspace.
            </Typography>
          </div>

          <Card variant="outlined" padding="1.5rem">
            <Typography variant="h5" style={{ marginBottom: '1rem' }}>Basic Info</Typography>
            <Grid container spacing={4} rowSpacing={4}>
              <Grid item style={{ width: '100%' }}>
                <FormControl label="Project Name" success="Project name is available">
                  <Input placeholder="E.g., Project Phoenix" leftIcon={<SearchIcon />} value="Project Apollo" />
                </FormControl>
              </Grid>
              <Grid item style={{ width: '100%' }}>
                <FormControl label="Project Code" error="Project code must be unique">
                  <Input placeholder="E.g., PHOENIX-01" value="APOLLO-01" />
                </FormControl>
              </Grid>
              <Grid item style={{ width: '100%' }}>
                <FormControl label="Project Description" helperText="Provide a high-level overview of the goals">
                  <Textarea placeholder="Describe the main objectives..." rows={4} />
                </FormControl>
              </Grid>
            </Grid>
          </Card>

          <Card variant="outlined" padding="1.5rem">
            <Typography variant="h5" style={{ marginBottom: '1rem' }}>Team & Category</Typography>
            <Grid container spacing={4} rowSpacing={4}>
              <Grid item style={{ width: '50%' }}>
                <Select
                  label="Category"
                  placeholder="Select a category"
                  options={[
                    { label: 'Engineering', value: 'engineering' },
                    { label: 'Design', value: 'design' },
                    { label: 'Marketing', value: 'marketing' }
                  ]}
                />
              </Grid>
              <Grid item style={{ width: '50%' }}>
                <MultiSelect
                  label="Team Members"
                  placeholder="Assign members"
                  options={[
                    { label: 'Alice Smith', value: 'alice' },
                    { label: 'Bob Jones', value: 'bob' },
                    { label: 'Charlie Davis', value: 'charlie' }
                  ]}
                  value={[]}
                  onChange={() => {}}
                />
              </Grid>
              <Grid item style={{ width: '100%', marginTop: '1rem' }}>
                <Typography variant="subtitle2" style={{ marginBottom: '0.5rem' }}>Priority Level</Typography>
                <Flex gap="md">
                  <RadioGroup
                    name="priority"
                    defaultValue="medium"
                    options={[
                      { value: 'low', label: 'Low' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'High' }
                    ]}
                  />
                </Flex>
              </Grid>
            </Grid>
          </Card>

          <Card variant="outlined" padding="1.5rem">
            <Typography variant="h5" style={{ marginBottom: '1rem' }}>Smart Pickers</Typography>
            <Grid container spacing={4} rowSpacing={4}>
              <Grid item style={{ width: '100%' }}>
                <Autocomplete
                  label="Search User"
                  placeholder="Find a project lead..."
                  options={[
                    { label: 'Alice Smith', value: 'alice' },
                    { label: 'Bob Jones', value: 'bob' },
                    { label: 'Charlie Davis', value: 'charlie' }
                  ]}
                />
              </Grid>
              <Grid item style={{ width: '100%' }}>
                <Flex gap="md" wrap="wrap">
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <DatePicker
                      label="Kickoff Date"
                      value={date}
                      onChange={(d) => setDate(d)}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <DateRangePicker
                      label="Project Timeline"
                      value={dateRange}
                      onChange={(r) => setDateRange(r)}
                    />
                  </div>
                </Flex>
              </Grid>
            </Grid>
          </Card>

          <Card variant="outlined" padding="1.5rem">
            <Typography variant="h5" style={{ marginBottom: '1rem' }}>Project Documentation</Typography>
            <div style={{ marginBottom: '2rem' }}>
              <RichTextEditor
                label="Initial Requirements"
                helperText="Use the editor to format your text."
                value=""
                onChange={() => {}}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <Typography variant="subtitle2" style={{ marginBottom: '0.5rem' }}>Attachments</Typography>
              <FileUpload
                label="Upload supporting documents"
                multiple
                accept=".pdf,.doc,.docx,.png,.jpg"
                maxSize={10485760}
              />
              <Typography variant="caption" color="secondary" style={{ display: 'block', marginTop: '0.5rem' }}>
                Max file size: 10MB. Accepted formats: PDF, Word, Images.
              </Typography>
            </div>
          </Card>

          <Flex justify="end" gap="md" style={{ marginTop: '1rem' }}>
            <Button variant="outline" className='mr-2' disabled>Cancel</Button>
            <Button variant="primary" loading>Create Project</Button>
          </Flex>

        </Flex>
      </DashboardShell>
    </ProtectedRoute>
  );
}
