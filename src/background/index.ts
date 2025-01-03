import Browser from 'webextension-polyfill';

import { ALLOW_URL, badgeText, msgAction } from '../config/consts';

Browser.runtime.onInstalled.addListener(() => {
  Browser.action.setBadgeText({
    text: badgeText.OFF,
  });
});

Browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const isAllowed = ALLOW_URL.some((url) => tab.url?.includes(url) && tab.url !== url);
    Browser.action.setBadgeText({ tabId, text: isAllowed ? badgeText.ON : badgeText.OFF });
  }
});

Browser.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await Browser.tabs.get(activeInfo.tabId);

  if (tab.url) {
    const isAllowed = ALLOW_URL.some((url) => tab.url?.includes(url) && tab.url !== url);
    Browser.action.setBadgeText({
      tabId: activeInfo.tabId,
      text: isAllowed ? badgeText.ON : badgeText.OFF,
    });
  }
});

Browser.action.onClicked.addListener(async (tab: Browser.Tabs.Tab) => {
  if (!tab?.url || !tab.id) return;

  const isAllowed = ALLOW_URL.some((url) => tab.url?.includes(url) && tab.url !== url);
  const currentBadgeText = await Browser.action.getBadgeText({ tabId: tab.id });

  if (isAllowed && currentBadgeText === badgeText.ON) {
    Browser.tabs.sendMessage(tab.id, { action: msgAction.ICON_CLICKED });
  }
});
