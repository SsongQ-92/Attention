import { StateCreator } from 'zustand';

import { DashboardState } from './state.types';

export const createDashboardSlice: StateCreator<DashboardState> = (set) => ({
  isDashboardOpen: false,
  isEditingMemoMode: true,
  toggleDashboardOpen: () => set((state) => ({ isDashboardOpen: !state.isDashboardOpen })),
  setEditingMemoMode: (isEdit) => set(() => ({ isEditingMemoMode: isEdit })),
});
