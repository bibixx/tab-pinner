import { HeartIcon } from 'lucide-react';
import { i18n } from '../../utils/i18n/i18n';

const mappings = [
  <HeartIcon
    key="icon"
    aria-hidden
    className="inline size-4 fill-red-500 align-text-bottom text-red-500"
  />,
  <a
    key="link"
    href="https://legiec.io"
    target="_blank"
    rel="noreferrer"
    className="text-link underline underline-offset-4 hover:text-link/70 dark:text-muted-foreground dark:hover:text-foreground"
  >
    bibixx
  </a>,
];

export const Footer = () => (
  <footer className="border-t p-4 text-center text-sm text-muted-foreground">
    {i18n('author', mappings)}
  </footer>
);
