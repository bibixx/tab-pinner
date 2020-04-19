const getProperties = (pinned: boolean) => {
  if (pinned) {
    return {
      title: chrome.i18n.getMessage('unpin'),
      path: 'imgs/icon_in.png',
    };
  }

  return {
    title: chrome.i18n.getMessage('pin'),
    path: 'imgs/icon.png',
  };
};

export const changeIcon = (pinned: boolean) => {
  const { title, path } = getProperties(pinned);

  chrome.browserAction.setTitle({
    title,
  });

  chrome.browserAction.setIcon({
    path,
  });
};
