import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

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

const useBoundStore = create<SliceType>()(
  devtools(
    persist(
      (...a) => ({
        ...createDashboardSlice(...a),
        ...createServiceHighlightSlice(...a),
        ...createModalSlice(...a),
        ...createUserHighlightSlice(...a),
      }),
      {
        name: 'currentMemo',
        partialize: (state) => ({
          newNote: state.newNote,
        }),
      }
    )
  )
);

export default useBoundStore;
