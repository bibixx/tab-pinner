import { AppStorage } from '../../types/AppStorage';
import { getRules } from './getRules';
import { getSettings } from './getSettings';
import { isChromeStorageAvailable } from '../isChromeStorageAvailable/isChromeStorageAvailable';

const storageGet = () => {
  if (!isChromeStorageAvailable()) {
    const value = localStorage.getItem('sync');

    if (value === null) {
      return value;
    }

    return JSON.parse(value);
  }

  return chrome.storage.sync.get();
};

export const getStorageValues = async (): Promise<AppStorage> => {
  const items = await storageGet();

  return {
    rules: getRules(items?.rules),
    settings: getSettings(items?.settings),
  };
};
