import { pinIfMatchesRule } from '../pinIfMatchesRule';

export const onCreated = (tab: chrome.tabs.Tab) => pinIfMatchesRule(tab);
