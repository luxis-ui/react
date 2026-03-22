import ProjectsOverview from '@/modules/management/projects/components/ProjectsOverview';
import ProtectedRoute from '@/modules/auth/components/ProtectedRoute';
import DashboardShell from '@/shared/components/DashboardShell';

export default function ProjectsPage() {
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
              <div className="dashboard-skeleton__card" />
            </div>
          </div>
        </div>
      }
    >
      <DashboardShell>
        <ProjectsOverview />
      </DashboardShell>
    </ProtectedRoute>
  );
}
