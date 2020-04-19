import { AppStorage } from '../../types/AppStorage';
import { getRules } from './getRules';
import { getSettings } from './getSettings';
import { isChromeStorageAvailable } from '../isChromeStorageAvailable/isChromeStorageAvailable';

const storageGet = (): Promise<any> => new Promise((resolve) => {
  if (!isChromeStorageAvailable()) {
    const value = localStorage.getItem('sync');
    if (value === null) {
      resolve(value);
      return;
    }

    resolve(JSON.parse(value));
    return;
  }

  chrome.storage.sync.get(resolve);
});

export const getStorageValues = async (): Promise<AppStorage> => {
  const items = await storageGet();

  return {
    rules: getRules(items?.rules),
    settings: getSettings(items?.settings),
  };
};
