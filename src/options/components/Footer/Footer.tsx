import React from 'react';
import { getTranslatedText } from '../../../shared/getTranslatedText/getTranslatedText';

import { replaceStringsWithComponents, Mappings } from '../../utils/replaceStringsWithComponents';
import { renderWithReplacedStrings } from '../../utils/renderWithReplacedStrings';
import { StyleFooter, StyledIcon, Link } from './Footer.styled';

const mappings: Mappings[] = [
  ['$heart', <StyledIcon>favorite</StyledIcon>],
  ['$author', <Link href="https://legiec.io" key="link">bibixx</Link>],
];

const Footer: React.FC = () => {
  const authorString = replaceStringsWithComponents(mappings, getTranslatedText('author'));

  return (
    <StyleFooter>
      {renderWithReplacedStrings(authorString)}
    </StyleFooter>
  );
};

export default Footer;
