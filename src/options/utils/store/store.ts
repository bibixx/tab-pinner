import { getStorageValues } from '../../../shared/getStorageValues';
import { defaultStorageValues } from '../../../shared/getStorageValues/defaultStorageValues';
import { AppStorage } from '../../../types/AppStorage';
import { PinnerRule } from '../../../types/PinnerRule';
import { PinnerSettings } from '../../../types/PinnerSettings';
import { setStorageValues } from '../setStorageValues/setStorageValues';

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

    return this.storageValues;
  }

  async update() {
    setStorageValues(this.storageValues.rules, this.storageValues.settings);
  }

  getRules() {
    if (this.storageValues === undefined) {
      return defaultStorageValues.rules;
    }

    return this.storageValues.rules;
  }

  getSettings(): PinnerSettings {
    if (this.storageValues === undefined) {
      return defaultStorageValues.settings;
    }

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

  updateSettings(settings: PartialSettings) {
    const { storageValues } = this;
    const newSettings: PinnerSettings = {
      ...storageValues.settings,
      ...settings,
    };

    this.setStorageValues(storageValues.rules, newSettings);
  }
}

export const store = new Store();
