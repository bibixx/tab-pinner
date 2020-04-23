import React, { useState, useCallback, useMemo } from 'react';
import { PinnerRule } from '../../../types/PinnerRule';
import { EditMode } from '../../../types/EditMote';

import InputLine from './InputLine';
import I18n from '../I18n';

import { H2 } from '../Headings';
import { VisuallyHiddenLabel } from '../VisuallyHidden';
import Checkbox from '../Checkbox';
import ButtonIcon from '../IconButton';

import {
  Wrapper, Header, Table, Th, ColumnWrapper, RulesButtons,
} from './Rules.styled';

interface RulesProps {
  rules: PinnerRule[];
  addRule: () => void;
  updateRule: (rule: PinnerRule) => void;
  removeRule: (rule: PinnerRule) => void;
  changeAllActive: (rules: PinnerRule[], isActive: boolean) => void;
}

const Rules: React.FC<RulesProps> = ({
  rules,
  addRule,
  updateRule,
  removeRule,
  changeAllActive,
}) => {
  const [editMode, setEditMode] = useState<EditMode>(EditMode.active);

  const changeEditMode = () => {
    setEditMode(editMode === EditMode.active ? EditMode.delete : EditMode.active);
  };

  const areAllChecked = useMemo(() => rules.every(({ active }) => active), [rules]);
  const areAllUnchecked = useMemo(() => rules.every(({ active }) => !active), [rules]);
  const onHeaderActiveChange = useCallback(
    () => changeAllActive(rules, !areAllChecked),
    [rules, areAllChecked, changeAllActive],
  );

  const firstColumn = editMode === EditMode.active
    ? (
      <>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <VisuallyHiddenLabel htmlFor="header-active">
          <I18n>rule_active</I18n>
        </VisuallyHiddenLabel>
        <Checkbox
          id="header-active"
          checked={!areAllUnchecked}
          onChange={onHeaderActiveChange}
          indeterminate={!areAllChecked}
        />
      </>
    )
    : (
      <ButtonIcon onClick={() => {}}>
        delete
      </ButtonIcon>
    );

  return (
    <Wrapper>
      <Header>
        <H2><I18n>rules_header</I18n></H2>
        <RulesButtons>
          <ButtonIcon onClick={addRule}>
            add
          </ButtonIcon>
          <ButtonIcon onClick={changeEditMode}>
            delete
          </ButtonIcon>
        </RulesButtons>
      </Header>
      <Table>
        <thead>
          <tr>
            <Th>
              <ColumnWrapper>
                {firstColumn}
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
