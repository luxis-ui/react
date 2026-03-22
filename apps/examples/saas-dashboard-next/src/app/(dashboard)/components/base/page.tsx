"use client";

import React from "react";
import {
  Container,
  Box,
  Flex,
  Typography,
  Grid,
  Alert,
  Badge,
  Chip,
  Avatar,
  Card,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Skeleton,
} from "@luxis-ui/react";
import ProtectedRoute from "@/modules/auth/components/ProtectedRoute";
import DashboardShell from "@/shared/components/DashboardShell";

export default function ComponentShowcasePage() {
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
        <Container maxWidth="lg" style={{ padding: "40px 0" }}>
          <Flex direction="column" gap={40}>
            {/* 1. Typography & Brand */}
            <Box>
              <Typography variant="h3" weight="bold" style={{ marginBottom: "24px" }}>
                Typography & Brand
              </Typography>
              <Card variant="outlined" padding="24px">
                <Flex direction="column" gap={24}>
                  <Box>
                    <Typography variant="h1">h1. LuxisUI Heading</Typography>
                    <Typography variant="h2">h2. LuxisUI Heading</Typography>
                    <Typography variant="h3">h3. LuxisUI Heading</Typography>
                    <Typography variant="h4">h4. LuxisUI Heading</Typography>
                    <Typography variant="h5">h5. LuxisUI Heading</Typography>
                    <Typography variant="h6">h6. LuxisUI Heading</Typography>
                    <Typography variant="body1">body1. The quick brown fox jumps over the lazy dog.</Typography>
                    <Typography variant="body2">body2. The quick brown fox jumps over the lazy dog.</Typography>
                    <Typography variant="caption">caption. The quick brown fox jumps over the lazy dog.</Typography>
                  </Box>

                  <Flex gap={24} wrap="wrap">
                    <Box>
                      <Typography variant="subtitle1" weight="bold">Weights</Typography>
                      <Typography weight="bold">Bold weight</Typography>
                      <Typography weight="normal">Regular weight</Typography>
                    </Box>

                    <Box>
                      <Typography variant="subtitle1" weight="bold">Colors</Typography>
                      <Typography color="primary">Primary color text</Typography>
                      <Typography color="secondary">Secondary color text</Typography>
                      <Typography color="error">Error color text</Typography>
                    </Box>
                  </Flex>
                </Flex>
              </Card>
            </Box>

            {/* 2. Indicators & Feedback */}
            <Box>
              <Typography variant="h3" weight="bold" style={{ marginBottom: "24px" }}>
                Indicators & Feedback
              </Typography>
              <Flex direction="column" gap={24}>
                <Card variant="outlined" padding="24px">
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Alert variant="success" title="Success" dismissible>
                        Your changes have been saved successfully!
                      </Alert>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Alert variant="info" title="Information" dismissible>
                        There is a new update available.
                      </Alert>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Alert variant="warning" title="Warning" dismissible>
                        Your password will expire in 3 days.
                      </Alert>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Alert variant="error" title="Error" dismissible>
                        Failed to connect to the database.
                      </Alert>
                    </Grid>
                  </Grid>
                </Card>

                <Card variant="outlined" padding="24px">
                  <Flex direction="column" gap={24}>
                    <Flex gap={16} wrap="wrap" align="center">
                      <Typography variant="subtitle2" weight="bold" style={{ minWidth: 100 }}>Badges:</Typography>
                      <Badge variant="primary">Primary</Badge>
                      <Badge variant="success" dot>Success Dot</Badge>
                      <Badge variant="error" pill>Error Pill</Badge>
                      <Badge variant="warning" outline>Warning Outline</Badge>
                      <Badge variant="info" lightMode>Info Light</Badge>
                    </Flex>
                    <Flex gap={16} wrap="wrap" align="center">
                      <Typography variant="subtitle2" weight="bold" style={{ minWidth: 100 }}>Chips:</Typography>
                      <Chip label="Default Chip" />
                      <Chip label="Primary Chip" color="primary" variant="filled" />
                      <Chip label="Success Outlined" color="success" variant="outlined" />
                      <Chip label="Error Light" color="error" variant="light" />
                    </Flex>
                  </Flex>
                </Card>
              </Flex>
            </Box>

            {/* 3. Identity & Avatars */}
            <Box>
              <Typography variant="h3" weight="bold" style={{ marginBottom: "24px" }}>
                Identity & Avatars
              </Typography>
              <Card variant="outlined" padding="24px">
                <Flex direction="column" gap={32}>
                  <Flex gap={24} align="end" wrap="wrap">
                    <Flex direction="column" align="center" gap={8}>
                      <Avatar size="sm" fallback="SM" />
                      <Typography variant="caption">Small</Typography>
                    </Flex>
                    <Flex direction="column" align="center" gap={8}>
                      <Avatar size="md" fallback="MD" />
                      <Typography variant="caption">Medium</Typography>
                    </Flex>
                    <Flex direction="column" align="center" gap={8}>
                      <Avatar size="lg" fallback="LG" />
                      <Typography variant="caption">Large</Typography>
                    </Flex>
                  </Flex>

                  <Box>
                    <Typography variant="subtitle2" weight="bold" style={{ marginBottom: "16px" }}>Team Members (Overlapping)</Typography>
                    <Flex style={{ paddingLeft: 12 }}>
                      <Box style={{ marginLeft: -12, border: "2px solid white", borderRadius: "50%", zIndex: 5 }}>
                         <Avatar fallback="AB" size="md" />
                      </Box>
                      <Box style={{ marginLeft: -12, border: "2px solid white", borderRadius: "50%", zIndex: 4 }}>
                         <Avatar fallback="CD" size="md" color="primary" />
                      </Box>
                      <Box style={{ marginLeft: -12, border: "2px solid white", borderRadius: "50%", zIndex: 3 }}>
                         <Avatar fallback="EF" size="md" color="success" />
                      </Box>
                      <Box style={{ marginLeft: -12, border: "2px solid white", borderRadius: "50%", zIndex: 2 }}>
                         <Avatar fallback="+3" size="md" color="neutral" />
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
              </Card>
            </Box>

            {/* 4. Surface & Layout */}
            <Box>
              <Typography variant="h3" weight="bold" style={{ marginBottom: "24px" }}>
                Surface & Layout
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined" padding="24px" style={{ height: "100%" }}>
                    <Typography variant="h6">Outlined Card</Typography>
                    <Typography variant="body2" color="muted">This card uses the outlined variant.</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="elevated" padding="24px" style={{ height: "100%" }}>
                    <Typography variant="h6">Elevated Card</Typography>
                    <Typography variant="body2" color="muted">This card uses the elevated variant.</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="filled" padding="24px" style={{ height: "100%" }}>
                    <Typography variant="h6">Filled Card</Typography>
                    <Typography variant="body2" color="muted">This card uses the filled variant.</Typography>
                  </Card>
                </Grid>
              </Grid>

              <Box style={{ marginTop: 24 }}>
                <Card variant="outlined" padding="24px">
                  <Typography variant="h6" style={{ marginBottom: 16 }}>Tabs Example</Typography>
                  <Tabs defaultValue="tab1">
                    <TabList>
                      <Tab value="tab1">Overview</Tab>
                      <Tab value="tab2">Settings</Tab>
                      <Tab value="tab3">Activity</Tab>
                    </TabList>
                    <TabPanels style={{ marginTop: 24 }}>
                      <TabPanel value="tab1">
                        <Typography>This is the overview tab content.</Typography>
                      </TabPanel>
                      <TabPanel value="tab2">
                        <Typography>Settings configuration goes here.</Typography>
                      </TabPanel>
                      <TabPanel value="tab3">
                        <Typography>Recent activity is listed in this tab.</Typography>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Card>
              </Box>
            </Box>

            {/* 5. Loading & Skeleton */}
            <Box>
              <Typography variant="h3" weight="bold" style={{ marginBottom: "24px" }}>
                Loading & Skeleton
              </Typography>
              <Card variant="outlined" padding="24px">
                <Flex align="center" gap={16}>
                  <Skeleton variant="circular" width={48} height={48} />
                  <Flex direction="column" gap={8} style={{ flex: 1 }}>
                    <Skeleton variant="text" width="40%" height={20} />
                    <Skeleton variant="text" width="60%" height={16} />
                  </Flex>
                </Flex>
                <Flex align="center" gap={16} style={{ marginTop: 24 }}>
                  <Skeleton variant="circular" width={48} height={48} />
                  <Flex direction="column" gap={8} style={{ flex: 1 }}>
                    <Skeleton variant="text" width="50%" height={20} />
                    <Skeleton variant="text" width="30%" height={16} />
                  </Flex>
                </Flex>
              </Card>
            </Box>

          </Flex>
        </Container>
      </DashboardShell>
    </ProtectedRoute>
  );
}
