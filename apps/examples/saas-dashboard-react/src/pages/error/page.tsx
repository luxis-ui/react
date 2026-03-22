
import { ErrorPage, Container } from "@luxis-ui/react";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "@/modules/auth/components/ProtectedRoute";
import DashboardShell from "@/shared/components/DashboardShell";

export default function GenericErrorPage() {
  const navigate = useNavigate();

  return (
    <ProtectedRoute
    >
      <DashboardShell>
        <Container maxWidth="lg" style={{ padding: "100px 0" }}>
          <ErrorPage
            title="Oops, something went wrong"
            description="We couldn't load the necessary data to display this page."
            theme="card"
            variant="primary"
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
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            }
            actions={[
              {
                label: "Try again",
                onClick: () => globalThis.location.reload(),
                variant: "primary",
              },
              {
                label: "Back to Home",
                onClick: () => navigate("/"),
                variant: "outline",
              },
            ]}
          />
        </Container>
      </DashboardShell>
    </ProtectedRoute>
  );
}
