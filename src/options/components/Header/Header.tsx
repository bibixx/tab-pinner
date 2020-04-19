import React from 'react';
import I18n from '../I18n';

import { Wrapper } from './Header.styled';
import { H1 } from '../Headings';

const Header: React.FC = () => (
  <Wrapper>
    <H1><I18n>options_title</I18n></H1>
  </Wrapper>
);

export default Header;
