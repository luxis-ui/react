'use client';

import { ROUTES } from '@/shared/constants/routes';
import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
  readonly children: ReactNode;
  /**
   * Where to redirect unauthenticated users.
   * @default ROUTES.LOGIN ("/login")
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
 * Wraps any subtree that requires authentication.
 *
 * - Waits for Zustand to rehydrate from localStorage before deciding.
 * - If the user is not authenticated, redirects to `redirectTo`.
 *
 * @example
 * ```tsx
 * <ProtectedRoute fallback={<PageSkeleton />}>
 *   <DashboardPage />
 * </ProtectedRoute>
 * ```
 */
export default function ProtectedRoute({
  children,
  redirectTo = ROUTES.LOGIN,
  fallback = null,
}: ProtectedRouteProps) {
  const { isAuthenticated, token, _hasHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (_hasHydrated && (!isAuthenticated || !token)) {
      router.replace(redirectTo);
    }
  }, [_hasHydrated, isAuthenticated, token, redirectTo, router]);

  // Still hydrating or about to redirect — show fallback.
  if (!_hasHydrated || !isAuthenticated || !token) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
