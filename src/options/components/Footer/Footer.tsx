import React from 'react';

import { getTranslatedText } from '../../../shared/getTranslatedText/getTranslatedText';

import { StyleFooter, StyledIcon, Link } from './Footer.styled';
import { replaceWithElements } from '../utils/replaceWithElements';

const mappings = [
  <StyledIcon>favorite</StyledIcon>,
  <Link href="https://legiec.io" key="link">bibixx</Link>,
];

const Footer: React.FC = () => {
  const authorString = replaceWithElements(
    getTranslatedText('author'),
    /\$\w+/g,
    mappings,
  );

  return (
    <StyleFooter>
      {authorString}
    </StyleFooter>
  );
};

export default Footer;
