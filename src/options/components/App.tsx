import React, { useState, useEffect, useCallback } from 'react';
import { store } from '../../shared/store';
import { PinnerRule } from '../../types/PinnerRule';
import {
  addRule as addRuleAction,
  updateRule as updateRuleAction,
  removeRule as removeRuleAction,
} from '../actions/rules';
import {
  updateSetting as updateSettingAction,
} from '../actions/settings';

import Rules from './Rules';
import Settings from './Settings';
import { PinnerSettings } from '../../types/PinnerSettings';
import HowTo from './HowTo';
import Header from './Header';
import Footer from './Footer/Footer';

const App = () => {
  const [rules, setRules] = useState<PinnerRule[]>([]);
  const [settings, setSettings] = useState<PinnerSettings>({
    close: false,
    confirm: false,
    move: false,
  });

  useEffect(() => {
    store.getRules()
      .then((newRules) => setRules(newRules));
    store.getSettings()
      .then((newSettings) => setSettings(newSettings));
  }, []);

  const updateRules = useCallback(async () => setRules(await store.getRules()), []);
  const updateSettings = useCallback(async () => setSettings(await store.getSettings()), []);
  const addRule = useCallback(addRuleAction(updateRules), [updateRules]);
  const updateRule = useCallback(updateRuleAction(updateRules), [updateRules]);
  const removeRule = useCallback(removeRuleAction(updateRules), [updateRules]);
  const updateSetting = useCallback(updateSettingAction(updateSettings), [updateSettings]);

  return (
    <div>
      <Header />
      <HowTo />
      <Rules
        rules={rules}
        addRule={addRule}
        updateRule={updateRule}
        removeRule={removeRule}
      />
      <Settings
        settings={settings}
        updateSetting={updateSetting}
      />
      <Footer />
    </div>
  );
};

export default App;