import { StateCreator } from 'zustand';

import { UserHighlightState } from './state.types';

export const createUserHighlightSlice: StateCreator<UserHighlightState> = (set) => ({
  isUserHighlightMode: false,
  toggleUserHighlightMode: () =>
    set((state) => ({ isUserHighlightMode: !state.isUserHighlightMode })),
  setUserHighlightMode: (isActive) => set(() => ({ isUserHighlightMode: isActive })),
});
