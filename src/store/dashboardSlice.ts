import { StateCreator } from 'zustand';

import { DashboardState } from './state.types';

export const createDashboardSlice: StateCreator<DashboardState> = (set) => ({
  isDashboardOpen: false,
  openDashboard: () => set(() => ({ isDashboardOpen: true })),
  closeDashboard: () => set(() => ({ isDashboardOpen: false })),
});
