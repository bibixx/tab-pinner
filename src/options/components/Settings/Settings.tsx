import React from 'react';
import { PinnerSettings, SettingKey } from '../../../types/PinnerSettings';
import I18n from '../I18n';
import { H2 } from '../Headings';
import Checkbox from '../Checkbox';
import { Ul, Li } from './Settings.styled';

interface SettingsProps {
  settings: PinnerSettings;
  updateSetting: (newSettingKey: SettingKey) => (newSetting: boolean) => void;
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
      <H2><I18n>settings_header</I18n></H2>
      <Ul>
        <Li>
          <Checkbox
            type="checkbox"
            checked={settings.close}
            onChange={onChange('close')}
          >
            <I18n>close</I18n>
          </Checkbox>
        </Li>
        <Li>
          <Checkbox
            type="checkbox"
            disabled={!settings.close}
            checked={settings.confirm}
            onChange={onChange('confirm')}
          >
            <I18n>close_conf</I18n>
          </Checkbox>
        </Li>
        <Li>
          <Checkbox
            checked={settings.move}
            onChange={onChange('move')}
          >
            <I18n>back_index</I18n>
          </Checkbox>
        </Li>
      </Ul>
    </div>
  );
};

export default Settings;
