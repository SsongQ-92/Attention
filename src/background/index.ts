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

Browser.action.onClicked.addListener((tab: Browser.Tabs.Tab) => {
  for (const url of ALLOW_URL) {
    if (tab?.url?.includes(url) && tab.id) {
      Browser.tabs.sendMessage(tab.id, { action: msgAction.ICON_CLICKED });

      break;
    }
  }
});

Browser.commands.onCommand.addListener(async (command) => {
  if (command === '_execute_action') {
    try {
      const tabs = await Browser.tabs.query({ active: true, currentWindow: true });
      const currentTab = tabs[0];

      for (const url of ALLOW_URL) {
        if (currentTab?.url?.includes(url) && currentTab.id) {
          Browser.tabs.sendMessage(currentTab.id, { action: msgAction.ICON_CLICKED });

          break;
        }
      }
    } catch (error) {
      console.error('tabs.query 실패:', error);
    }
  }
});
