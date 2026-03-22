"use client"
import {
  Container,
  Card,
  Box,
  Flex,
  Grid,
  Typography,
  Button,
  Avatar,
  Badge,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  TableContainer,
  Input,
  MetricCard,
  ActionMenu,
  AvatarGroup,
} from "@luxis-ui/react";
import React from "react";
import {
  BuildingIcon,
  CheckCircleIcon,
  ActivityIcon,
  SearchIcon,
  CodeIcon,
  XIcon,
  EyeIcon,
  MenuIcon,
  PlusIcon,
  FilterIcon,
} from "@luxis-ui/react";

const PROJECTS = [
  {
    id: 1,
    name: "LXS UI Revamp",
    client: "In-house",
    manager: { name: "Alice Johnson", avatar: "" },
    status: "In Progress",
    progress: 65,
    dueDate: "Apr 15, 2024",
    priority: "High",
    team: [
      { name: "AJ", color: "#3b82f6" },
      { name: "BS", color: "#10b981" },
      { name: "CW", color: "#f59e0b" },
    ]
  },
  {
    id: 2,
    name: "SaaS Dashboard Dashboard",
    client: "TechCorp",
    manager: { name: "Bob Smith", avatar: "" },
    status: "Designing",
    progress: 30,
    dueDate: "May 01, 2024",
    priority: "Medium",
    team: [
      { name: "BS", color: "#10b981" },
      { name: "EM", color: "#8b5cf6" },
    ]
  },
  {
    id: 3,
    name: "Mobile App Development",
    client: "Global Retail",
    manager: { name: "Carol White", avatar: "" },
    status: "Review",
    progress: 90,
    dueDate: "Mar 30, 2024",
    priority: "High",
    team: [
      { name: "CW", color: "#f59e0b" },
      { name: "DK", color: "#ef4444" },
      { name: "AJ", color: "#3b82f6" },
    ]
  },
  {
    id: 4,
    name: "E-commerce Integration",
    client: "Shopify Partners",
    manager: { name: "David Kim", avatar: "" },
    status: "Completed",
    progress: 100,
    dueDate: "Feb 28, 2024",
    priority: "Low",
    team: [
      { name: "DK", color: "#ef4444" },
      { name: "BS", color: "#10b981" },
    ]
  },
  {
    id: 5,
    name: "Cloud Migration",
    client: "DataSafe Inc",
    manager: { name: "Eva Martinez", avatar: "" },
    status: "In Progress",
    progress: 45,
    dueDate: "Jun 12, 2024",
    priority: "Medium",
    team: [
      { name: "EM", color: "#8b5cf6" },
      { name: "CW", color: "#f59e0b" },
    ]
  },
];

type Project = typeof PROJECTS[0];

const STATUS_CONFIG: Record<string, { color: "primary" | "success" | "warning" | "info" | "neutral"; label: string }> = {
  "In Progress": { color: "primary", label: "In Progress" },
  "Designing": { color: "info", label: "Designing" },
  "Review": { color: "warning", label: "Review" },
  "Completed": { color: "success", label: "Completed" },
};


function ProjectActionMenu({ project }: { project: Project }) {
  return (
    <ActionMenu
      position="bottom-end"
      trigger={({ toggle, disabled }) => (
        <Button size="sm" variant="ghost" iconOnly onClick={toggle} disabled={disabled}>
          <MenuIcon />
        </Button>
      )}
      items={[
        { label: "View Details", icon: <EyeIcon />, onClick: () => alert(`Viewing project: ${project.name}`) },
        { label: "Edit Project", icon: <CodeIcon />, onClick: () => alert(`Editing project: ${project.name}`) },
        { label: "Archive", icon: <XIcon />, variant: "danger", onClick: () => alert(`Archived ${project.name}`) },
      ]}
    />
  );
}

