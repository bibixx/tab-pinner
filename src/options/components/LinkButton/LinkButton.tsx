import { ComponentProps, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const LinkButton = ({
  className,
  ...props
}: ComponentProps<typeof Button>) => (
  <Button
    variant="link"
    className={cn(
      // The padding gives the focus ring room; the margins cancel it and the border out.
      '-mx-[5px] -my-[3px] h-auto px-1 py-0.5 font-normal whitespace-normal text-link underline transition-none hover:text-link/70',
      className,
    )}
    {...props}
  />
);

export const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <LinkButton asChild>
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  </LinkButton>
);
