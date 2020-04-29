import styled from '@emotion/styled';

import { H2 } from '../Headings';

export const Wrapper = styled.div`
  border-radius: 0.5rem;
  background: var(--paper-color);
  color: var(--paper-text-color);
  box-sizing: border-box;
`;

export const Body = styled.header`
  padding: 0.5rem 1.5rem;
`;

export const Header = styled.main`
  padding: 1.5rem 1.5rem 0.5rem;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 1.5rem 1rem;
`;

export const StyledH2 = styled(H2)`
  margin-bottom: 0;
`;
