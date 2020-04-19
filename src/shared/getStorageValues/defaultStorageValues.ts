import { AppStorage } from "../../types/AppStorage";

export const defaultStorageValues: AppStorage = {
  "rules": [
    {
      id: Date.now(),
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
};
