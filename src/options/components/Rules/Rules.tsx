import React, { useState } from 'react';
import { PinnerRule } from '../../../types/PinnerRule';
import { EditMode } from '../../../types/EditMote';

import InputLine from './InputLine';
import I18n from '../I18n';

import { H2 } from '../Headings';
import Icon from '../Icon';
import { VisuallyHiddenLabel } from '../VisuallyHidden';
import Checkbox from '../Checkbox';

import {
  Wrapper, Header, Table, Th, ColumnWrapper,
} from './Rules.styled';

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
}) => {
  const [editMode, setEditMode] = useState<EditMode>(EditMode.active);

  const changeEditMode = () => {
    setEditMode(editMode === EditMode.active ? EditMode.delete : EditMode.active);
  };

  return (
    <Wrapper>
      <Header>
        <H2><I18n>rules_header</I18n></H2>
        <div>
          <button onClick={addRule} type="button">
            <Icon>add</Icon>
          </button>
          <button onClick={changeEditMode} type="button">
            <Icon>delete</Icon>
          </button>
        </div>
      </Header>
      <Table>
        <thead>
          <tr>
            <Th>
              <ColumnWrapper>
                <VisuallyHiddenLabel htmlFor="header-active">
                  <I18n>rule_active_all</I18n>
                </VisuallyHiddenLabel>
                <Checkbox
                  id="header-active"
                  checked
                />
              </ColumnWrapper>
            </Th>
            <Th>
              <I18n>rule_name</I18n>
            </Th>
            <Th>
              <I18n>regular_expression</I18n>
            </Th>
            <Th>
              <I18n>tab_index</I18n>
            </Th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <InputLine
              key={rule.id}
              rule={rule}
              updateRule={updateRule}
              removeRule={removeRule}
              editMode={editMode}
            />
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default Rules;
