import React from 'react';
import { getTranslatedText } from '../../../shared/getTranslatedText/getTranslatedText';

import { replaceStringsWithComponents, Mappings } from '../../utils/replaceStringsWithComponents';
import { renderWithReplacedStrings } from '../../utils/renderWithReplacedStrings';

const mappings: Mappings[] = [
  ['$heart', <span role="img" aria-label="love" key="heart">♥️</span>],
  ['$author', <a href="https://legiec.io" key="link">bibixx</a>],
];

const Footer: React.FC = () => {
  const authorString = replaceStringsWithComponents(mappings, getTranslatedText('author'));

  return (
    <footer>
      {renderWithReplacedStrings(authorString)}
    </footer>
  );
};

export default Footer;
