import { Wrapper } from './Header.styled';
import { H1 } from '../Headings/Headings';
import { i18n } from '../../utils/i18n/i18n';

export const Header = () => (
  <Wrapper>
    <H1>{i18n('options_title')}</H1>
  </Wrapper>
);
