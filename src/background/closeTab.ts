import chromeGet from "./chromeGet";

export default function closeTab( tab: chrome.tabs.Tab ) {
  chromeGet( ( items ) => {
    if (tab.id === undefined) {
      return;
    }

    const close = ( items.settings.confirm === true ) ? confirm( chrome.i18n.getMessage( "close_conf_msg" ) ) : true; // eslint-disable-line no-alert
    if ( close ) {
      chrome.tabs.remove( tab.id );
    }
  } );
}
