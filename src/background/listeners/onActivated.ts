import { changeIcon } from '../changeIcon';

export const onActivated = (activeInfo: chrome.tabs.TabActiveInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    changeIcon(tab.pinned);
  });
};
