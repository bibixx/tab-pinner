export class Storage {
  constructor() {
    this.options = {
      "rules": [
        {
          "active": true,
          "name": "",
          "regexp": "",
          "position": "",
        },
      ],
      "settings": {
        "close": true,
        "confirm": true,
        "move": true,
      },
    };
  }
}

export const store = new Storage();

window.store = store;
