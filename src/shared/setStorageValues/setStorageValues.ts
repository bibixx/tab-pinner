import { PinnerRule } from '../../types/PinnerRule';
import { PinnerSettings } from '../../types/PinnerSettings';
import { AppStorage } from '../../types/AppStorage';
import { ChromeStorage } from '../../types/ChromeStorage';

const storageSet = (value: any): Promise<void> => new Promise(
  (resolve) => chrome.storage.sync.set(value, resolve),
);

export const setStorageValues = async (
  rules: PinnerRule[],
  settings: PinnerSettings,
): Promise<void> => {
  const chromeStorage = window?.chrome.storage as ChromeStorage;

  const newStorageValue: AppStorage = {
    rules,
    settings,
  };

  if (chromeStorage === undefined) {
    return;
  }

  await storageSet(newStorageValue);
};
