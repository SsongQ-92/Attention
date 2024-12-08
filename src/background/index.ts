import Browser from 'webextension-polyfill';

import { ALLOW_URL } from '../config/consts';

const checkMessageType = (message: unknown): message is { action: string } => {
  return (
    typeof message === 'object' &&
    message !== null &&
    'action' in message &&
    typeof (message as Record<string, string>).action === 'string'
  );
};

Browser.runtime.onInstalled.addListener(() => {
  Browser.action.setBadgeText({
    text: 'OFF',
  });
});

Browser.runtime.onMessage.addListener((message: unknown, sender: Browser.Runtime.MessageSender) => {
  if (
    checkMessageType(message) &&
    message.action === 'PAGE_LOADED' &&
    sender.tab?.id !== undefined
  ) {
    Browser.action.setBadgeText({
      tabId: sender.tab.id,
      text: 'ON',
    });

    return true;
  }
});

Browser.action.onClicked.addListener(async (tab: Browser.Tabs.Tab) => {
  for (const url of ALLOW_URL) {
    if (tab?.url?.startsWith(url)) {
      const prevState = await Browser.action.getBadgeText({ tabId: tab.id });
      const nextState = prevState === 'OPEN' ? 'CLOSE' : 'OPEN';

      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
      });

      if (nextState === 'OPEN') {
        // ON일 때 실행할 메시징 전달 로직
      } else if (nextState === 'CLOSE') {
        // OFF일 때 실행할 메시징 전달 로직
      }
    }
  }
});
