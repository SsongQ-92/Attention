import Browser from 'webextension-polyfill';

import { ALLOW_URL } from '../config/consts';
import { checkMessageType } from '../config/types';

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
    if (tab?.url?.includes(url)) {
      Browser.runtime.sendMessage({ action: 'ICON_CLICKED' });
    }
  }
});
