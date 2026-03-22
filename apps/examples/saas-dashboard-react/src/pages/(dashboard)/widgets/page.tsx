import {
  UsageWidget,
  EmptyState,
  ActivityFeed,
  PricingCard,
  ProcessTimeline,
  Container,
  Card,
  Grid,
  Typography,
  Box,
  Flex,
  Button,
  ServerIcon,
  PackageIcon,
  CheckCircleIcon,
  TruckIcon,
  EmptyBoxIcon,
  PlusIcon,
} from '@luxis-ui/react';
import ProtectedRoute from '@/modules/auth/components/ProtectedRoute';
import DashboardShell from '@/shared/components/DashboardShell';

export default function WidgetsPage() {
  return (
    <ProtectedRoute>
      <DashboardShell>
        <Container>
          {/* ── Page Header ── */}
          <Flex align="center" justify="between" style={{ marginBottom: 28 }}>
            <Box>
              <Typography variant="h4" weight="bold">
                Widgets
              </Typography>
              <Typography variant="body2" color="muted">
                Usage metrics, activity feeds, timelines, pricing, and more
              </Typography>
            </Box>
            <Button variant="primary">
              <PlusIcon style={{ marginRight: 6 }} />
              Add Widget
            </Button>
          </Flex>

          {/* ── Usage Widgets ── */}
          <Typography variant="h6" weight="semibold" style={{ marginBottom: 12 }}>Usage</Typography>
          <Grid container spacing={3} style={{ marginBottom: 28 }}>
            <Grid item xs={12} md={6}>
              <UsageWidget
                title="Storage Limit"
                description="Your current data usage"
                value={85}
                limit={100}
                unit="GB"
                actionLabel="Upgrade Plan"
                onActionClick={() => alert('Upgrade clicked')}
                icon={<ServerIcon />}
                theme="modern"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <UsageWidget
                title="API Requests"
                value={1200}
                limit={10000}
                unit="calls"
                variant="success"
                theme="bordered"
              />
            </Grid>
          </Grid>

          {/* ── Activity Feed ── */}
          <Typography variant="h6" weight="semibold" style={{ marginBottom: 12 }}>Activity Feed</Typography>
          <Card variant="outlined" style={{ marginBottom: 28, maxWidth: 640 }}>
            <ActivityFeed
              title="Recent System Actions"
              items={[
                { id: 1, title: 'Server restart', time: '10 mins ago', status: 'warning', description: 'Node US-East-1 restarted automatically' },
                { id: 2, title: 'User registered', time: '2 hours ago', status: 'success', description: 'jane@example.com joined' },
                { id: 3, title: 'Database Backup', time: 'Yesterday', status: 'primary', description: 'Daily automatic backup completed successfully' },
              ]}
            />
          </Card>

          {/* ── Process Timeline ── */}
          <Typography variant="h6" weight="semibold" style={{ marginBottom: 12 }}>Process Timeline</Typography>
          <Card variant="outlined" style={{ marginBottom: 28, maxWidth: 860 }}>
            <ProcessTimeline
              title="Order Status #12938"
              currentStep={2}
              items={[
                { text: 'Order Placed', description: 'Oct 24, 10:00 AM' },
                { text: 'Processing', description: 'Oct 24, 1:00 PM', icon: <PackageIcon /> },
                { text: 'Shipped', icon: <TruckIcon /> },
                { text: 'Delivered', icon: <CheckCircleIcon /> },
              ]}
            />
          </Card>

          {/* ── Empty States ── */}
          <Typography variant="h6" weight="semibold" style={{ marginBottom: 12 }}>Empty States</Typography>
          <Grid container spacing={3} style={{ marginBottom: 28 }}>
            <Grid item xs={12} md={6}>
              <EmptyState
                theme="dashed"
                title="No Integrations Found"
                description="Connect your favorite tools to get more out of the platform."
                icon={<EmptyBoxIcon size={64} />}
                action={{
                  label: 'Add Integration',
                  icon: <PlusIcon />,
                  onClick: () => alert('Add'),
                }}
              />
            </Grid>
          </Grid>

          {/* ── Pricing Cards ── */}
          <Typography variant="h6" weight="semibold" style={{ marginBottom: 12 }}>Pricing</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <PricingCard
                tierName="Starter"
                price={0}
                features={[{ name: '1 User' }, { name: '10 Projects' }, { name: 'Basic Support', included: false }]}
                buttonLabel="Get Started"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <PricingCard
                tierName="Pro"
                price={29}
                highlight="Most Popular"
                badge="Save 20%"
                features={[{ name: '5 Users' }, { name: 'Unlimited Projects' }, { name: 'Priority Support' }]}
                buttonLabel="Upgrade Now"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <PricingCard
                tierName="Enterprise"
                price="Custom"
                features={[{ name: 'Unlimited Users' }, { name: 'Custom Domain' }, { name: '24/7 Dedicated Support' }]}
                buttonLabel="Contact Sales"
              />
            </Grid>
          </Grid>
        </Container>
      </DashboardShell>
    </ProtectedRoute>
  );
}
