import { create } from 'zustand';

import { createDashboardSlice } from './dashboardSlice';
import { createServiceHighlightSlice } from './serviceHighlightSlice';
import { DashboardState, ServiceHighlightState } from './state.types';

type SliceType = DashboardState & ServiceHighlightState;

const useBoundStore = create<SliceType>((...a) => ({
  ...createDashboardSlice(...a),
  ...createServiceHighlightSlice(...a),
}));

export default useBoundStore;
