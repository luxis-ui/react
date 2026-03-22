
import { ErrorPage, Container } from "@luxis-ui/react";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "@/modules/auth/components/ProtectedRoute";
import DashboardShell from "@/shared/components/DashboardShell";

export default function Custom404Page() {
  const navigate = useNavigate();

  return (
    <ProtectedRoute
    >
      <DashboardShell>
        <Container >
          <ErrorPage
            statusCode={404}
            title="Page Not Found"
            description="The page you are looking for doesn't exist or has been moved."
            theme="full-page"
            variant="error"
            actions={[
              {
                label: "Go to Dashboard",
                onClick: () => navigate("/"),
                variant: "primary",
              },
              {
                label: "Contact Support",
                onClick: () => alert("Redirecting to support..."),
                variant: "outline",
              },
            ]}
            illustration={
              <svg
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            }
          />
        </Container>
      </DashboardShell>
    </ProtectedRoute>
  );
}
