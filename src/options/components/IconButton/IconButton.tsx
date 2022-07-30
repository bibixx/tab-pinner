import React from 'react';
import { Icon } from '../Icon/Icon';
import { StyledButton } from './IconButton.styled';

interface IconButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: string;
  active?: boolean;
}

export const IconButton = ({ onClick, children, active = false }: IconButtonProps) => (
  <StyledButton onClick={onClick} type="button" active={active}>
    <Icon>{children}</Icon>
  </StyledButton>
);
