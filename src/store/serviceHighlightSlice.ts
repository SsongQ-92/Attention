import { StateCreator } from 'zustand';

import { ServiceHighlightState } from './state.types';

export const createServiceHighlightSlice: StateCreator<ServiceHighlightState> = (set) => ({
  isHighlightBarOpen: false,
  toggleHighlightBarOpen: () => set((state) => ({ isHighlightBarOpen: !state.isHighlightBarOpen })),
});
