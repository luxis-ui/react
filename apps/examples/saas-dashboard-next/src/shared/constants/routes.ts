export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  /** The dashboard lives at the root path. */
  DASHBOARD: '/',
  WIDGETS: '/widgets',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

/**
 * Routes that are accessible ONLY to unauthenticated users (e.g. login).
 * Authenticated users visiting these are redirected to ROUTES.DASHBOARD.
 *
 * The middleware uses a default-protected strategy, so every route NOT
 * listed here requires authentication — no PROTECTED_ROUTES list needed.
 */
export const GUEST_ROUTES: string[] = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
];
