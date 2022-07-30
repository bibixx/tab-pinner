import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import {
  Wrapper, Input, StyledCheckbox, StyledCheckboxFocusWrapper, LabelText,
} from './Checkbox.styled';

interface CheckboxProps extends
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  indeterminate?: boolean
}

export const Checkbox = ({
  checked, onChange, children, indeterminate = false, ...props
}: CheckboxProps) => (
  <Wrapper>
    <Input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      {...props}
    />
    <StyledCheckboxFocusWrapper aria-hidden>
      <StyledCheckbox className="material-icons" indeterminate={indeterminate} />
    </StyledCheckboxFocusWrapper>
    {children && (
      <LabelText>
        {children}
      </LabelText>
    )}
  </Wrapper>
);
