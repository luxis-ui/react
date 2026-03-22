import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthStore } from '../types';

const TOKEN_COOKIE_KEY = 'auth_token';

/** Sync the token to a cookie so Next.js middleware can read it. */
function setTokenCookie(token: string | null): void {
  if (typeof document === 'undefined') return;
  if (token) {
    document.cookie = `${TOKEN_COOKIE_KEY}=${token}; path=/; SameSite=Lax`;
  } else {
    document.cookie = `${TOKEN_COOKIE_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
  }
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      _hasHydrated: false,

      setAuth: (user, token) => {
        setTokenCookie(token);
        set({ user, token, isAuthenticated: true });
      },

      clearAuth: () => {
        setTokenCookie(null);
        set({ user: null, token: null, isAuthenticated: false });
      },

      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: 'auth-storage',
      // Only persist serialisable fields — exclude actions and hydration flag.
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
