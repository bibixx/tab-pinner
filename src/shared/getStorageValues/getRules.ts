import { PinnerRule } from '../../types/PinnerRule';
import { RuleBuilder } from './ruleBuilder';
import { defaultStorageValues } from './defaultStorageValues';

export const getRules = (rules: Record<string, string>[]): PinnerRule[] => {
  if (!Array.isArray(rules)) {
    return defaultStorageValues.rules;
  }

  return rules.map((storedRule, i) => {
    const { id, active, name, matchType, pattern, regexp, position } =
      storedRule;
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

    if (typeof pattern === 'string') {
      ruleBuilder.setPattern(pattern);
      ruleBuilder.setMatchType(matchType === 'regexp' ? 'regexp' : 'simple');
    } else if (typeof regexp === 'string') {
      // Rules saved before simple patterns existed only have `regexp`.
      ruleBuilder.setPattern(regexp);
      ruleBuilder.setMatchType('regexp');
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
