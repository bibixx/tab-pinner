import { changeIcon } from './changeIcon';
import { getStorageValues } from '../shared/getStorageValues';

export const handleIconClick = async (tab: chrome.tabs.Tab) => {
  if (tab.id === undefined) {
    return;
  }

  changeIcon(tab.pinned);

  if (tab.pinned === true) {
    chrome.tabs.update(tab.id, {
      pinned: false,
    });

    const { settings } = await getStorageValues();

    if (settings.move) {
      chrome.tabs.move(tab.id, {
        index: -1,
      });
    }
  } else {
    chrome.tabs.update(tab.id, {
      pinned: true,
    });
  }
};
