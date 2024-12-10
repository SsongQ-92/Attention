import { StateCreator } from 'zustand';

import { DashboardState } from './state.types';

export const createDashboardSlice: StateCreator<DashboardState> = (set) => ({
  isDashboardOpen: false,
  toggleDashboard: () => set((state) => ({ isDashboardOpen: !state.isDashboardOpen })),
});
