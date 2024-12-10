import { useEffect } from 'react';

import Browser from 'webextension-polyfill';

const useSendMsgToBg = (message: string) => {
  useEffect(() => {
    try {
      if (typeof Browser !== 'undefined' && Browser.runtime) {
        Browser.runtime.sendMessage({ action: message });
      }
    } catch (error) {
      console.error('background로 메시지 전송 실패', error);
    }
  }, [message]);
};

export default useSendMsgToBg;
