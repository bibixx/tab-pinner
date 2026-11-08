import { useState, useEffect, useCallback } from 'react';

import { store } from '../../utils/store/store';
import { PinnerRule } from '../../../types/PinnerRule';
import {
  addRule as addRuleAction,
  updateRule as updateRuleAction,
  removeRule as removeRuleAction,
} from '../../actions/rules';
import { updateSetting as updateSettingAction } from '../../actions/settings';
import { PinnerSettings } from '../../../types/PinnerSettings';

import { Rules } from '../Rules/Rules';
import { Settings } from '../Settings/Settings';
import { HowTo } from '../HowTo/HowTo';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

import { i18n } from '../../utils/i18n/i18n';
import { pipe } from '../../utils/pipe/pipe';

export const App = () => {
  const [rules, setRules] = useState<PinnerRule[]>([]);
  const [settings, setSettings] = useState<PinnerSettings>({
    close: false,
    move: false,
  });

  useEffect(() => {
    async function initializeFromStore() {
      await store.init();

      setRules(store.getRules());
      setSettings(store.getSettings());
    }

    initializeFromStore();

    document.title = i18n('options_title');
  }, []);

  const updateRules = useCallback((newRules: PinnerRule[]) => {
    setRules(newRules);
    store.update();
  }, []);
  const updateSettings = useCallback((newSettings: PinnerSettings) => {
    setSettings(newSettings);
    store.update();
  }, []);

  const updateRulesFromStore = useCallback(
    () => updateRules(store.getRules()),
    [updateRules],
  );
  const updateSettingsFromStore = useCallback(
    () => updateSettings(store.getSettings()),
    [updateSettings],
  );
  const addRule = pipe(addRuleAction, updateRulesFromStore);
  const updateRule = pipe(updateRuleAction, updateRulesFromStore);
  const removeRule = pipe(removeRuleAction, updateRulesFromStore);
  const updateSetting = pipe(updateSettingAction, updateSettingsFromStore);

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 p-6">
        <HowTo />
        <Rules
          rules={rules}
          addRule={addRule}
          updateRule={updateRule}
          removeRule={removeRule}
        />
        <Settings settings={settings} updateSetting={updateSetting} />
      </main>
      <Footer />
    </div>
  );
};
