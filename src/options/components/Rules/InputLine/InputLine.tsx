import { ChangeEvent, useState } from 'react';
import { Trash2Icon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { TableCell, TableRow } from '@/components/ui/table';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { MatchType, PinnerRule } from '../../../../types/PinnerRule';
import { compileRule } from '../../../../shared/compileRule/compileRule';
import { i18n } from '../../../utils/i18n/i18n';

// The generated toggle only styles aria-pressed, which single-select items don't set.
// The radius is the input group's (--radius * 1.8) minus the 2px inset, to stay concentric.
const segmentClassName =
  'rounded-[calc(var(--radius)*1.8-2px)] data-[state=on]:bg-background data-[state=on]:text-foreground';

interface InputLineProps {
  rule: PinnerRule;
  updateRule: (newRule: PinnerRule) => void;
  removeRule: (newRule: PinnerRule) => void;
}

export const InputLine = ({ rule, updateRule, removeRule }: InputLineProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { name, matchType, pattern, active } = rule;
  const position = rule.position === null ? '' : rule.position;
  const isInvalid = pattern.trim() !== '' && compileRule(rule) === null;
  const isSimple = matchType === 'simple';

  const updateName = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => {
    updateRule({ ...rule, name: value });
  };

  const updatePattern = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => {
    updateRule({ ...rule, pattern: value });
  };

  const updateMatchType = (value: string): void => {
    // Radix reports an empty value when the selected item is clicked again.
    if (value !== '') {
      updateRule({ ...rule, matchType: value as MatchType });
    }
  };

  const updatePosition = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => {
    updateRule({
      ...rule,
      position: value === '' ? null : Number.parseInt(value, 10),
    });
  };

  const onDeleteClick = () => {
    if (name === '' && pattern === '') {
      removeRule(rule);
      return;
    }

    setIsConfirmOpen(true);
  };

  return (
    <TableRow>
      <TableCell className="[&:has([role=checkbox])]:pr-2">
        <div className="flex justify-center">
          <Checkbox
            aria-label={i18n('rule_active')}
            checked={active}
            onCheckedChange={(value) =>
              updateRule({ ...rule, active: value === true })
            }
          />
        </div>
      </TableCell>
      <TableCell>
        <Input
          type="text"
          value={name}
          onChange={updateName}
          placeholder={i18n('rule_name')}
          aria-label={i18n('rule_name')}
        />
      </TableCell>
      <TableCell className="whitespace-normal">
        <InputGroup>
          <InputGroupInput
            type="text"
            value={pattern}
            onChange={updatePattern}
            placeholder={
              isSimple
                ? i18n('rule_match_placeholder_simple')
                : i18n('rule_match_placeholder_regexp')
            }
            aria-label={i18n('rule_match')}
            aria-invalid={isInvalid}
          />
          <InputGroupAddon align="inline-end" className="py-0 pr-px">
            <ToggleGroup
              type="single"
              size="sm"
              spacing={0.5}
              value={matchType}
              onValueChange={updateMatchType}
              aria-label={i18n('rule_type')}
            >
              <ToggleGroupItem value="simple" className={segmentClassName}>
                {i18n('rule_type_simple')}
              </ToggleGroupItem>
              <ToggleGroupItem value="regexp" className={segmentClassName}>
                {i18n('rule_type_regexp')}
              </ToggleGroupItem>
            </ToggleGroup>
          </InputGroupAddon>
        </InputGroup>
        {isInvalid && (
          <p role="alert" className="mt-1 text-xs text-destructive">
            {i18n(isSimple ? 'rule_invalid_simple' : 'rule_invalid_regexp')}
          </p>
        )}
      </TableCell>
      <TableCell>
        <Input
          type="number"
          min={0}
          value={position}
          onChange={updatePosition}
          aria-label={i18n('tab_index')}
        />
      </TableCell>
      <TableCell className="pl-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={i18n('remove_b')}
              onClick={onDeleteClick}
            >
              <Trash2Icon />
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={2}>{i18n('remove_b')}</TooltipContent>
        </Tooltip>
        <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
          <AlertDialogContent aria-describedby={undefined}>
            <AlertDialogHeader>
              <AlertDialogTitle>{i18n('delete_rule_confirm')}</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{i18n('cancel_button')}</AlertDialogCancel>
              <AlertDialogAction onClick={() => removeRule(rule)}>
                {i18n('delete_button')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};
