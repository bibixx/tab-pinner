import React from 'react';
import {
  StyledInput, Wrapper, Underline, StyledInputProps,
} from './Input.styled';

type InputProps = React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
> & StyledInputProps;

const Input: React.FC<InputProps> = ({ ...props }) => (
  <Wrapper>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <StyledInput {...props} />
    <Underline />
  </Wrapper>
);

export default Input;
