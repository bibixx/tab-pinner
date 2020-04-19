import { isChromeStorageAvailable } from '../isChromeStorageAvailable/isChromeStorageAvailable';
import messages from '../../../static/_locales/en/messages.json';

interface Messages {
  [key: string]: {
    message: string;
    description: string;
  }
}

export const getTranslatedText = (key: string): string => {
  if (isChromeStorageAvailable()) {
    return chrome.i18n.getMessage(key) || key;
  }

  // return key.replace(/./g, '*');
  return (messages as any as Messages)[key]?.message || key;
};
