export function pinIcon() {
  chrome.browserAction.setTitle( {
    title: chrome.i18n.getMessage( "unpin" ),
  } );

  chrome.browserAction.setIcon( {
    path: "imgs/icon_in.png",
  } );
}


export function unpinIcon() {
  chrome.browserAction.setTitle( {
    title: chrome.i18n.getMessage( "pin" ),
  } );

  chrome.browserAction.setIcon( {
    path: "imgs/icon.png",
  } );
}
