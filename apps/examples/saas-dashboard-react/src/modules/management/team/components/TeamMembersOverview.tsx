"use client"
import {
  Container,
  Card,
  Box,
  Flex,
  Grid,
  Typography,
  Button,
  Chip,
  Avatar,
  Badge,
  DataGrid,
  MetricCard,
  ActionMenu,
} from "@luxis-ui/react";
import {
  PlusIcon,
  UserIcon,
  CheckCircleIcon,
  XIcon,

  CodeIcon,
  EyeIcon,
  InboxIcon,
  MenuIcon,
} from "@luxis-ui/react";

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@company.com",
    role: "Frontend Engineer",
    department: "Engineering",
    status: "active" as const,
    joined: "Jan 2024",
    avatarUrl: "",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@company.com",
    role: "UI/UX Designer",
    department: "Design",
    status: "offline" as const,
    joined: "Mar 2024",
    avatarUrl: "",
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@company.com",
    role: "Backend Engineer",
    department: "Engineering",
    status: "active" as const,
    joined: "Nov 2023",
    avatarUrl: "",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david@company.com",
    role: "DevOps Engineer",
    department: "Engineering",
    status: "active" as const,
    joined: "Feb 2024",
    avatarUrl: "",
  },
  {
    id: 5,
    name: "Eva Martinez",
    email: "eva@company.com",
    role: "Product Designer",
    department: "Design",
    status: "offline" as const,
    joined: "Apr 2023",
    avatarUrl: "",
  },
];

type TeamMember = typeof TEAM_MEMBERS[0];

const DEPT_CHIP_COLOR: Record<string, "primary" | "info" | "success" | "warning"> = {
  Engineering: "primary",
  Design: "info",
};

const STATUS_BADGE: Record<TeamMember["status"], { variant: "success" | "neutral"; label: string }> = {
  active: { variant: "success", label: "Active" },
  offline: { variant: "neutral", label: "Offline" },
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function ActionButtons({ row }: { row: TeamMember }) {
  return (
    <ActionMenu
      position="bottom-end"
      trigger={({ toggle, disabled }) => (
        <Button size="sm" variant="ghost" iconOnly onClick={toggle} disabled={disabled}>
          <MenuIcon />
        </Button>
      )}
      items={[
        { label: "View Profile", icon: <EyeIcon />, onClick: () => alert(`Viewing profile for ${row.name} (${row.email})`) },
        { label: "Send Email", icon: <InboxIcon />, onClick: () => alert(`Sending email to ${row.email}`) },
        { label: "Edit Member", icon: <CodeIcon />, onClick: () => alert(`Editing member: ${row.name}`) },
        { label: "Remove", icon: <XIcon />, variant: "danger", onClick: () => alert(`Removed ${row.name}`) },
      ]}
    />
  );
}

const columns = [
  {
    key: "name",
    header: "Member",
    flex: 3,
    cellRenderer: ({ row }: { row: TeamMember }) => (
      <Flex align="center" gap={3}>
        <Avatar
          src={row.avatarUrl}
          alt={row.name}
          fallback={getInitials(row.name)}
          size="md"
          statusIndicator={
            <span
              style={{
                display: "block",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: row.status === "active" ? "var(--lxs-color-success-500, #22c55e)" : "var(--lxs-color-neutral-400, #94a3b8)",
                border: "2px solid white",
              }}
            />
          }
          statusPosition="bottom-right"
        />
        <Box>
          <Typography noMargin weight="bold">{row.name}</Typography>
          <Typography noMargin variant="caption" color="muted">
            {row.email}
          </Typography>
        </Box>
      </Flex>
    ),
  },
  {
    key: "role",
    header: "Role",
    flex: 2,
    cellRenderer: ({ row }: { row: TeamMember }) => (
      <Flex direction="column" gap={4}>
        <Typography noMargin>{row.role}</Typography>
        <Chip
          label={row.department}
          size="sm"
          variant="light"
          color={DEPT_CHIP_COLOR[row.department] ?? "primary"}
        />
      </Flex>
    ),
  },
  {
    key: "status",
    header: "Status",
    flex: 1,
    cellRenderer: ({ row }: { row: TeamMember }) => {
      const s = STATUS_BADGE[row.status];
      return (
        <Badge variant={s.variant} dot pill lightMode>
          {s.label}
        </Badge>
      );
    },
  },
  {
    key: "joined",
    header: "Joined",
    flex: 1,
    cellRenderer: ({ value }: { value: string }) => (
      <Typography variant="body2" color="muted">
        {value}
      </Typography>
    ),
  },
  {
    key: "actions",
    header: "Action Menu",
    flex: 2,
    align: "center" as const,
    cellRenderer: ({ row }: { row: TeamMember }) => <ActionButtons row={row} />,
  },
];

export default function TeamMembersOverview() {
  const totalMembers = TEAM_MEMBERS.length;
  const activeMembers = TEAM_MEMBERS.filter((m) => m.status === "active").length;
  const offlineMembers = TEAM_MEMBERS.filter((m) => m.status === "offline").length;

  const filteredRows = TEAM_MEMBERS;

  return (
    <Container>
      <style>{`
        /* Override DataGrid cell overflow to allow ActionMenu popovers to escape boundaries */
        .lxs-datagrid__row .lxs-datagrid__cell:last-child {
          overflow: visible !important;
        }
        /* Elevate the active row's z-index so the absolute popup renders over subsequent rows */
        .lxs-datagrid__row:hover,
        .lxs-datagrid__row:focus-within {
          z-index: 10 !important;
          position: relative !important;
        }
        /* Top priority z-index when the ActionMenu is actually open */
        .lxs-datagrid__row:has(.lxs-action-menu-trigger--open) {
          z-index: 100 !important;
          position: relative !important;
        }
      `}</style>

      {/* ── Page Header ── */}
      <Flex align="center" justify="between" style={{ marginBottom: 28 }}>
        <Box>
          <Typography variant="h4" weight="bold">
            Team Members
          </Typography>
          <Typography variant="body2" color="muted">
            {totalMembers} members · 2 departments
          </Typography>
        </Box>
        <Flex gap={2}>
          <Button variant="outline">
            <InboxIcon style={{ marginRight: 6 }} />
            Invite via Email
          </Button>
          <Button variant="primary">
            <PlusIcon style={{ marginRight: 6 }} />
            Add Member
          </Button>
        </Flex>
      </Flex>

      {/* ── Metric Cards ── */}
      <Grid container spacing={3} style={{ marginBottom: 28 }}>
        <Grid item xs={12} sm={4}>
          <MetricCard
            title="Total Members"
            value={totalMembers}
            icon={<UserIcon size={20} />}
            theme="modern"
            variant="primary"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MetricCard
            title="Active"
            value={activeMembers}
            icon={<CheckCircleIcon size={20} />}
            theme="modern"
            variant="success"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MetricCard
            title="Offline"
            value={offlineMembers}
            icon={<XIcon size={20} />}
            theme="modern"
            variant="warning"
          />
        </Grid>
      </Grid>

      {/* ── Main Card ── */}
      <Card variant="outlined" noPadding>

        {/* DataGrid */}
        <DataGrid
          rows={filteredRows}
          columns={columns}
          rowHeight={70}
          striped
          bordered={false}
          selection={false}
          showToolbar={false}
          density="comfortable"
          stickyHeader
        />
      </Card>
    </Container>
  );
}