export default function ProjectsOverview() {
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("all");

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                         p.client.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: PROJECTS.length,
    completed: PROJECTS.filter(p => p.status === "Completed").length,
    inProgress: PROJECTS.filter(p => p.status === "In Progress" || p.status === "Designing").length,
  };

  return (
    <Container>
      <style>{`
        /* Allow ActionMenu popovers to escape cell boundaries */
        .lxs-table-row .lxs-table-cell:last-child {
          overflow: visible !important;
        }
        /* Elevate the active row's z-index so the absolute popup renders over subsequent rows */
        .lxs-table-row:hover,
        .lxs-table-row:focus-within {
          z-index: 10 !important;
          position: relative !important;
        }
        /* Extreme z-index when the ActionMenu is actually open */
        .lxs-table-row:has(.lxs-action-menu-trigger--open) {
          z-index: 100 !important;
          position: relative !important;
        }
      `}</style>
      {/* ── Page Header ── */}
      <Flex align="center" justify="between" style={{ marginBottom: 28 }}>
        <Box>
          <Typography variant="h4" weight="bold">
            Projects
          </Typography>
          <Typography variant="body2" color="muted">
            Manage and track your active projects
          </Typography>
        </Box>
        <Flex gap={2}>
          <Button variant="outline">
            <FilterIcon style={{ marginRight: 6 }} />
            Filters
          </Button>
          <Button variant="primary">
            <PlusIcon style={{ marginRight: 6 }} />
            New Project
          </Button>
        </Flex>
      </Flex>

      {/* ── Metric Cards ── */}
      <Grid container spacing={3} style={{ marginBottom: 28 }}>
        <Grid item xs={12} sm={4}>
          <MetricCard
            title="Total Projects"
            value={stats.total}
            icon={<BuildingIcon size={20} />}
            theme="modern"
            variant="primary"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MetricCard
            title="Completed"
            value={stats.completed}
            icon={<CheckCircleIcon size={20} />}
            theme="modern"
            variant="success"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MetricCard
            title="In Progress"
            value={stats.inProgress}
            icon={<ActivityIcon size={20} />}
            theme="modern"
            variant="warning"
          />
        </Grid>
      </Grid>

      {/* ── Main Card ── */}
      <Card variant="outlined" noPadding>
        <Box style={{ padding: "16px 20px", borderBottom: "1px solid var(--lxs-color-neutral-200)" }}>
          <Flex align="center" justify="between" gap={4}>
            <Box style={{ maxWidth: 400, width: "100%" }}>
              <Input
                placeholder="Search projects..."
                leftIcon={<SearchIcon color="var(--lxs-color-neutral-400)" />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            <Flex gap={2}>
               <Button
                variant={filter === "all" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button
                variant={filter === "In Progress" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setFilter("In Progress")}
              >
                Active
              </Button>
              <Button
                variant={filter === "Completed" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setFilter("Completed")}
              >
                Completed
              </Button>
            </Flex>
          </Flex>
        </Box>

        <TableContainer>
          <Table variant="striped" hoverable>
            <TableHead>
              <TableRow>
                <TableHeaderCell style={{ width: "30%" }}>Project</TableHeaderCell>
                <TableHeaderCell>Client</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Team</TableHeaderCell>
                <TableHeaderCell>Progress</TableHeaderCell>
                <TableHeaderCell align="right">Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <Box>
                      <Typography weight="bold" noMargin>
                        {project.name}
                      </Typography>
                      <Typography variant="caption" color="muted" noMargin>
                        Due: {project.dueDate}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{project.client}</Typography>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={STATUS_CONFIG[project.status]?.color || "neutral"}
                      dot
                      pill
                      lightMode
                    >
                      {STATUS_CONFIG[project.status]?.label || project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <AvatarGroup size="sm" max={3}>
                      {project.team.map((m, i) => (
                        <Avatar
                          key={i}
                          fallback={m.name}
                          style={{ backgroundColor: m.color }}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell>
                    <Box style={{ width: "120px" }}>
                      <Flex align="center" justify="between" style={{ marginBottom: 4 }}>
                        <Typography variant="caption" weight="bold">{project.progress}%</Typography>
                      </Flex>
                      <Box
                        style={{
                          height: 6,
                          width: "100%",
                          backgroundColor: "var(--lxs-color-neutral-100)",
                          borderRadius: 3,
                          overflow: "hidden"
                        }}
                      >
                        <Box
                          style={{
                            height: "100%",
                            width: `${project.progress}%`,
                            backgroundColor: project.progress === 100 ? "var(--lxs-color-success-500)" : "var(--lxs-color-primary-500)",
                            transition: "width 0.3s ease"
                          }}
                        />
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <ProjectActionMenu project={project} />
                  </TableCell>
                </TableRow>
              ))}
              {filteredProjects.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Box style={{ padding: "40px 0", textAlign: "center" }}>
                      <Typography color="muted">No projects found matching your criteria</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}
