import { isChromeStorageAvailable } from '../isChromeStorageAvailable/isChromeStorageAvailable';

const baseRegExp = '\\$[a-z_]+';

export const getReplacementRegExp = () => {
  if (isChromeStorageAvailable()) {
    return new RegExp(baseRegExp, 'g');
  }

  return new RegExp(`\\$${baseRegExp}`, 'g');
};
