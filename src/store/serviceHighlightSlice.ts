import { StateCreator } from 'zustand';

import { ServiceHighlightState } from './state.types';

export const createServiceHighlightSlice: StateCreator<ServiceHighlightState> = (set) => ({
  isHighlightBarOpen: false,
  openHighlightBar: () => set(() => ({ isHighlightBarOpen: true })),
  closeHighlightBar: () => set(() => ({ isHighlightBarOpen: false })),
});
