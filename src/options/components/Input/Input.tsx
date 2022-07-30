import React from 'react';
import {
  StyledInput, Wrapper, Underline, StyledInputProps,
} from './Input.styled';

type InputProps = React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
> & StyledInputProps;

export const Input = (props: InputProps) => (
  <Wrapper>
    <StyledInput {...props} />
    <Underline />
  </Wrapper>
);
