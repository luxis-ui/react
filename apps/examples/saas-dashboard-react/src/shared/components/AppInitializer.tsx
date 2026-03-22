import { useEffect, type ReactNode } from 'react';
import { useAppInitializerStore } from '@/store/appInitializer';
import Loading from '@/pages/loading';
import ErrorPage from '@/pages/error';

interface AppInitializerProps {
  children: ReactNode;
}

/**
 * AppInitializer — root-level bootstrapper.
 *
 * Responsibilities:
 *  - Tracks client mount state via the appInitializer store.
 *  - Runs all app-level async initialization (auth checks, feature flags, etc.).
 *  - Guards the rest of the tree behind a loading / error gate.
 *
 * Add any new initialization tasks inside the `initialize` function.
 */
export default function AppInitializer({ children }: Readonly<AppInitializerProps>) {
  const { status, setMounted, setStatus, setError } =
    useAppInitializerStore();

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      try {
        setStatus('initializing');
        setMounted(true);

        // ─── Add initialization tasks here ──────────────────────────────
        // e.g. await authService.hydrate();
        // e.g. await featureFlags.load();
        // ────────────────────────────────────────────────────────────────

        if (!cancelled) {
          setStatus('ready');
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'App initialization failed.'
          );
        }
      }
    }

    initialize();

    return () => {
      cancelled = true;
      setMounted(false);
    };
  }, [setMounted, setStatus, setError]);

  if (status === 'idle' || status === 'initializing') {
    return <Loading />;
  }

  if (status === 'error') {
    return <ErrorPage />;
  }

  return <>{children}</>;
}
