"use client";
import { Card, Grid, MetricCard, UserIcon, TrendingUpIcon, LayersIcon, BuildingIcon } from "@luxis-ui/react";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import "../dashboard.layout.css";
import DashboardSkeleton from "./DashboardSkeleton";

export default function DashboardOverview() {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <section className="dashboard-page">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            theme="modern"
            variant="success"
            title="Total Revenue"
            value="$128,000"
            change={5.4}
            trend="up"
            icon={<BuildingIcon />}
            description="vs last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            theme="modern"
            variant="info"
            title="Active Projects"
            value="24"
            change={-2}
            trend="down"
            icon={<UserIcon />}
            description="current projects"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            theme="modern"
            variant="primary"
            title="System Health"
            value="98%"
            change={0.5}
            trend="up"
            icon={<LayersIcon />}
            description="uptime"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            theme="modern"
            variant="warning"
            title="Attrition Rate"
            value="4.8%"
            change={1.2}
            trend="up"
            icon={<TrendingUpIcon />}
            description="vs last month"
          />
        </Grid>
      </Grid>

      {/* ── Placeholder panels ──────────────────────────────────────────── */}
      <Grid container spacing={2} className="mt-4">
        <Grid item xs={12} md={8}>
          <Card
            variant="outlined"
            header={<span className="dashboard-page__panel-title">Employee Overview</span>}
            divider
            className="dashboard-page__panel dashboard-page__panel--wide"
          >
            <div className="dashboard-page__panel-body dashboard-page__chart-placeholder">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart
                  data={[
                    { name: "Jan", Employees: 0 },
                    { name: "Feb", Employees: 300 },
                    { name: "Mar", Employees: 150 },
                    { name: "Apr", Employees: 400 },
                    { name: "May", Employees: 200 },
                    { name: "Jun", Employees: 500 },
                    { name: "Jul", Employees: 250 },
                    { name: "Aug", Employees: 600 },
                    { name: "Sep", Employees: 350 },
                    { name: "Oct", Employees: 700 },
                    { name: "Nov", Employees: 400 },
                    { name: "Dec", Employees: 800 },
                  ]}
                  margin={{ top: 16, right: 24, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="Employees"
                    stroke="#2563eb"
                    strokeWidth={3}
                    fill="#2563eb"
                    fillOpacity={0.15}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            variant="outlined"
            header={<span className="dashboard-page__panel-title">Recent Hires</span>}
            divider
            className="dashboard-page__panel"
          >
            <div className="dashboard-page__panel-body dashboard-page__chart-placeholder">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Onboarded", value: 2 },
                      { name: "Interviewed", value: 1 },
                      { name: "Offer Sent", value: 1 },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {/* Custom color palette for theme harmony */}
                    <Cell key="Onboarded" fill="#22c55e" /> {/* green */}
                    <Cell key="Interviewed" fill="#2563eb" /> {/* blue */}
                    <Cell key="Offer Sent" fill="#fbbf24" /> {/* yellow */}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Grid>
      </Grid>
    </section>
  );
}
