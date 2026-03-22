"use client";

import React from "react";
import { ErrorPage, Container } from "@luxis-ui/react";
import ProtectedRoute from "@/modules/auth/components/ProtectedRoute";
import DashboardShell from "@/shared/components/DashboardShell";

export default function Custom500Page() {
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
        <Container maxWidth="lg" style={{ padding: "100px 0" }}>
          <ErrorPage
            statusCode={500}
            title="Internal Server Error"
            description="Our servers are currently experiencing issues. Please try again later."
            theme="full-page"
            variant="warning"
            actions={[
              {
                label: "Retry Request",
                onClick: () => globalThis.location.reload(),
                variant: "primary",
              },
            ]}
          />
        </Container>
      </DashboardShell>
    </ProtectedRoute>
  );
}
