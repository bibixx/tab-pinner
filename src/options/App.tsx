import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { PinnerRule } from '../types/PinnerRule';
import { Store } from '../shared/store';

const StyledInput = styled.input`
  width: 100%;
`;

interface InputLineProps {
  rule: PinnerRule;
  editRule: (newRule: PinnerRule) => void;
}

const InputLine: React.FC<InputLineProps> = ({ rule, editRule }) => {
  const { name } = rule;
  const { regexp } = rule;
  const position = typeof rule.position === 'number' ? rule.position : undefined;

  const update = (key: 'name'|'regexp') => ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    const newRule: PinnerRule = { ...rule, [key]: value };
    editRule(newRule);
  };

  const updatePosition = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    if (value === '') {
      const newRule: PinnerRule = { ...rule, position: null };

      editRule(newRule);
      return;
    }

    const newPosition = Number.parseInt(value, 10);
    const newRule: PinnerRule = { ...rule, position: newPosition };

    editRule(newRule);
  };

  return (
    <tr>
      <td>
        <StyledInput type="text" value={name} onChange={update('name')} />
      </td>
      <td>
        <StyledInput type="text" value={regexp} onChange={update('regexp')} />
      </td>
      <td>
        <StyledInput type="number" defaultValue={position} onChange={updatePosition} />
      </td>
    </tr>
  );
};

const App = () => {
  const storage = useRef<Store>();
  const [rules, setRules] = useState<PinnerRule[]>([]);

  useEffect(() => {
    const newStorage = new Store();
    storage.current = newStorage;

    (async () => {
      setRules(await newStorage.getRules());
    })();
  }, []);

  const addRule = () => {
    const newRule: PinnerRule = {
      id: Date.now(),
      name: '',
      active: true,
      regexp: '',
      position: null,
    };

    setRules([
      ...rules,
      newRule,
    ]);

    storage.current?.addRule(newRule);
  };

  const editRule = (newRule: PinnerRule) => {
    const newRules = rules.map((oldRule) => (oldRule.id === newRule.id ? newRule : oldRule));

    setRules(newRules);
    storage.current?.updateRule(newRule);
  };

  return (
    <div>
      <button onClick={addRule} type="button">addRule</button>
      <table>
        <thead>
          <tr>
            <th>Rule name</th>
            <th>Regular expression</th>
            <th>Tab index</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <InputLine key={rule.id} rule={rule} editRule={editRule} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
