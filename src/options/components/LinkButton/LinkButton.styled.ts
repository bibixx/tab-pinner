import styled from '@emotion/styled';

export const StyledLinkText = styled.button`
  margin: 0;
  padding: 0;
  background: none;
  border: 0;
  appearance: none;
  color: var(--accent-color-2);
  font: inherit;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledLink = StyledLinkText.withComponent('a');
