import { create } from 'zustand';

import { createDashboardSlice } from './dashboardSlice';
import { createModalSlice } from './modalSlice';
import { createServiceHighlightSlice } from './serviceHighlightSlice';
import {
  DashboardState,
  ModalState,
  ServiceHighlightState,
  UserHighlightState,
} from './state.types';
import { createUserHighlightSlice } from './userHighlightSlice';

type SliceType = DashboardState & ServiceHighlightState & ModalState & UserHighlightState;

const useBoundStore = create<SliceType>((...a) => ({
  ...createDashboardSlice(...a),
  ...createServiceHighlightSlice(...a),
  ...createModalSlice(...a),
  ...createUserHighlightSlice(...a),
}));

export default useBoundStore;
