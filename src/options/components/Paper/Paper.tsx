import { ReactNode } from 'react';
import { Wrapper } from './Paper.styled';

interface PaperProps {
  children: ReactNode;
}

export const Paper = ({ children }: PaperProps) => (
  <Wrapper>{children}</Wrapper>
);
