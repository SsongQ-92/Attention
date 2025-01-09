import { StateCreator } from 'zustand';

import { ErrorState } from './state.types';

export const createErrorSlice: StateCreator<ErrorState> = (set) => ({
  globalError: [],
  setGlobalError: (errorMessage) =>
    set((state) => ({ globalError: [...state.globalError, errorMessage] })),
});
