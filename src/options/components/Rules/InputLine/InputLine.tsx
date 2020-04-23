import React from 'react';
import { PinnerRule } from '../../../../types/PinnerRule';
import { EditMode } from '../../../../types/EditMote';

import { getTranslatedText } from '../../../../shared/getTranslatedText/getTranslatedText';
import { Td } from '../Rules.styled';
import Checkbox from '../../Checkbox';
import { VisuallyHiddenLabel } from '../../VisuallyHidden';
import Input from '../../Input';

import { ColumnWrapper } from './InputLine.styled';
import I18n from '../../I18n';
import ButtonIcon from '../../IconButton';

interface InputLineProps {
  rule: PinnerRule;
  updateRule: (newRule: PinnerRule) => void;
  removeRule: (newRule: PinnerRule) => void;
  editMode: EditMode;
}

const InputLine: React.FC<InputLineProps> = ({
  rule,
  updateRule,
  removeRule,
  editMode,
}) => {
  const {
    name, regexp, active,
  } = rule;
  const position = rule.position === null ? '' : rule.position;

  const updateName = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    const newRule: PinnerRule = { ...rule, name: value };
    updateRule(newRule);
  };

  const updateRegex = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    const newRule: PinnerRule = { ...rule, regexp: value };
    updateRule(newRule);
  };

  const updatePosition = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    const newPosition = Number.parseInt(value, 10);

    if (value === '') {
      const newRule: PinnerRule = { ...rule, position: null };

      updateRule(newRule);
      return;
    }

    const newRule: PinnerRule = { ...rule, position: newPosition };
    updateRule(newRule);
  };

  const onActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRule: PinnerRule = { ...rule, active: e.target.checked };
    updateRule(newRule);
  };

  const firstColumn = editMode === EditMode.active
    ? (
      <>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <VisuallyHiddenLabel htmlFor={`${rule.id}-active`}>
          <I18n>rule_active</I18n>
        </VisuallyHiddenLabel>
        <Checkbox
          id={`${rule.id}-active`}
          checked={active}
          onChange={onActiveChange}
        />
      </>
    )
    : (
      <ButtonIcon onClick={() => removeRule(rule)}>
        delete
      </ButtonIcon>
    );

  return (
    <tr>
      <Td>
        <ColumnWrapper>
          {firstColumn}
        </ColumnWrapper>
      </Td>
      <Td>
        <VisuallyHiddenLabel htmlFor={`${rule.id}-rule_name`}>
          <I18n>rule_name</I18n>
        </VisuallyHiddenLabel>
        <Input
          id={`${rule.id}-rule_name`}
          type="text"
          value={name}
          onChange={updateName}
          placeholder={getTranslatedText('rule_name')}
        />
      </Td>
      <Td>
        <VisuallyHiddenLabel htmlFor={`${rule.id}-regular_expression`}>
          <I18n>regular_expression</I18n>
        </VisuallyHiddenLabel>
        <Input
          id={`${rule.id}-regular_expression`}
          type="text"
          value={regexp}
          onChange={updateRegex}
          placeholder={getTranslatedText('regular_expression')}
        />
      </Td>
      <Td>
        <VisuallyHiddenLabel htmlFor={`${rule.id}-tab_index`}>
          <I18n>tab_index</I18n>
        </VisuallyHiddenLabel>
        <Input
          id={`${rule.id}-tab_index`}
          type="number"
          value={position}
          onChange={updatePosition}
          min={0}
          step={0}
          placeholder={getTranslatedText('tab_index')}
          textAlign="right"
        />
      </Td>
    </tr>
  );
};

export default InputLine;
