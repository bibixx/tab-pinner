import { compileRule } from '../shared/compileRule/compileRule';
import { getStorageValues } from '../shared/getStorageValues';

export const pinIfMatchesRule = async (tab: chrome.tabs.Tab) => {
  if (tab.id === undefined) {
    return;
  }

  const { rules } = await getStorageValues();

  for (const rule of rules) {
    if (rule.active === false) {
      continue;
    }

    const matches = compileRule(rule);
    const { position } = rule;
    const url = tab.url || tab.pendingUrl;

    if (!url || !matches?.(url)) {
      continue;
    }

    chrome.tabs.update(tab.id, {
      pinned: true,
    });

    if (position !== null) {
      chrome.tabs.move(tab.id, {
        index:
          typeof position === 'string'
            ? Number.parseInt(position, 10)
            : position,
      });
    }

    return true;
  }

  return false;
};
