import styled from '@emotion/styled';

export const Wrapper = styled.label`
  position: relative;
  display: flex;
  align-items: center;
`;

interface StyledCheckboxProps {
  indeterminate?: boolean;
}

export const StyledCheckbox = styled.div<StyledCheckboxProps>`
  position: relative;
  height: 100%;
  width: 100%;
  color: var(--accent-color-1);
  cursor: pointer;
  transition: color 0.1s ease-in-out;

  &::before, &::after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    height: 100%;
    width: 100%;
    transition: opacity 0.1s ease-in-out;
  }

  &::before {
    content: 'check_box_outline_blank';
  }

  &::after {
    content: '${(props) => (props.indeterminate ? 'indeterminate_check_box' : 'check_box')}';
    opacity: 0;
  }
`;

export const StyledCheckboxFocusWrapper = styled.div`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;

  &:hover::before {
    opacity: 0.15;
  }

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
`;

export const Input = styled.input<StyledCheckboxProps>`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.0000001;

  [data-whatinput="keyboard"] &:focus + ${StyledCheckboxFocusWrapper}::before {
    opacity: 0.25;
  }

  &:checked + ${StyledCheckboxFocusWrapper} ${StyledCheckbox} {
    &::before {
      opacity: 0;
    }

    &::after {
      opacity: 1;
    }
  }

  &:disabled + ${StyledCheckboxFocusWrapper} {
    &::before {
      display: none;
    }

    ${StyledCheckbox} {
      color: var(--input-disabled);
      cursor: unset;
    }
  }
`;

export const LabelText = styled.span`
  padding-left: 0.5rem;
`;
