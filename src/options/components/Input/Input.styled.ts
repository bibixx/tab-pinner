import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
`;

export const Underline = styled.div`
  position: absolute;
  bottom: -0.25rem;
  left: 0;
  width: 100%;
  transform: scaleX(0);
  transition: transform 0.2s ease-in-out;
  border-bottom: 2px solid var(--accent-color-1);
  content: "";
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
  font-size: 0.75rem;
  outline: 0;
  text-align: ${(props) => props.textAlign || 'left'};

  &:focus + ${Underline} {
    transform: scaleX(1);
  }
`;
