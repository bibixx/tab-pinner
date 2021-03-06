import { changeIcon } from '../changeIcon';
import { pinIfMatchesRule } from '../pinIfMatchesRule';

export const onUpdate = async (
  _tabId: number,
  changeInfo: chrome.tabs.TabChangeInfo,
  tab: chrome.tabs.Tab,
) => {
  if (changeInfo.url && tab.active) {
    changeIcon(tab.pinned);

    if (!tab.pinned) {
      await pinIfMatchesRule(tab);
    }
  }
};
