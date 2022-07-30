import { getTranslatedText } from '../shared/getTranslatedText/getTranslatedText';

const getProperties = (pinned: boolean) => {
  if (pinned) {
    return {
      title: getTranslatedText('unpin'),
      path: 'imgs/icon_in.png',
    };
  }

  return {
    title: getTranslatedText('pin'),
    path: 'imgs/icon.png',
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
