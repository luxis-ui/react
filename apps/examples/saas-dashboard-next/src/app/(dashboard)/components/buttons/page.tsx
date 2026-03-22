"use client";

import React from 'react';
import {
  Button,
  Container,
  Flex,
  Typography,
  PlusIcon,
  DownloadIcon,
  ChevronRightIcon,
  Box,
  Card
} from '@luxis-ui/react';

import ProtectedRoute from "@/modules/auth/components/ProtectedRoute";
import DashboardShell from "@/shared/components/DashboardShell";

export default function ButtonsShowcasePage() {
  return (
    <ProtectedRoute
      fallback={
        <div className="dashboard-skeleton">
          <div className="dashboard-skeleton__sidebar" />
          <div className="dashboard-skeleton__body">
            <div className="dashboard-skeleton__header" />
            <div className="dashboard-skeleton__content">
              <div className="dashboard-skeleton__card" />
              <div className="dashboard-skeleton__card" />
            </div>
          </div>
        </div>
      }
    >
      <DashboardShell>
        <Container style={{ paddingBottom: '2rem' }}>
          {/* Page Header */}
          <Box style={{ marginBottom: '2rem' }}>
            <Typography variant="h3" weight="bold" noMargin>
              Buttons & Actions
            </Typography>
            <Typography variant="body1" color="muted">
              Standardized interactive elements for consistent user feedback and hierarchy.
            </Typography>
          </Box>

          <Flex direction="column" gap={32}>
            {/* Section 1: Variants & Hierarchy */}
            <Card variant="outlined" padding="24px">
              <Typography variant="h5" weight="bold" style={{ marginBottom: '1.5rem' }}>
                Core Variants
              </Typography>
              <Flex gap="md" wrap="wrap">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </Flex>
            </Card>

            {/* Section 2: Color Palette & Intent */}
            <Card variant="outlined" padding="24px">
              <Typography variant="h5" weight="bold" style={{ marginBottom: '1.5rem' }}>
                Color Palette & Intent
              </Typography>
              <Flex gap="md" wrap="wrap">
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="primary">Info</Button>
              </Flex>
            </Card>

            {/* Section 3: Size & Density */}
            <Card variant="outlined" padding="24px">
              <Typography variant="h5" weight="bold" style={{ marginBottom: '1.5rem' }}>
                Size & Density
              </Typography>
              <Flex gap="md" align="center" wrap="wrap">
                <Button size="sm">Small</Button>
                <Button size="md">Default</Button>
                <Button size="lg">Large</Button>
              </Flex>
            </Card>

            {/* Section 4: Interactive States */}
            <Card variant="outlined" padding="24px">
              <Typography variant="h5" weight="bold" style={{ marginBottom: '1.5rem' }}>
                Interactive States
              </Typography>
              <Flex gap="md" wrap="wrap">
                <Button loading={true} loadingText="Loading...">
                  Loading
                </Button>
                <Button disabled={true}>Disabled</Button>
                <Button>Standard</Button>
              </Flex>
            </Card>

            {/* Section 5: Icons & Actions */}
            <Card variant="outlined" padding="24px">
              <Typography variant="h5" weight="bold" style={{ marginBottom: '1.5rem' }}>
                Icons & Actions
              </Typography>
              <Flex gap="md" wrap="wrap" align="center">
                <Button variant="primary" iconOnly shape="pill">
                  <PlusIcon />
                </Button>

                <Button variant="primary" leftIcon={<DownloadIcon />}>
                  Download
                </Button>

                <Button variant="primary" rightIcon={<ChevronRightIcon />}>
                  Next
                </Button>
              </Flex>
            </Card>
          </Flex>
        </Container>
      </DashboardShell>
    </ProtectedRoute>
  );
}
