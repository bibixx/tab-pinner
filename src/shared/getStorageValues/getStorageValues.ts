import { AppStorage } from '../../types/AppStorage';
import { ChromeStorage } from '../../types/ChromeStorage';
import { getRules } from './getRules';
import { getSettings } from './getSettings';

const storageGet = (): Promise<any> => new Promise((resolve) => {
  const chromeStorage = window?.chrome.storage as ChromeStorage;

  if (chromeStorage === undefined) {
    resolve(localStorage.getItem('sync'));
  } else {
    chrome.storage.sync.get(resolve);
  }
});

export const getStorageValues = async (): Promise<AppStorage> => {
  const items = await storageGet();

  return {
    rules: getRules(items?.rules),
    settings: getSettings(items?.settings),
  };
};
