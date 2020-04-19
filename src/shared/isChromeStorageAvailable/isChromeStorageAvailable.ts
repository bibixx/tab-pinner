export type ChromeStorage = typeof window.chrome.storage|undefined;

export const isChromeStorageAvailable = () => {
  const chromeStorage = window?.chrome.storage as ChromeStorage;

  return chromeStorage !== undefined;
};
