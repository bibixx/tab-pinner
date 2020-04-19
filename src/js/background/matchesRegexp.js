import chromeGet from "./chromeGet";

export default function matchesRegexp( tab ) {
  chromeGet( ( items ) => {
    const rules = items.rules;
    rules.forEach( ( v ) => {
      if ( v !== null && v.active === true && v.regexp !== "" ) {
        const regexp = v.regexp;
        const expression = new RegExp( regexp );
        const position = v.position;
        const url = tab.url || tab.pendingUrl;
        if ( expression.test( url ) ) {

          chrome.tabs.update( tab.id, {
            "pinned": true,
          } );

          if ( position !== "" ) {
            chrome.tabs.move( tab.id, {
              index: position * 1,
            } );
          }
        }
      }
    } );
  } );
}
