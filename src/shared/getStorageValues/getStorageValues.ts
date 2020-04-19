import { AppStorage } from "../../types/AppStorage";
import { ChromeStorage } from "../../types/ChromeStorage";
import { defaultStorageValues } from "./defaultStorageValues";
import { getRules } from './getRules';
import { getSettings } from './getSettings';

const storageGet = (): Promise<any> => new Promise((resolve) => {
  chrome.storage.sync.get(resolve);
});

export const getStorageValues = async (): Promise<AppStorage> => {
  const chromeStorage = window?.chrome.storage as ChromeStorage;

  if (chromeStorage === undefined) {
    return defaultStorageValues;
  }

  const items = await storageGet();

  return {
    rules: getRules(items?.rules),
    settings: getSettings(items?.settings),
  }
}
