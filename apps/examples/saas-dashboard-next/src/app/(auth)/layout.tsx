'use client';

import { GuestRoute } from '@/modules/auth';
import type { ReactNode } from 'react';
import { Typography } from '@luxis-ui/react';
import './auth.layout.css';

interface AuthLayoutProps {
  readonly children: ReactNode;
}

/**
 * Layout for unauthenticated pages: /login, /register, /forgot-password, etc.
 *
 * Wraps every page in <GuestRoute> so authenticated users are automatically
 * redirected to the dashboard without seeing the auth UI.
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <GuestRoute
      fallback={
        <div className="auth-layout__loading">
          <span className="auth-layout__spinner" aria-label="Loading…" />
        </div>
      }
    >
      <div className="auth-layout">
        <aside className="auth-layout__panel">
          <div className="auth-layout__panel-bg" />
          
          <div className="auth-layout__logo-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://luxisui.com/img/logo.webp" alt="LuxisUI Logo" style={{  width: 120, filter: 'brightness(0) invert(1)' }} />
          </div>

          <div className="auth-layout__content">
            <Typography variant="h3" className="auth-layout__quote">
              &quot;LuxisUI has completely transformed how we build enterprise applications. The component quality and design system are unmatched.&quot;
            </Typography>
          </div>
        </aside>

        <main className="auth-layout__main">
          <div className="auth-layout__container">
            <div className="auth-layout__mobile-header">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://luxisui.com/img/logo.webp" alt="LuxisUI Logo" style={{ height: 36, width: 'auto' }} />
            </div>
            {children}
          </div>
        </main>
      </div>
    </GuestRoute>
  );
}
