import { PinnerRule } from '../../types/PinnerRule';
import { store } from '../utils/store/store';

export const addRule = () => {
  const newRule: PinnerRule = {
    id: Date.now(),
    name: '',
    active: true,
    regexp: '',
    position: null,
  };

  store.addRule(newRule);
};

export const updateRule = (newRule: PinnerRule) => {
  store.updateRule(newRule);
};

export const removeRule = (rule: PinnerRule) => {
  store.removeRule(rule);
};

export const changeAllActive = (
  rules: PinnerRule[],
  isActive: boolean,
) => {
  for (const rule of rules) {
    store.updateRule({
      ...rule,
      active: isActive,
    });
  }
};
