import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ExternalLink, LinkButton } from '../../LinkButton/LinkButton';
import { i18n } from '../../../utils/i18n/i18n';

const examples = [
  ['facebook.com', 'pattern_guide_example_home'],
  ['facebook.com/*', 'pattern_guide_example_site'],
  ['*.google.com/*', 'pattern_guide_example_subdomains'],
  ['example.com/blog', 'pattern_guide_example_page'],
  ['example.com/blog/*', 'pattern_guide_example_section'],
  ['https://example.com/*', 'pattern_guide_example_scheme'],
  ['example.com/search', 'pattern_guide_example_ignored'],
  ['example.com/search?q=*', 'pattern_guide_example_query'],
] as const;

export const PatternGuide = () => (
  <Dialog>
    <DialogTrigger asChild>
      <LinkButton>{i18n('pattern_guide_open')}</LinkButton>
    </DialogTrigger>
    <DialogContent
      aria-describedby={undefined}
      className="max-h-[85svh] gap-4 overflow-y-auto sm:max-w-2xl"
    >
      <DialogHeader>
        <DialogTitle>{i18n('pattern_guide_title')}</DialogTitle>
      </DialogHeader>
      <section className="space-y-2">
        <h3 className="text-sm font-semibold">{i18n('rule_type_simple')}</h3>
        <p className="text-sm">
          {i18n('pattern_guide_wildcard', [
            <ExternalLink
              key="link"
              href="https://en.wikipedia.org/wiki/Wildcard_character"
            >
              {i18n('pattern_guide_wildcard_link')}
            </ExternalLink>,
          ])}
        </p>
        <div className="-mx-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{i18n('pattern_guide_pattern')}</TableHead>
                <TableHead>{i18n('pattern_guide_meaning')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {examples.map(([pattern, meaning]) => (
                <TableRow key={pattern}>
                  <TableCell>
                    <code>{pattern}</code>
                  </TableCell>
                  <TableCell className="whitespace-normal">
                    {i18n(meaning)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section className="space-y-2">
        <h3 className="text-sm font-semibold">{i18n('rule_type_regexp')}</h3>
        <p className="text-sm">
          {i18n('pattern_guide_regexp', [
            <ExternalLink
              key="link"
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions"
            >
              {i18n('pattern_guide_regexp_link')}
            </ExternalLink>,
          ])}
        </p>
      </section>
    </DialogContent>
  </Dialog>
);
