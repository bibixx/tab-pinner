import { isChromeStorageAvailable } from '../isChromeStorageAvailable/isChromeStorageAvailable';
import messages from '../../../static/_locales/en/messages.json';

export type Key = keyof typeof messages;

export const getTranslatedText = (key: Key): string => {
  if (isChromeStorageAvailable()) {
    return chrome.i18n.getMessage(key) ?? key;
  }

  return messages[key].message;
};
