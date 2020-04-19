import { PinnerRule } from '../../types/PinnerRule';
import { PinnerSettings } from '../../types/PinnerSettings';
import { AppStorage } from '../../types/AppStorage';
import { ChromeStorage } from '../../types/ChromeStorage';

const storageSet = (value: any): Promise<void> => new Promise(
  (resolve) => {
    const chromeStorage = window?.chrome.storage as ChromeStorage;

    if (chromeStorage === undefined) {
      localStorage.setItem('sync', value);
    } else {
      chrome.storage.sync.set(value, resolve);
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
