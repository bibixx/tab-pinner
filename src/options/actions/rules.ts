import { PinnerRule } from '../../types/PinnerRule';
import { store } from '../../shared/store';

export const addRule = (updateRules: Function) => async () => {
  const newRule: PinnerRule = {
    id: Date.now(),
    name: '',
    active: true,
    regexp: '',
    position: null,
  };

  await store.addRule(newRule);

  await updateRules();
};

export const updateRule = (updateRules: Function) => async (newRule: PinnerRule) => {
  await store.updateRule(newRule);

  await updateRules();
};

export const removeRule = (updateRules: Function) => async (rule: PinnerRule) => {
  await store.removeRule(rule);

  await updateRules();
};
