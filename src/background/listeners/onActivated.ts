import { changeIcon } from '../changeIcon';

export const onActivated = async (activeInfo: chrome.tabs.TabActiveInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);

  changeIcon(tab.pinned);
};
