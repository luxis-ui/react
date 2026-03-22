
import { ErrorPage, Container } from "@luxis-ui/react";
import ProtectedRoute from "@/modules/auth/components/ProtectedRoute";
import DashboardShell from "@/shared/components/DashboardShell";

export default function Custom500Page() {
  return (
    <ProtectedRoute
    >
      <DashboardShell>
        <Container>
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
