import {
  Button,
  Container,
  Flex,
  Box,
  Typography,
  PlusIcon,
  DownloadIcon,
  ChevronRightIcon,
} from '@luxis-ui/react';
import ProtectedRoute from '@/modules/auth/components/ProtectedRoute';
import DashboardShell from '@/shared/components/DashboardShell';

export default function ButtonsShowcasePage() {
  return (
    <ProtectedRoute>
      <DashboardShell>
        <Container>
          {/* ── Page Header ── */}
          <Box style={{ marginBottom: 28 }}>
            <Typography variant="h4" weight="bold">
              Buttons
            </Typography>
            <Typography variant="body2" color="muted">
              Variants, sizes, states and icon compositions
            </Typography>
          </Box>

          {/* ── Core Variants ── */}
          <Typography variant="h6" weight="semibold" style={{ marginBottom: 12 }}>Core Variants</Typography>
          <Flex gap="md" wrap="wrap" style={{ marginBottom: 28 }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </Flex>

          {/* ── Color Palette & Intent ── */}
          <Typography variant="h6" weight="semibold" style={{ marginBottom: 12 }}>Color &amp; Intent</Typography>
          <Flex gap="md" wrap="wrap" style={{ marginBottom: 28 }}>
            <Button variant="success">Success</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="primary">Info</Button>
          </Flex>

          {/* ── Size & Density ── */}
          <Typography variant="h6" weight="semibold" style={{ marginBottom: 12 }}>Size &amp; Density</Typography>
          <Flex gap="md" align="center" wrap="wrap" style={{ marginBottom: 28 }}>
            <Button size="sm">Small</Button>
            <Button size="md">Default</Button>
            <Button size="lg">Large</Button>
          </Flex>

          {/* ── Interactive States ── */}
          <Typography variant="h6" weight="semibold" style={{ marginBottom: 12 }}>Interactive States</Typography>
          <Flex gap="md" wrap="wrap" style={{ marginBottom: 28 }}>
            <Button loading loadingText="Loading...">Loading</Button>
            <Button disabled>Disabled</Button>
            <Button>Standard</Button>
          </Flex>

          {/* ── Icons & Actions ── */}
          <Typography variant="h6" weight="semibold" style={{ marginBottom: 12 }}>Icons &amp; Actions</Typography>
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
        </Container>
      </DashboardShell>
    </ProtectedRoute>
  );
}
