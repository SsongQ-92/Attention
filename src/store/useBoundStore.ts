import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { createDashboardSlice } from './dashboardSlice';
import { createErrorSlice } from './errorSlice';
import { createModalSlice } from './modalSlice';
import { createServiceHighlightSlice } from './serviceHighlightSlice';
import {
  DashboardState,
  ErrorState,
  ModalState,
  ServiceHighlightState,
  UserHighlightState,
} from './state.types';
import { createUserHighlightSlice } from './userHighlightSlice';

type SliceType = DashboardState &
  ServiceHighlightState &
  ModalState &
  UserHighlightState &
  ErrorState;

const useBoundStore = create<SliceType>()(
  devtools(
    persist(
      (...a) => ({
        ...createDashboardSlice(...a),
        ...createServiceHighlightSlice(...a),
        ...createModalSlice(...a),
        ...createUserHighlightSlice(...a),
        ...createErrorSlice(...a),
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
