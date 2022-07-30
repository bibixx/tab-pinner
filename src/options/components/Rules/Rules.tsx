import { useState, useCallback, useMemo } from 'react';
import { PinnerRule } from '../../../types/PinnerRule';
import { EditMode } from '../../../types/EditMote';

import { InputLine } from './InputLine/InputLine';
import { i18n } from '../../utils/i18n/i18n';

import { H2 } from '../Headings/Headings';
import { VisuallyHiddenLabel } from '../VisuallyHidden/VisuallyHidden';
import { Checkbox } from '../Checkbox/Checkbox';
import { IconButton } from '../IconButton/IconButton';

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

export const Rules = ({
  rules,
  addRule,
  updateRule,
  removeRule,
  changeAllActive,
}: RulesProps) => {
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
        <VisuallyHiddenLabel htmlFor="header-active">
          {i18n('rule_active')}
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
      <IconButton onClick={() => {}}>
        delete
      </IconButton>
    );

  return (
    <Wrapper>
      <Header>
        <H2>{i18n('rules_header')}</H2>
        <RulesButtons>
          <IconButton onClick={addRule}>
            add
          </IconButton>
          <IconButton onClick={changeEditMode} active={editMode === EditMode.delete}>
            delete
          </IconButton>
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
              {i18n('rule_name')}
            </Th>
            <Th>
              {i18n('regular_expression')}
            </Th>
            <Th>
              {i18n('tab_index')}
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
