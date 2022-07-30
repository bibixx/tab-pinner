import { StyleFooter, StyledIcon, Link } from './Footer.styled';
import { i18n } from '../i18n/i18n';

const mappings = [
  <StyledIcon>favorite</StyledIcon>,
  <Link href="https://legiec.io" key="link">bibixx</Link>,
];

export const Footer = () => {
  const authorString = i18n(
    'author',
    mappings,
  );

  return (
    <StyleFooter>
      {authorString}
    </StyleFooter>
  );
};
