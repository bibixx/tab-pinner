import { PinnerRule } from "../types/PinnerRule";
import { PinnerSettings } from "../types/PinnerSettings";
import { getStorageValues } from "./getStorageValues";
import { setStorageValues } from "./setStorageValues";

interface PartialSettings {
  close?: boolean;
  confirm?: boolean;
  move?: boolean;
}

export class Store {
  public rules: PinnerRule[];
  public settings: PinnerSettings;
  public loaded = false;
  public loadingPromise?: Promise<void>;

  async getRules() {
    if (this.loaded === true) {
      return this.rules;
    }

    await this.loadingPromise;

    return this.rules;
  }

  async getSettings() {
    if (this.loaded === true) {
      return this.rules;
    }

    await this.loadingPromise;

    return this.rules;
  }

  constructor() {
    this.loadingPromise = this.loadData();
  }

  async loadData() {
    const storageValues = await getStorageValues();
    this.rules = storageValues.rules;
    this.settings = storageValues.settings;

    console.log(this.rules);


    this.loaded = true;
  }

  addRule(rule: PinnerRule) {
    this.rules.push(rule);
    this.updateChromeStorage();
  }

  removeRule(rule: PinnerRule) {
    this.rules = this.rules.filter(({ id }) => rule.id !== id);
    this.updateChromeStorage();
  }

  updateRule(newRule: PinnerRule) {
    this.rules = this.rules.map((oldRule) => oldRule.id === newRule.id ? newRule : oldRule);
    this.updateChromeStorage();
  }

  updateSettings(newSettings: PartialSettings) {
    this.settings = {
      ...this.settings,
      ...newSettings,
    }

    this.updateChromeStorage();
  }

  private updateChromeStorage() {
    setStorageValues(this.rules, this.settings);
  }
}
