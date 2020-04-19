import chromeGet from "./chromeGet";
import { PinnerRule } from "../types/PinnerRule";

export default function matchesRegexp( tab: chrome.tabs.Tab ) {
  chromeGet( ( items ) => {
    console.log(tab);

    if (tab.id === undefined) {
      return;
    }

    const rules = items.rules;
    rules.forEach( ( v: PinnerRule ) => {
      if (tab.id === undefined) {
        return;
      }

      if ( v !== null && v.active === true && v.regexp !== "" ) {
        const regexp = v.regexp;
        const expression = new RegExp( regexp );
        const position = v.position;
        const url = tab.url || tab.pendingUrl;

        if ( url && expression.test( url ) ) {
          chrome.tabs.update( tab.id, {
            "pinned": true,
          } );

          if ( position !== null ) {
            chrome.tabs.move( tab.id, {
              index: typeof position === 'string' ? Number.parseInt(position, 10) : position,
            } );
          }
        }
      }
    } );
  } );
}
