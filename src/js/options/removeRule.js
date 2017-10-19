import { store } from "./Storage";

export default function removeRule( index ) {
  if ( store.options.rules ) {
    store.options.rules.splice( index, 1 );
    if ( store.options.rules.length <= 0 ) {
      store.options.rules = [ { "active": true, "name": "", "regexp": "", "position": "" } ];
    }

    chrome.storage.sync.set( {
      "rules": store.options.rules,
    } );
  }
}
