import { PinnerRule } from '../../types/PinnerRule';
import { createEmptyRule } from '../utils/createEmptyRule/createEmptyRule';
import { store } from '../utils/store/store';

export const addRule = () => {
  store.addRule(createEmptyRule());
};

export const updateRule = (newRule: PinnerRule) => {
  store.updateRule(newRule);
};

export const removeRule = (rule: PinnerRule) => {
  store.removeRule(rule);
};
