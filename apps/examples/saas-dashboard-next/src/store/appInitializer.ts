import { create } from 'zustand';

export type AppInitStatus = 'idle' | 'initializing' | 'ready' | 'error';

interface AppInitializerState {
  isMounted: boolean;
  status: AppInitStatus;
  error: string | null;
  setMounted: (mounted: boolean) => void;
  setStatus: (status: AppInitStatus) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  isMounted: false,
  status: 'idle' as AppInitStatus,
  error: null,
};

export const useAppInitializerStore = create<AppInitializerState>((set) => ({
  ...initialState,
  setMounted: (mounted) => set({ isMounted: mounted }),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error, status: error ? 'error' : 'ready' }),
  reset: () => set(initialState),
}));
