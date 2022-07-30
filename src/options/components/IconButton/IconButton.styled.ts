import styled from '@emotion/styled';

interface StyledButtonProps {
  active?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  position: relative;
  border: none;
  background: none;
  appearance: none;
  padding: 0;
  height: 1.5rem;
  width: 1.5rem;
  outline: 0;
  cursor: pointer;
  color: ${(props) =>
    !props.active ? 'var(--button-icon)' : 'var(--accent-color-2)'};

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0.75rem;
    top: 0.75rem;
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
    border-radius: 50%;
    background: currentColor;
    width: 1.5rem;
    height: 1.5rem;
    transition: 0.15s ease-in-out;
    transition-property: opacity, background-color;
  }

  &:hover::before {
    opacity: 0.15;
  }

  [data-whatinput='keyboard'] &:focus::before {
    opacity: 0.25;
  }
`;
