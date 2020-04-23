import React from 'react';
import Icon from '../Icon';
import { StyledButton } from './IconButton.styled';

interface IconButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: string;
  active?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, children, active = false }) => (
  <StyledButton onClick={onClick} type="button" active={active}>
    <Icon>{children}</Icon>
  </StyledButton>
);

export default IconButton;
