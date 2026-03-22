'use client';

import { ROUTES } from '@/shared/constants/routes';
import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
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
  const router = useRouter();

  useEffect(() => {
    if (_hasHydrated && isAuthenticated && token) {
      router.replace(redirectTo);
    }
  }, [_hasHydrated, isAuthenticated, token, redirectTo, router]);

  // Still hydrating or about to redirect authenticated user.
  if (!_hasHydrated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
