import { create } from 'zustand';

import { createDashboardSlice } from './dashboardSlice';
import { createModalSlice } from './modalSlice';
import { createServiceHighlightSlice } from './serviceHighlightSlice';
import { DashboardState, ModalState, ServiceHighlightState } from './state.types';

type SliceType = DashboardState & ServiceHighlightState & ModalState;

const useBoundStore = create<SliceType>((...a) => ({
  ...createDashboardSlice(...a),
  ...createServiceHighlightSlice(...a),
  ...createModalSlice(...a),
}));

export default useBoundStore;
