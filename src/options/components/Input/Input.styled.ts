import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
`;

export const Underline = styled.div`
  position: absolute;
  bottom: -0.25rem;
  left: 0;
  width: 100%;
  height: 2px;

  &::before, &::after {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
  }

  &::before {
    transform: scaleY(0);
    transform-origin: bottom;
    background: var(--paper-text-color);
    transition: transform 0.1s ease-in-out;
  }

  &::after {
    transform: scaleX(0);
    transform-origin: center;
    background: var(--accent-color-1);
    transition: transform 0.2s ease-in-out;
  }
`;

export interface StyledInputProps {
  textAlign?: 'left'|'right'|'center';
}

export const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  appearance: none;
  border: 0;
  background: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  outline: 0;
  text-align: ${(props) => props.textAlign || 'left'};
  padding: 0;

  &[type=number]::-webkit-inner-spin-button,
  &[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:hover + ${Underline} {
    &::before {
      transform: scaleY(1);
    }
  }

  &:focus + ${Underline} {
    &::after {
      transform: scaleX(1);
    }
  }
`;
