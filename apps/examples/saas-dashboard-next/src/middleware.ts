import { NextResponse, type NextRequest } from 'next/server';
import { GUEST_ROUTES, ROUTES } from '@/shared/constants/routes';

const TOKEN_COOKIE_KEY = 'auth_token';

/**
 * Routes that are publicly accessible without authentication.
 * Everything else defaults to protected.
 */
const PUBLIC_ROUTES: string[] = [...GUEST_ROUTES];

/**
 * Next.js Edge Middleware — first line of server-side route protection.
 *
 * Strategy: default-protected — every route requires auth unless it is
 * listed in PUBLIC_ROUTES (e.g. /login).  This avoids the pitfall of
 * accidentally leaving a new page unprotected.
 *
 * - Non-public + unauthenticated → redirect to /login?callbackUrl=…
 * - GUEST_ROUTES + authenticated  → redirect to /
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(TOKEN_COOKIE_KEY)?.value;
  const isAuthenticated = Boolean(token);

  const isPublic = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isGuestOnly = GUEST_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (!isPublic && !isAuthenticated) {
    const loginUrl = new URL(ROUTES.LOGIN, request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isGuestOnly && isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Match every path EXCEPT:
   * - _next/static  — static asset chunks
   * - _next/image   — image optimisation endpoint
   * - favicon.ico   — browser tab icon
   * - api/          — API routes (handle auth themselves)
   */
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
