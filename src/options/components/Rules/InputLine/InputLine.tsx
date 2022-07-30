import { ChangeEvent } from 'react';
import { PinnerRule } from '../../../../types/PinnerRule';
import { EditMode } from '../../../../types/EditMote';

import { Td } from '../Rules.styled';
import { Checkbox } from '../../Checkbox/Checkbox';
import { VisuallyHiddenLabel } from '../../VisuallyHidden/VisuallyHidden';
import { Input } from '../../Input/Input';

import { ColumnWrapper } from './InputLine.styled';
import { IconButton } from '../../IconButton/IconButton';
import { i18n } from '../../../utils/i18n/i18n';

interface InputLineProps {
  rule: PinnerRule;
  updateRule: (newRule: PinnerRule) => void;
  removeRule: (newRule: PinnerRule) => void;
  editMode: EditMode;
}

export const InputLine = ({
  rule,
  updateRule,
  removeRule,
  editMode,
}: InputLineProps) => {
  const { name, regexp, active } = rule;
  const position = rule.position === null ? '' : rule.position;

  const updateName = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => {
    const newRule: PinnerRule = { ...rule, name: value };
    updateRule(newRule);
  };

  const updateRegex = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => {
    const newRule: PinnerRule = { ...rule, regexp: value };
    updateRule(newRule);
  };

  const updatePosition = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => {
    const newPosition = Number.parseInt(value, 10);

    if (value === '') {
      const newRule: PinnerRule = { ...rule, position: null };

      updateRule(newRule);
      return;
    }

    const newRule: PinnerRule = { ...rule, position: newPosition };
    updateRule(newRule);
  };

  const onActiveChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newRule: PinnerRule = { ...rule, active: e.target.checked };
    updateRule(newRule);
  };

  const firstColumn =
    editMode === EditMode.active ? (
      <>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <VisuallyHiddenLabel htmlFor={`${rule.id}-active`}>
          {i18n('rule_active')}
        </VisuallyHiddenLabel>
        <Checkbox
          id={`${rule.id}-active`}
          checked={active}
          onChange={onActiveChange}
        />
      </>
    ) : (
      <IconButton onClick={() => removeRule(rule)}>delete</IconButton>
    );

  return (
    <tr>
      <Td>
        <ColumnWrapper>{firstColumn}</ColumnWrapper>
      </Td>
      <Td>
        <VisuallyHiddenLabel htmlFor={`${rule.id}-rule_name`}>
          {i18n('rule_name')}
        </VisuallyHiddenLabel>
        <Input
          id={`${rule.id}-rule_name`}
          type="text"
          value={name}
          onChange={updateName}
          placeholder={i18n('rule_name')}
        />
      </Td>
      <Td>
        <VisuallyHiddenLabel htmlFor={`${rule.id}-regular_expression`}>
          {i18n('regular_expression')}
        </VisuallyHiddenLabel>
        <Input
          id={`${rule.id}-regular_expression`}
          type="text"
          value={regexp}
          onChange={updateRegex}
          placeholder={i18n('regular_expression')}
        />
      </Td>
      <Td>
        <VisuallyHiddenLabel htmlFor={`${rule.id}-tab_index`}>
          {i18n('tab_index')}
        </VisuallyHiddenLabel>
        <Input
          id={`${rule.id}-tab_index`}
          type="number"
          value={position}
          onChange={updatePosition}
          min={0}
          step={0}
          placeholder={i18n('tab_index')}
          textAlign="right"
        />
      </Td>
    </tr>
  );
};
