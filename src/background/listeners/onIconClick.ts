import { handleIconClick } from '../changeOnClick';
import closeTab from '../closeTab';
import { handleDoubleClick } from '../onDblClick';
import { store } from '../../shared/store';

export const onIconClick = async (tab: chrome.tabs.Tab) => {
  const settings = await store.getSettings();

  if (settings.close) {
    handleDoubleClick(
      () => handleIconClick(tab),
      () => closeTab(tab),
    );
  } else {
    handleIconClick(tab);
  }
};
