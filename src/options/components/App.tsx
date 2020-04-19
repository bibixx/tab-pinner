import React, { useState, useEffect, useCallback } from 'react';
import InputLine from './InputLine/InputLine';
import { store } from '../../shared/store';
import { PinnerRule } from '../../types/PinnerRule';

const App = () => {
  const [rules, setRules] = useState<PinnerRule[]>([]);

  useEffect(() => {
    (async () => {
      setRules(await store.getRules());
    })();
  }, []);

  const updateRules = useCallback(async () => setRules(await store.getRules()), []);

  const addRule = useCallback(async () => {
    const newRule: PinnerRule = {
      id: Date.now(),
      name: '',
      active: true,
      regexp: '',
      position: null,
    };

    await store.addRule(newRule);

    await updateRules();
  }, [updateRules]);

  const updateRule = useCallback(async (newRule: PinnerRule) => {
    await store.updateRule(newRule);

    await updateRules();
  }, [updateRules]);

  const removeRule = useCallback(async (rule: PinnerRule) => {
    await store.removeRule(rule);

    await updateRules();
  }, [updateRules]);

  return (
    <div>
      <button onClick={addRule} type="button">addRule</button>
      <table>
        <thead>
          <tr>
            <th>Active</th>
            <th>Rule name</th>
            <th>Regular expression</th>
            <th>Tab index</th>
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
};

export default App;
