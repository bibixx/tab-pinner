import React from 'react';
import { PinnerSettings, SettingKey } from '../../../types/PinnerSettings';
import I18n from '../I18n';

interface SettingsProps {
  settings: PinnerSettings;
  updateSetting: (newSettingKey: SettingKey) => (newSetting: boolean) => Promise<void>;
}

/* eslint-disable jsx-a11y/label-has-associated-control */
const Settings: React.FC<SettingsProps> = ({
  settings,
  updateSetting,
}) => {
  const onChange = (key: SettingKey) => (
    { target: { checked } }: React.ChangeEvent<HTMLInputElement>,
  ) => updateSetting(key)(checked);

  return (
    <div>
      <h2><I18n>settings_header</I18n></h2>
      <ul>
        <li>
          <label>
            <input
              type="checkbox"
              checked={settings.close}
              onChange={onChange('close')}
            />
            <span><I18n>close</I18n></span>
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              disabled={!settings.close}
              checked={settings.confirm}
              onChange={onChange('confirm')}
            />
            <span><I18n>close_conf</I18n></span>
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={settings.move}
              onChange={onChange('move')}
            />
            <span><I18n>back_index</I18n></span>
          </label>
        </li>
      </ul>
    </div>
  );
};

export default Settings;
