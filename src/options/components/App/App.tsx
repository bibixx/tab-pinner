import {
  useState, useEffect, useCallback, useRef,
} from 'react';
import 'what-input';
import ReactModal from 'react-modal';

import { store } from '../../utils/store/store';
import { PinnerRule } from '../../../types/PinnerRule';
import {
  addRule as addRuleAction,
  updateRule as updateRuleAction,
  removeRule as removeRuleAction,
  changeAllActive as changeAllActiveAction,
} from '../../actions/rules';
import {
  updateSetting as updateSettingAction,
} from '../../actions/settings';
import { PinnerSettings } from '../../../types/PinnerSettings';

import { Rules } from '../Rules/Rules';
import { Settings } from '../Settings/Settings';
import { HowTo } from '../HowTo/HowTo';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Paper } from '../Paper/Paper';
import { AppWrapper } from '../AppWrapper/AppWrapper';

import './global.css';
import { i18n } from '../i18n/i18n';
import { pipe } from '../../utils/pipe/pipe';

export const App = () => {
  const [rules, setRules] = useState<PinnerRule[]>([]);
  const [settings, setSettings] = useState<PinnerSettings>({
    close: false,
    move: false,
  });
  const modalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function initializeFromStore() {
      await store.init();

      setRules(store.getRules());
      setSettings(store.getSettings());
    }

    initializeFromStore();

    document.title = i18n('options_title');
  }, []);

  useEffect(() => {
    if (modalContainerRef.current !== null) {
      ReactModal.setAppElement(modalContainerRef.current);
    }
  }, [modalContainerRef]);

  const updateRules = useCallback((newRules: PinnerRule[]) => {
    setRules(newRules);
    store.update();
  }, []);
  const updateSettings = useCallback((newSettings: PinnerSettings) => {
    setSettings(newSettings);
    store.update();
  }, []);

  const updateRulesFromStore = useCallback(() => updateRules(store.getRules()), [updateRules]);
  const updateSettingsFromStore = useCallback(() => updateSettings(store.getSettings()),
    [updateSettings]);
  const addRule = useCallback(pipe(addRuleAction, updateRulesFromStore), [updateRules]);
  const updateRule = useCallback(pipe(updateRuleAction, updateRulesFromStore), [updateRules]);
  const removeRule = useCallback(pipe(removeRuleAction, updateRulesFromStore), [updateRules]);
  const changeAllActive = useCallback(
    pipe(changeAllActiveAction, updateRulesFromStore), [updateSettings],
  );
  const updateSetting = useCallback(
    pipe(updateSettingAction, updateSettingsFromStore), [updateSettings],
  );

  return (
    <>
      <Header />
      <AppWrapper>
        <Paper>
          <HowTo />
          <Rules
            rules={rules}
            addRule={addRule}
            updateRule={updateRule}
            removeRule={removeRule}
            changeAllActive={changeAllActive}
          />
          <Settings
            settings={settings}
            updateSetting={updateSetting}
          />
        </Paper>
      </AppWrapper>
      <Footer />
      <div ref={modalContainerRef} />
    </>
  );
};
