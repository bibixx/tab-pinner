import React from 'react';
import { getTranslatedText } from '../../../shared/getTranslatedText/getTranslatedText';

interface I18nProps {
  children: string;
}

const I18n: React.FC<I18nProps> = ({ children }) => <>{getTranslatedText(children)}</>;

export default I18n;
