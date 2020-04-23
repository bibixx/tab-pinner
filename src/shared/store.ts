import { PinnerRule } from '../types/PinnerRule';
import { PinnerSettings } from '../types/PinnerSettings';
import { getStorageValues } from './getStorageValues';
import { setStorageValues } from './setStorageValues';

interface PartialSettings {
  close?: boolean;
  confirm?: boolean;
  move?: boolean;
}

export class Store {
  async getRules() {
    const storageValues = await getStorageValues();

    return storageValues.rules;
  }

  async getSettings() {
    const storageValues = await getStorageValues();

    return storageValues.settings;
  }

  async addRule(rule: PinnerRule) {
    const storageValues = await getStorageValues();
    const newRules = [...storageValues.rules, rule];

    setStorageValues(newRules, storageValues.settings);
  }

  async removeRule(rule: PinnerRule) {
    const storageValues = await getStorageValues();
    const newRules = storageValues.rules.filter(({ id }) => rule.id !== id);

    if (newRules.length === 0) {
      setStorageValues(
        [{
          id: Date.now(),
          name: '',
          active: true,
          regexp: '',
          position: null,
        }],
        storageValues.settings,
      );
    } else {
      setStorageValues(newRules, storageValues.settings);
    }
  }

  async updateRule(newRule: PinnerRule) {
    const storageValues = await getStorageValues();
    const newRules = storageValues.rules
      .map((oldRule) => (oldRule.id === newRule.id ? newRule : oldRule));

    setStorageValues(newRules, storageValues.settings);
  }

  async updateSettings(settings: PartialSettings) {
    const storageValues = await getStorageValues();
    const newSettings: PinnerSettings = {
      ...storageValues.settings,
      ...settings,
    };

    setStorageValues(storageValues.rules, newSettings);
  }
}

export const store = new Store();
