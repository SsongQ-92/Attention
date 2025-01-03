import { useEffect } from 'react';

import Browser from 'webextension-polyfill';

import { msgAction } from '../config/consts';
import { checkMessageType } from '../config/types';
import useBoundStore from '../store/useBoundStore';

const useToggleDashboard = () => {
  const isHighlightBarOpen = useBoundStore((state) => state.isHighlightBarOpen);
  const isDashboardOpen = useBoundStore((state) => state.isDashboardOpen);
  const isFoldedDashboardOpen = useBoundStore((state) => state.isFoldedDashboardOpen);
  const setDashboardOpen = useBoundStore((state) => state.setDashboardOpen);
  const setFoldedDashboardOpen = useBoundStore((state) => state.setFoldedDashboardOpen);

  useEffect(() => {
    const listener = (message: unknown, sender: Browser.Runtime.MessageSender) => {
      if (
        checkMessageType(message) &&
        message.action === msgAction.ICON_CLICKED &&
        sender.id !== undefined
      ) {
        if (isFoldedDashboardOpen) {
          setFoldedDashboardOpen(false);
        } else {
          setFoldedDashboardOpen(true);
        }

        if (isDashboardOpen) {
          setDashboardOpen(false);
        }

        return undefined;
      }
    };

    Browser.runtime.onMessage.addListener(listener);

    return () => {
      Browser.runtime.onMessage.removeListener(listener);
    };
  }, [isFoldedDashboardOpen, setFoldedDashboardOpen, isDashboardOpen, setDashboardOpen]);

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
