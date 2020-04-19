import { PinnerRule } from '../../types/PinnerRule';
import { RuleBuilder } from './ruleBuilder';

export const getRules = (rules: any): PinnerRule[] => {
  if (!Array.isArray(rules)) {
    return [];
  }

  return rules.map(({
    id,
    active,
    name,
    regexp,
    position,
  }) => {
    const ruleBuilder = new RuleBuilder();

    if (typeof id === 'number') {
      ruleBuilder.setId(id);
    } else {
      ruleBuilder.setId(Date.now());
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
