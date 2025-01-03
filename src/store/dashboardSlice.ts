import { StateCreator } from 'zustand';

import { DashboardState } from './state.types';

export const createDashboardSlice: StateCreator<DashboardState> = (set) => ({
  isDashboardOpen: false,
  viewMemoMode: {
    isActive: false,
    id: 0,
    title: '',
    content: '',
  },
  isCreatingMemoMode: false,
  isEditingMemoMode: false,
  isFoldedDashboardOpen: true,
  toggleDashboardOpen: () => set((state) => ({ isDashboardOpen: !state.isDashboardOpen })),
  setDashboardOpen: (isOpen) => set(() => ({ isDashboardOpen: isOpen })),
  setFoldedDashboardOpen: (isOpen) => set(() => ({ isFoldedDashboardOpen: isOpen })),
  setViewMemoMode: (viewMode) => set(() => ({ viewMemoMode: viewMode })),
  setCreatingMemoMode: (isCreate) => set(() => ({ isCreatingMemoMode: isCreate })),
  setEditingMemoMode: (isEdit) => set(() => ({ isEditingMemoMode: isEdit })),
});
