import { getTranslatedText } from '../shared/getTranslatedText/getTranslatedText';

const getProperties = (pinned: boolean) => {
  if (pinned) {
    return {
      title: getTranslatedText('unpin'),
      path: {
        16: 'imgs/icon_in_16.png',
        48: 'imgs/icon_in_48.png',
        128: 'imgs/icon_in_128.png',
        256: 'imgs/icon_in_256.png',
      },
    };
  }

  return {
    title: getTranslatedText('pin'),
    path: {
      16: 'imgs/icon_16.png',
      48: 'imgs/icon_48.png',
      128: 'imgs/icon_128.png',
      256: 'imgs/icon_256.png',
    },
  };
};

export const changeIcon = (pinned: boolean) => {
  const { title, path } = getProperties(pinned);

  chrome.action.setTitle({
    title,
  });

  chrome.action.setIcon({
    path,
  });
};
