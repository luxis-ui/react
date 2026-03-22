import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@luxis-ui/react';
import { designTokens } from '@/theme/tokens';
import AppInitializer from '@/shared/components/AppInitializer';

// Auth (guest-only) pages
import AuthLayout from '@/pages/(auth)/layout';
import LoginPage from '@/pages/(auth)/login/page';
import RegisterPage from '@/pages/(auth)/register/page';
import ForgotPasswordPage from '@/pages/(auth)/forgot-password/page';

// Dashboard (protected) pages
import DashboardPage from '@/pages/(dashboard)/page';
import WidgetsPage from '@/pages/(dashboard)/widgets/page';
import TeamPage from '@/pages/(dashboard)/management/team/page';
import ProjectsPage from '@/pages/(dashboard)/management/projects/page';

// Components showcase pages
import ComponentShowcasePage from '@/pages/(dashboard)/components/base/page';
import ButtonsShowcasePage from '@/pages/(dashboard)/components/buttons/page';
import UnifiedFormsPage from '@/pages/(dashboard)/components/forms/page';

// Error pages
import ErrorPage from '@/pages/error/page';
import NotFoundPage from '@/pages/error/404/page';
import ServerErrorPage from '@/pages/error/500/page';

import './pages/globals.css';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider
        theme={{
          mode: "light",
          tokens: designTokens as any,
          global: { size: "sm" }
        }}
      >
        <AppInitializer>
          <Routes>
            {/* ── Guest / auth routes ───────────────────────────────────────
                AuthLayout wraps each page in GuestRoute — authenticated users
                are automatically redirected to the dashboard.             */}
            <Route path="/login"          element={<AuthLayout><LoginPage /></AuthLayout>} />
            <Route path="/register"       element={<AuthLayout><RegisterPage /></AuthLayout>} />
            <Route path="/forgot-password" element={<AuthLayout><ForgotPasswordPage /></AuthLayout>} />

            {/* ── Protected / dashboard routes ─────────────────────────────
                Every page component wraps itself in ProtectedRoute so
                unauthenticated users are redirected to /login.            */}
            <Route path="/"                    element={<DashboardPage />} />
            <Route path="/widgets"             element={<WidgetsPage />} />
            <Route path="/management/team"     element={<TeamPage />} />
            <Route path="/management/projects" element={<ProjectsPage />} />

            {/* ── Component showcase routes ─────────────────────────────── */}
            <Route path="/components/base"    element={<ComponentShowcasePage />} />
            <Route path="/components/buttons" element={<ButtonsShowcasePage />} />
            <Route path="/components/forms"   element={<UnifiedFormsPage />} />

            {/* ── Error pages ──────────────────────────────────────────── */}
            <Route path="/error"      element={<ErrorPage />} />
            <Route path="/error/500"  element={<ServerErrorPage />} />

            {/* ── Catch-all → 404 ──────────────────────────────────────── */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppInitializer>
      </ThemeProvider>
    </BrowserRouter>
  );
}
