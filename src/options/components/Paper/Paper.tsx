import React from 'react';
import { Wrapper } from './Paper.styled';

interface PaperProps {
  children: React.ReactNode;
}

const Paper: React.FC<PaperProps> = ({ children }) => (
  <Wrapper>{children}</Wrapper>
);

export default Paper;
