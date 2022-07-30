import styled from '@emotion/styled';
import { Icon } from '../Icon/Icon';

export const StyleFooter = styled.footer`
  display: flex;
  flex: 1 1;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  padding: 1rem 3rem;
  box-sizing: border-box;
`;

export const StyledIcon = styled(Icon)`
  color: var(--heart-icon);
  font-size: 1.25rem;
  line-height: 1.25rem;
`;

export const Link = styled.a`
  color: var(--text-color);
`;
