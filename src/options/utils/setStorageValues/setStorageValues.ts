import { PinnerRule } from '../../../types/PinnerRule';
import { PinnerSettings } from '../../../types/PinnerSettings';
import { AppStorage } from '../../../types/AppStorage';
import { isChromeStorageAvailable } from '../../../shared/isChromeStorageAvailable/isChromeStorageAvailable';

const storageSet = (value: any): Promise<void> => new Promise(
  (resolve) => {
    if (isChromeStorageAvailable()) {
      chrome.storage.sync.set(value, resolve);
    } else {
      localStorage.setItem('sync', JSON.stringify(value));
    }
  },
);

export const setStorageValues = async (
  rules: PinnerRule[],
  settings: PinnerSettings,
): Promise<void> => {
  const newStorageValue: AppStorage = {
    rules,
    settings,
  };

  await storageSet(newStorageValue);
};
