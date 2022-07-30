import { ReactNode } from 'react';
import { getReplacementRegExp } from '../../../shared/getReplacementRegExp/getReplacementRegExp';
import { getTranslatedText, Key } from '../../../shared/getTranslatedText/getTranslatedText';
import { replaceWithElements } from '../utils/replaceWithElements';

export function i18n(children: Key): string;
export function i18n(children: Key, substitutions: ReactNode[]): ReactNode;
export function i18n(children: Key, substitutions?: ReactNode[]): ReactNode {
  if (substitutions !== undefined) {
    return replaceWithElements(
      getTranslatedText(children),
      getReplacementRegExp(),
      substitutions,
    );
  }

  return getTranslatedText(children);
}
