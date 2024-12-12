import { useEffect } from 'react';

import Browser from 'webextension-polyfill';

import { msgAction } from '../config/consts';
import { checkMessageType } from '../config/types';
import { DashboardState } from '../store/state.types';
import useBoundStore from '../store/useBoundStore';

const useToggleDashboard = ({ isDashboardOpen, toggleDashboardOpen }: DashboardState) => {
  const isHighlightBarOpen = useBoundStore((state) => state.isHighlightBarOpen);

  useEffect(() => {
    const listener = (message: unknown, sender: Browser.Runtime.MessageSender) => {
      if (
        checkMessageType(message) &&
        message.action === msgAction.ICON_CLICKED &&
        sender.id !== undefined
      ) {
        toggleDashboardOpen();

        return undefined;
      }
    };

    Browser.runtime.onMessage.addListener(listener);

    return () => {
      Browser.runtime.onMessage.removeListener(listener);
    };
  }, [toggleDashboardOpen]);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (isDashboardOpen) {
        document.body.style.marginLeft = isHighlightBarOpen ? '358px' : '330px';
      } else {
        document.body.style.marginLeft = isHighlightBarOpen ? '78px' : '50px';
      }
    });
  }, [isDashboardOpen, isHighlightBarOpen]);
};

export default useToggleDashboard;
