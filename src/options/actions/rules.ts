import { PinnerRule } from '../../types/PinnerRule';
import { store } from '../../shared/store';

export const addRule = (updateRules: Function) => () => {
  const newRule: PinnerRule = {
    id: Date.now(),
    name: '',
    active: true,
    regexp: '',
    position: null,
  };

  store.addRule(newRule);

  updateRules(store.getRules());
};

export const updateRule = (updateRules: Function) => (newRule: PinnerRule) => {
  store.updateRule(newRule);

  updateRules(store.getRules());
};

export const removeRule = (updateRules: Function) => (rule: PinnerRule) => {
  store.removeRule(rule);

  updateRules(store.getRules());
};

export const changeAllActive = (
  updateRules: Function,
) => (
  rules: PinnerRule[],
  isActive: boolean,
) => {
  for (const rule of rules) {
    store.updateRule({
      ...rule,
      active: isActive,
    });
  }

  updateRules(store.getRules());
};
