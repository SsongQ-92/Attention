import { StateCreator } from 'zustand';

import { ServiceHighlightState } from './state.types';

export const createServiceHighlightSlice: StateCreator<ServiceHighlightState> = (set) => ({
  isHighlightBarOpen: false,
  highlightLayerInfo: {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  toggleHighlightBarOpen: () => set((state) => ({ isHighlightBarOpen: !state.isHighlightBarOpen })),
  setHighlightLayerInfo: (layerInfo) =>
    set((state) => ({ highlightLayerInfo: { ...state.highlightLayerInfo, ...layerInfo } })),
});
