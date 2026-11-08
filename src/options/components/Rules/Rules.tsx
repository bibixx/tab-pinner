import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PinnerRule } from '../../../types/PinnerRule';

import { InputLine } from './InputLine/InputLine';
import { PatternGuide } from './PatternGuide/PatternGuide';
import { i18n } from '../../utils/i18n/i18n';

interface RulesProps {
  rules: PinnerRule[];
  addRule: () => void;
  updateRule: (rule: PinnerRule) => void;
  removeRule: (rule: PinnerRule) => void;
}

export const Rules = ({
  rules,
  addRule,
  updateRule,
  removeRule,
}: RulesProps) => (
  <Card className="gap-2">
    <CardHeader>
      <CardTitle className="row-span-2 self-center text-lg">
        {i18n('rules_header')}
      </CardTitle>
      <CardAction>
        <Button variant="outline" onClick={addRule}>
          <PlusIcon />
          {i18n('add')}
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent className="space-y-4">
      <Table className="min-w-[44rem]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-px text-center">
              {i18n('enabled')}
            </TableHead>
            <TableHead>{i18n('rule_name')}</TableHead>
            <TableHead>{i18n('rule_match')}</TableHead>
            <TableHead className="w-24">{i18n('tab_index')}</TableHead>
            <TableHead className="w-px pl-0" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rules.map((rule) => (
            <InputLine
              key={rule.id}
              rule={rule}
              updateRule={updateRule}
              removeRule={removeRule}
            />
          ))}
        </TableBody>
      </Table>
      <PatternGuide />
    </CardContent>
  </Card>
);
