import chromeGet from './chromeGet';

export default function closeTab(tab: chrome.tabs.Tab) {
  chromeGet((items) => {
    if (tab.id === undefined) {
      return;
    }

    // eslint-disable-next-line no-restricted-globals, no-alert
    const close = (items.settings.confirm === true) ? confirm(
      chrome.i18n.getMessage('close_conf_msg'),
    ) : true;
    if (close) {
      chrome.tabs.remove(tab.id);
    }
  });
}
