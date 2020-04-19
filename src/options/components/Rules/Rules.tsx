import React from 'react';
import { PinnerRule } from '../../../types/PinnerRule';
import InputLine from '../InputLine';
import I18n from '../I18n';

interface RulesProps {
  rules: PinnerRule[];
  addRule: () => void;
  updateRule: (rule: PinnerRule) => void;
  removeRule: (rule: PinnerRule) => void;
}

const Rules: React.FC<RulesProps> = ({
  rules,
  addRule,
  updateRule,
  removeRule,
}) => (
  <div>
    <h2><I18n>rules_header</I18n></h2>
    <button onClick={addRule} type="button">addRule</button>
    <table>
      <thead>
        <tr>
          <th>
            Active
          </th>
          <th>
            <I18n>rule_name</I18n>
          </th>
          <th>
            <I18n>regular_expression</I18n>
          </th>
          <th>
            <I18n>tab_index</I18n>
          </th>
        </tr>
      </thead>
      <tbody>
        {rules.map((rule) => (
          <InputLine
            key={rule.id}
            rule={rule}
            updateRule={updateRule}
            removeRule={removeRule}
          />
        ))}
      </tbody>
    </table>
  </div>
);

export default Rules;
