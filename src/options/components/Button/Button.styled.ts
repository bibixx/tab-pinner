import styled from '@emotion/styled';

const StyledButton = styled.button`
  border-radius: 0.25em;
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 1em;
  padding: 0.5em 1em;
  border: 0;
  appearance: none;
  text-transform: uppercase;
  background: var(--button-background);
  color: var(--button-color);
  transition: background 0.1s ease-in-out;
  cursor: pointer;

  &:hover {
    background: var(--button-background-focus);
  }
`;

export default StyledButton;
