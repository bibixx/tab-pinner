import { changeIcon } from '../changeIcon';
import { pinIfMatchesRule } from '../pinIfMatchesRule';

export const onUpdate = async (
  _tabId: number,
  changeInfo: chrome.tabs.TabChangeInfo,
  tab: chrome.tabs.Tab,
) => {
  if (!changeInfo.url || !tab.active) {
    return;
  }

  if (tab.pinned) {
    return;
  }

  const matches = await pinIfMatchesRule(tab);

  if (matches === undefined) {
    return;
  }

  changeIcon(matches);
};
