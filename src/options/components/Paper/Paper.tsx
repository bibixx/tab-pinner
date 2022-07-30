import React from 'react';
import { Wrapper } from './Paper.styled';

interface PaperProps {
  children: React.ReactNode;
}

export const Paper = ({ children }: PaperProps) => (
  <Wrapper>{children}</Wrapper>
);
