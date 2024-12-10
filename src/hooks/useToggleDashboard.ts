import { useEffect } from 'react';

import Browser from 'webextension-polyfill';

import { checkMessageType } from '../config/types';
import useBoundStore from '../store/useBoundStore';

const useToggleDashboard = () => {
  const toggleDashboard = useBoundStore((state) => state.toggleDashboard);

  useEffect(() => {
    const listener = (message: unknown, sender: Browser.Runtime.MessageSender) => {
      if (
        checkMessageType(message) &&
        message.action === 'ICON_CLICKED' &&
        sender.tab?.id !== undefined
      ) {
        toggleDashboard();

        return true;
      }
    };

    try {
      Browser.runtime.onMessage.addListener(listener);
    } catch (error) {
      console.error('background로부터 메시지 수신 실패', error);
    }

    return () => {
      Browser.runtime.onMessage.removeListener(listener);
    };
  }, [toggleDashboard]);
};

export default useToggleDashboard;
