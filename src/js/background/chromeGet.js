export default function chromeGet( callback ) {
  chrome.storage.sync.get( {
    "rules": [
      {
        "active": true,
        "name": "Facebook",
        "regexp": "^http[s]?://www.facebook.com(/)?$",
        "position": 0,
      },
    ],
    "settings": {
      "close": true,
      "confirm": true,
      "move": true,
    },
  }, ( items ) => {
    callback( items );
  } );
}
