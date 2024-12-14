import { StateCreator } from 'zustand';

import { DashboardState } from './state.types';

export const createDashboardSlice: StateCreator<DashboardState> = (set) => ({
  isDashboardOpen: false,
  viewMemoMode: {
    isActive: false,
    id: 0,
  },
  isCreatingMemoMode: false,
  isEditingMemoMode: false,
  toggleDashboardOpen: () => set((state) => ({ isDashboardOpen: !state.isDashboardOpen })),
  setViewMemoMode: (viewMode) => set(() => ({ viewMemoMode: viewMode })),
  setCreatingMemoMode: (isCreate) => set(() => ({ isCreatingMemoMode: isCreate })),
  setEditingMemoMode: (isEdit) => set(() => ({ isEditingMemoMode: isEdit })),
});
