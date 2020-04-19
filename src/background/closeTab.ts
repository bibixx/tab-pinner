import { store } from '../shared/store';

export default async function closeTab(tab: chrome.tabs.Tab) {
  if (tab.id === undefined) {
    return;
  }

  const settings = await store.getSettings();

  const close = settings.confirm
    // eslint-disable-next-line no-restricted-globals, no-alert
    ? confirm(chrome.i18n.getMessage('close_conf_msg'))
    : true;

  if (close) {
    chrome.tabs.remove(tab.id);
  }
}
