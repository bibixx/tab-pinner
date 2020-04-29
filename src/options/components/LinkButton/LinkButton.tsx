import React, { ReactChild } from 'react';
import { StyledLinkText, StyledLink } from './LinkButton.styled';

interface LinkButtonProps {
  href?: string;
  children: ReactChild;
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, children, onClick }) => {
  if (href) {
    return <StyledLink href={href} onClick={onClick}>{children}</StyledLink>;
  }

  return <StyledLinkText onClick={onClick}>{children}</StyledLinkText>;
};

export default LinkButton;
