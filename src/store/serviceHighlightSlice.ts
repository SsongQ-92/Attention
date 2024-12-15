import { StateCreator } from 'zustand';

import { ServiceHighlightState } from './state.types';

export const createServiceHighlightSlice: StateCreator<ServiceHighlightState> = (set) => ({
  isHighlightBarOpen: false,
  isKeyboardMode: false,
  highlightLayerInfo: {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    content: '',
  },
  toggleHighlightBarOpen: () => set((state) => ({ isHighlightBarOpen: !state.isHighlightBarOpen })),
  toggleKeyboardMode: () => set((state) => ({ isKeyboardMode: !state.isKeyboardMode })),
  setKeyboardModeOff: () => set(() => ({ isKeyboardMode: false })),
  setHighlightLayerInfo: (layerInfo) =>
    set((state) => ({ highlightLayerInfo: { ...state.highlightLayerInfo, ...layerInfo } })),
});
