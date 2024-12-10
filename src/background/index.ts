import Browser from 'webextension-polyfill';

import { ALLOW_URL, badgeText, msgAction } from '../config/consts';

Browser.runtime.onInstalled.addListener(() => {
  Browser.action.setBadgeText({
    text: badgeText.OFF,
  });
});

Browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    for (const url of ALLOW_URL) {
      if (tab.url.includes(url)) {
        Browser.action.setBadgeText({ tabId, text: badgeText.ON });

        break;
      } else {
        Browser.action.setBadgeText({ tabId, text: badgeText.OFF });
      }
    }
  }
});

Browser.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await Browser.tabs.get(activeInfo.tabId);

  for (const url of ALLOW_URL) {
    if (tab.url?.includes(url)) {
      Browser.action.setBadgeText({ tabId: tab.id, text: badgeText.ON });

      break;
    } else {
      Browser.action.setBadgeText({ tabId: tab.id, text: badgeText.OFF });
    }
  }
});

Browser.action.onClicked.addListener(async (tab: Browser.Tabs.Tab) => {
  for (const url of ALLOW_URL) {
    if (tab?.url?.includes(url) && tab.id) {
      Browser.tabs.sendMessage(tab.id, { action: msgAction.ICON_CLICKED });

      break;
    }
  }
});
