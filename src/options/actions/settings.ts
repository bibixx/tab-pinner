import { SettingKey } from '../../types/PinnerSettings';
import { store } from '../../shared/store';

export const updateSetting = (
  updateSettings: Function,
) => (
  newSettingKey: SettingKey,
) => async (
  newSetting: boolean,
) => {
  await store.updateSettings({
    [newSettingKey]: newSetting,
  });

  await updateSettings();
};
