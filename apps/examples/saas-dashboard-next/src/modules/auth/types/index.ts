export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
}

export interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  /** True once Zustand has rehydrated the store from localStorage. */
  _hasHydrated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  setHasHydrated: (value: boolean) => void;
}
