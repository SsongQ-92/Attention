import { useEffect } from 'react';

import Browser from 'webextension-polyfill';

import { msgAction } from '../config/consts';
import { checkMessageType } from '../config/types';
import useBoundStore from '../store/useBoundStore';

const useToggleDashboard = (isDashboardOpen: boolean) => {
  const toggleDashboardOpen = useBoundStore((state) => state.toggleDashboardOpen);

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
      document.body.style.marginLeft = isDashboardOpen ? '400px' : '0';
    });
  }, [isDashboardOpen]);
};

export default useToggleDashboard;
