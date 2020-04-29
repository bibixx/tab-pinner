import React from 'react';
import { getTranslatedText } from '../../../shared/getTranslatedText/getTranslatedText';
import { replaceWithElements } from '../utils/replaceWithElements';

interface I18nProps {
  children: string;
  substitutions?: (JSX.Element|string)[];
}

const I18n: React.FC<I18nProps> = ({ children, substitutions }) => {
  if (substitutions !== undefined) {
    return replaceWithElements(
      getTranslatedText(children),
      /\$[a-z_]+/g,
      substitutions,
    );
  }

  return <>{getTranslatedText(children)}</>;
};

export default I18n;
