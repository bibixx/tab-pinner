import React from 'react';
import { getTranslatedText, Key } from '../../../shared/getTranslatedText/getTranslatedText';
import { replaceWithElements } from '../utils/replaceWithElements';

export const i18n = (children: Key, substitutions: (JSX.Element|string)[] = []) => {
  if (substitutions !== undefined) {
    return replaceWithElements(
      getTranslatedText(children),
      /\$[a-z_]+/g,
      substitutions,
    );
  }

  return <>{getTranslatedText(children)}</>;
};
