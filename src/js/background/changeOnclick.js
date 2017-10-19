import chromeGet from "./chromeGet";
import { pinIcon, unpinIcon } from "./changeIcon";

export default function changeOnclick( tab ) {
  if ( tab.pinned === true ) {
    unpinIcon();
    chrome.tabs.update( tab.id, {
      "pinned": false,
    } );

    chromeGet( ( items ) => {
      if ( items.settings.move ) {
        chrome.tabs.move( tab.id, {
          index: -1,
        } );
      }
    } );
  } else {
    pinIcon();
    chrome.tabs.update( tab.id, {
      "pinned": true,
    } );
  }
}
