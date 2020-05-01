import { PinnerRule } from '../types/PinnerRule';
import { PinnerSettings } from '../types/PinnerSettings';
import { getStorageValues } from './getStorageValues';
import { AppStorage } from '../types/AppStorage';

interface PartialSettings {
  close?: boolean;
  confirm?: boolean;
  move?: boolean;
}

export class Store {
  private storageValues!: AppStorage;

  async init() {
    const storageValues = await getStorageValues();

    this.storageValues = storageValues;
  }

  getRules() {
    return this.storageValues.rules;
  }

  getSettings() {
    return this.storageValues.settings;
  }

  setStorageValues(
    rules: PinnerRule[],
    settings: PinnerSettings,
  ) {
    this.storageValues = {
      rules,
      settings,
    };
  }

  addRule(rule: PinnerRule) {
    const { storageValues } = this;
    const newRules = [...storageValues.rules, rule];

    this.setStorageValues(newRules, storageValues.settings);
  }

  removeRule(rule: PinnerRule) {
    const { storageValues } = this;
    const newRules = storageValues.rules.filter(({ id }) => rule.id !== id);

    if (newRules.length === 0) {
      this.storageValues = {
        rules: [{
          id: Date.now(),
          name: '',
          active: true,
          regexp: '',
          position: null,
        }],
        settings: storageValues.settings,
      };
    } else {
      this.setStorageValues(newRules, storageValues.settings);
    }
  }

  updateRule(newRule: PinnerRule) {
    const { storageValues } = this;
    const newRules = storageValues.rules
      .map((oldRule) => (oldRule.id === newRule.id ? newRule : oldRule));

    this.setStorageValues(newRules, storageValues.settings);
  }

  async updateSettings(settings: PartialSettings) {
    const storageValues = await getStorageValues();
    const newSettings: PinnerSettings = {
      ...storageValues.settings,
      ...settings,
    };

    this.setStorageValues(storageValues.rules, newSettings);
  }
}

export const store = new Store();
