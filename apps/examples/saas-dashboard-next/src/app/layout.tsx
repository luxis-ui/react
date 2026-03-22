'use client';
/**
 * Root Layout — Server Component.
 *
 * Keeps Next.js `metadata` export intact (requires no "use client").
 * Client-side bootstrapping (mount, theme, auth) is delegated to
 * <AppInitializer> which is itself a Client Component.
 */
import AppInitializer from '@/shared/components/AppInitializer';
import { designTokens } from '@/theme/tokens';
import { ThemeProvider } from '@luxis-ui/react';
import { Public_Sans } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

// ─── Fonts ────────────────────────────────────────────────────────────────────
const font = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--vtx-font-family-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.variable}>
        {/*
         * ThemeProvider is a Server-safe wrapper.
         * AppInitializer handles all client-side boot logic
         * (mount detection, auth hydration, feature flags, etc.)
         * and gates the rest of the tree behind a loading/error screen.
         */}
        <ThemeProvider
          theme={{
            mode: "light",
            tokens: designTokens as any,
            global: { size: "sm" }
          }}
        >
          <AppInitializer>
            {children}
          </AppInitializer>
        </ThemeProvider>
      </body>
    </html>
  );
}
