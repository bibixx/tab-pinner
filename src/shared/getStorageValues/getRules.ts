import { PinnerRule } from '../../types/PinnerRule';
import { RuleBuilder } from './ruleBuilder';
import { defaultStorageValues } from './defaultStorageValues';

export const getRules = (rules: any): PinnerRule[] => {
  if (!Array.isArray(rules)) {
    return defaultStorageValues.rules;
  }

  return rules.map(({
    id,
    active,
    name,
    regexp,
    position,
  }, i) => {
    const ruleBuilder = new RuleBuilder();

    if (typeof id === 'number') {
      ruleBuilder.setId(id);
    } else {
      ruleBuilder.setId(Date.now() + i);
    }

    if (typeof active === 'boolean') {
      ruleBuilder.setActive(active);
    }

    if (typeof name === 'string') {
      ruleBuilder.setName(name);
    }

    if (typeof regexp === 'string') {
      ruleBuilder.setRegexp(regexp);
    }

    if (typeof position === 'string') {
      if (position === '') {
        ruleBuilder.setPosition(null);
      } else {
        ruleBuilder.setPosition(Number.parseInt(position, 10));
      }
    } else if (typeof position === 'number' && position >= 0) {
      ruleBuilder.setPosition(position);
    }

    return ruleBuilder.getRule();
  });
};
