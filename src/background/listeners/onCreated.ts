import { pinIfMatchesRule } from '../pinIfMatchesRule';

export const onCreated = async (tab: chrome.tabs.Tab) => {
  await pinIfMatchesRule(tab);
};
