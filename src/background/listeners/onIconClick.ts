import { handleIconClick } from '../changeOnClick';
import { closeTab } from '../closeTab';
import { handleDoubleClick } from '../onDblClick';
import { getStorageValues } from '../../shared/getStorageValues';

export const onIconClick = async (tab: chrome.tabs.Tab) => {
  const { settings } = await getStorageValues();

  if (!settings.close) {
    handleIconClick(tab);
    return;
  }

  handleDoubleClick(
    () => handleIconClick(tab),
    () => closeTab(tab),
  );
};
