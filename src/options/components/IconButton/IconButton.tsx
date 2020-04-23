import React from 'react';
import Icon from '../Icon';
import { StyledButton } from './IconButton.styled';

interface IconButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: string;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, children }) => (
  <StyledButton onClick={onClick} type="button">
    <Icon>{children}</Icon>
  </StyledButton>
);

export default IconButton;
