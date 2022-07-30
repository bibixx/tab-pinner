import React from 'react';

interface IconProps {
  className?: string;
  children: React.ReactChild;
}

export const Icon = ({ children, className }: IconProps) => (
  <i className={['material-icons', className].join(' ')}>{children}</i>
);
