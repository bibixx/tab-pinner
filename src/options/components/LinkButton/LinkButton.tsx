import { MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { StyledLinkText, StyledLink } from './LinkButton.styled';

interface LinkButtonProps {
  href?: string;
  children: ReactNode;
  onClick?: (event: ReactMouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

export const LinkButton = ({ href, children, onClick }: LinkButtonProps) => {
  if (href) {
    return <StyledLink href={href} onClick={onClick}>{children}</StyledLink>;
  }

  return <StyledLinkText onClick={onClick}>{children}</StyledLinkText>;
};
