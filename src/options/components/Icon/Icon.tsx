import React from 'react';

interface IconProps {
  className?: string;
  children: React.ReactChild;
}

const Icon: React.FC<IconProps> = ({ children, className }) => (
  <i className={['material-icons', className].join(' ')}>{children}</i>
);

export default Icon;
