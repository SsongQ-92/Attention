import { StateCreator } from 'zustand';

import { DashboardState } from './state.types';

export const createDashboardSlice: StateCreator<DashboardState> = (set) => ({
  isDashboardOpen: false,
  isViewMemoMode: false,
  isCreatingMemoMode: true,
  isEditingMemoMode: false,
  toggleDashboardOpen: () => set((state) => ({ isDashboardOpen: !state.isDashboardOpen })),
  setViewMemoMode: (isView) => set(() => ({ isViewMemoMode: isView })),
  setCreatingMemoMode: (isCreate) => set(() => ({ isCreatingMemoMode: isCreate })),
  setEditingMemoMode: (isEdit) => set(() => ({ isEditingMemoMode: isEdit })),
});
