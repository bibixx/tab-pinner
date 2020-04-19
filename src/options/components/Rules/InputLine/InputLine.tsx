import React from 'react';
import { PinnerRule } from '../../../../types/PinnerRule';
import { EditMode } from '../../../../types/EditMote';

import { StyledInput } from './InputLine.styled';
import { getTranslatedText } from '../../../../shared/getTranslatedText/getTranslatedText';
import { Td } from '../Rules.styled';

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
      <StyledInput
        type="checkbox"
        checked={active}
        onChange={onActiveChange}
      />
    )
    : (<button onClick={() => removeRule(rule)} type="button">🗑</button>);

  return (
    <tr>
      <Td>{firstColumn}</Td>
      <Td>
        <StyledInput
          type="text"
          value={name}
          onChange={updateName}
          placeholder={getTranslatedText('rule_name')}
        />
      </Td>
      <Td>
        <StyledInput
          type="text"
          value={regexp}
          onChange={updateRegex}
          placeholder={getTranslatedText('regular_expression')}
        />
      </Td>
      <Td>
        <StyledInput
          type="number"
          value={position}
          onChange={updatePosition}
          min={0}
          step={0}
          placeholder={getTranslatedText('tab_index')}
        />
      </Td>
    </tr>
  );
};

export default InputLine;
