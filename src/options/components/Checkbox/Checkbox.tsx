import React from 'react';
import {
  Wrapper, Input, StyledCheckbox, StyledCheckboxFocusWrapper, LabelText,
} from './Checkbox.styled';

type CheckboxProps = React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
> & { indeterminate?: boolean };

const Checkbox: React.FC<CheckboxProps> = ({
  checked, onChange, children, indeterminate = false, ...props
}) => (
  <Wrapper>
    <Input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      // eslint-disable-next-line react/jsx-props-no-spreading
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

export default Checkbox;
