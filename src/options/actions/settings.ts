import { SettingKey } from '../../types/PinnerSettings';
import { store } from '../utils/store/store';

export const updateSetting = (
  updateSettings: Function,
) => (
  newSettingKey: SettingKey,
) => (
  newSetting: boolean,
) => {
  store.updateSettings({
    [newSettingKey]: newSetting,
  });

  updateSettings(store.getSettings());
};
