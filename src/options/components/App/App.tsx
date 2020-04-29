import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import 'what-input';
import ReactModal from 'react-modal';

import { store } from '../../../shared/store';
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

import Rules from '../Rules';
import Settings from '../Settings';
import HowTo from '../HowTo';
import Header from '../Header';
import Footer from '../Footer';
import Paper from '../Paper';
import AppWrapper from '../AppWrapper';

import './global.css';
import { getTranslatedText } from '../../../shared/getTranslatedText/getTranslatedText';

const App = () => {
  const [rules, setRules] = useState<PinnerRule[]>([]);
  const [settings, setSettings] = useState<PinnerSettings>({
    close: false,
    confirm: false,
    move: false,
  });
  const modalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    store.getRules()
      .then((newRules) => setRules(newRules));
    store.getSettings()
      .then((newSettings) => setSettings(newSettings));

    document.title = getTranslatedText('options_title');
  }, []);

  useEffect(() => {
    if (modalContainerRef.current !== null) {
      ReactModal.setAppElement(modalContainerRef.current);
    }
  }, [modalContainerRef]);

  const updateRules = useCallback(async () => setRules(await store.getRules()), []);
  const updateSettings = useCallback(async () => setSettings(await store.getSettings()), []);
  const addRule = useCallback(addRuleAction(updateRules), [updateRules]);
  const updateRule = useCallback(updateRuleAction(updateRules), [updateRules]);
  const removeRule = useCallback(removeRuleAction(updateRules), [updateRules]);
  const changeAllActive = useCallback(changeAllActiveAction(updateRules), [updateSettings]);
  const updateSetting = useCallback(updateSettingAction(updateSettings), [updateSettings]);

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

export default App;
