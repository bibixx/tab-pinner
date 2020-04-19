import { pinIcon, unpinIcon } from "./background/changeIcon";
import matchesRegexp from "./background/matchesRegexp";
import changeOnclick from "./background/changeOnclick";
import chromeGet from "./background/chromeGet";
import closeTab from "./background/closeTab";

chrome.tabs.onUpdated.addListener( ( tabId, changeInfo, tab ) => {
  if ( changeInfo.url && tab.active ) {
    if ( tab.pinned === true ) {
      pinIcon();
    } else {
      unpinIcon();
      matchesRegexp( tab );
    }
  }
} );

chrome.tabs.onCreated.addListener( ( tab ) => {
  matchesRegexp( tab );
} );


chrome.tabs.onActivated.addListener( ( activeInfo ) => {
  chrome.tabs.get( activeInfo.tabId, ( tab ) => {
    if ( tab.pinned === true ) {
      pinIcon();
    } else {
      unpinIcon();
    }
  } );
} );

let timer: NodeJS.Timeout;
let timerActive = false;

chrome.browserAction.onClicked.addListener( ( tab ) => {
  chromeGet( ( items ) => {
    if ( items.settings.close ) {
      if ( timerActive ) {
        clearTimeout( timer );
        closeTab( tab );
        timerActive = false;
      } else {
        timer = setTimeout( () => {
          changeOnclick( tab );
          timerActive = false;
        }, 200 );
        timerActive = true;
      }
    } else {
      changeOnclick( tab );
    }
  } );
} );
