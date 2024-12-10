import Browser from 'webextension-polyfill';

import { ALLOW_URL, badgeText, msgAction } from '../config/consts';
import { checkMessageType } from '../config/types';

Browser.runtime.onInstalled.addListener(() => {
  Browser.action.setBadgeText({
    text: badgeText.OFF,
  });
});

Browser.runtime.onMessage.addListener((message: unknown, sender: Browser.Runtime.MessageSender) => {
  if (
    checkMessageType(message) &&
    message.action === msgAction.PAGE_LOADED &&
    sender.tab?.id !== undefined
  ) {
    Browser.action.setBadgeText({
      tabId: sender.tab.id,
      text: badgeText.ON,
    });

    return true;
  }
});

Browser.action.onClicked.addListener(async (tab: Browser.Tabs.Tab) => {
  for (const url of ALLOW_URL) {
    if (tab?.url?.includes(url)) {
      Browser.runtime.sendMessage({ action: msgAction.ICON_CLICKED });
    }
  }
});
