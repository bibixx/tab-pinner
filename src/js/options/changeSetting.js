import { store } from "./Storage";

export default function changeSetting( type, index, value ) {
  store.options[ type ][ index ] = value;
  chrome.storage.sync.set( {
    "rules": store.options.rules,
    "settings": store.options.settings,
  } );
}
