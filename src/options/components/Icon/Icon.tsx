import { ReactNode } from 'react';

interface IconProps {
  className?: string;
  children: ReactNode;
}

export const Icon = ({ children, className }: IconProps) => (
  <i className={['material-icons', className].join(' ')}>{children}</i>
);
