import chromeGet from "./chromeGet";

export default function closeTab(tab) {
  chromeGet((items) => {
    const close = (items.settings.confirm === true) ? confirm( chrome.i18n.getMessage( "close_conf_msg" ) ) : true; // eslint-disable-line no-alert
    if (close) {
      chrome.tabs.remove(tab.id);
    }
  });
}
