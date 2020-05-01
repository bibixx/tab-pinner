import { PinnerRule } from '../types/PinnerRule';
import { getStorageValues } from '../shared/getStorageValues';

export const pinIfMatchesRule = async (tab: chrome.tabs.Tab) => {
  if (tab.id === undefined) {
    return;
  }

  const { rules } = await getStorageValues();

  rules.forEach((rule: PinnerRule) => {
    if (tab.id === undefined) {
      return;
    }

    if (rule.active === true && rule.regexp !== '') {
      const { regexp } = rule;
      const expression = new RegExp(regexp);
      const { position } = rule;
      const url = tab.url || tab.pendingUrl;

      if (url && expression.test(url)) {
        chrome.tabs.update(tab.id, {
          pinned: true,
        });

        if (position !== null) {
          chrome.tabs.move(tab.id, {
            index: typeof position === 'string' ? Number.parseInt(position, 10) : position,
          });
        }
      }
    }
  });
};
