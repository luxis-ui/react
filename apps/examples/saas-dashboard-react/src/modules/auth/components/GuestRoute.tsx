import { ROUTES } from '@/shared/constants/routes';
import { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface GuestRouteProps {
  readonly children: ReactNode;
  /**
   * Where to redirect already-authenticated users.
   * @default ROUTES.DASHBOARD ("/dashboard")
   */
  readonly redirectTo?: string;
  /**
   * Rendered while the auth store is still hydrating from storage,
   * and while redirecting. Pass a spinner/skeleton for a smoother UX.
   * @default null
   */
  readonly fallback?: ReactNode;
}

/**
 * Wraps any subtree that should only be visible to unauthenticated users
 * (e.g. login, register, forgot-password pages).
 *
 * - Waits for Zustand to rehydrate from localStorage before deciding.
 * - If the user is already authenticated, redirects to `redirectTo`.
 *
 * @example
 * ```tsx
 * <GuestRoute fallback={<FullPageSpinner />}>
 *   <LoginPage />
 * </GuestRoute>
 * ```
 */
export default function GuestRoute({
  children,
  redirectTo = ROUTES.DASHBOARD,
  fallback = null,
}: GuestRouteProps) {
  const { isAuthenticated, token, _hasHydrated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (_hasHydrated && isAuthenticated && token) {
      navigate(redirectTo, { replace: true });
    }
  }, [_hasHydrated, isAuthenticated, token, redirectTo, navigate]);

  // Still hydrating or about to redirect authenticated user.
  if (!_hasHydrated || (isAuthenticated && token)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
