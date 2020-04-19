import React from 'react';
import { PinnerRule } from '../../../types/PinnerRule';
import { StyledInput } from './InputLine.styled';
import { getTranslatedText } from '../../../shared/getTranslatedText/getTranslatedText';

interface InputLineProps {
  rule: PinnerRule;
  updateRule: (newRule: PinnerRule) => void;
  removeRule: (newRule: PinnerRule) => void;
}

const InputLine: React.FC<InputLineProps> = ({
  rule,
  updateRule,
  removeRule,
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

  return (
    <tr>
      <td>
        <button onClick={() => removeRule(rule)} type="button">🗑</button>
        <StyledInput
          type="checkbox"
          checked={active}
          onChange={onActiveChange}
        />
      </td>
      <td>
        <StyledInput
          type="text"
          value={name}
          onChange={updateName}
          placeholder={getTranslatedText('rule_name')}
        />
      </td>
      <td>
        <StyledInput
          type="text"
          value={regexp}
          onChange={updateRegex}
          placeholder={getTranslatedText('regular_expression')}
        />
      </td>
      <td>
        <StyledInput
          type="number"
          value={position}
          onChange={updatePosition}
          min={0}
          step={0}
          placeholder={getTranslatedText('tab_index')}
        />
      </td>
    </tr>
  );
};

export default InputLine;
