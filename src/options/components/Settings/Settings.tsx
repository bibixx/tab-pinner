import React from 'react';
import { PinnerSettings, SettingKey } from '../../../types/PinnerSettings';
import { i18n } from '../i18n/i18n';
import { H2 } from '../Headings/Headings';
import { Checkbox } from '../Checkbox/Checkbox';
import { Ul, Li } from './Settings.styled';

interface SettingsProps {
  settings: PinnerSettings;
  updateSetting: (newSettingKey: SettingKey) => (newSetting: boolean) => void;
}

export const Settings = ({
  settings,
  updateSetting,
}: SettingsProps) => {
  const onChange = (key: SettingKey) => (
    { target: { checked } }: React.ChangeEvent<HTMLInputElement>,
  ) => updateSetting(key)(checked);

  return (
    <div>
      <H2>{i18n('settings_header')}</H2>
      <Ul>
        <Li>
          <Checkbox
            type="checkbox"
            checked={settings.close}
            onChange={onChange('close')}
          >
            {i18n('close')}
          </Checkbox>
        </Li>
        <Li>
          <Checkbox
            checked={settings.move}
            onChange={onChange('move')}
          >
            {i18n('back_index')}
          </Checkbox>
        </Li>
      </Ul>
    </div>
  );
};
