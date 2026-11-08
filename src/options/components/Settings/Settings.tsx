import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { PinnerSettings, SettingKey } from '../../../types/PinnerSettings';
import { i18n } from '../../utils/i18n/i18n';

interface SettingsProps {
  settings: PinnerSettings;
  updateSetting: (newSettingKey: SettingKey, newSetting: boolean) => void;
}

export const Settings = ({ settings, updateSetting }: SettingsProps) => {
  const options = [
    { key: 'close', label: i18n('close'), checked: settings.close },
    { key: 'move', label: i18n('back_index'), checked: settings.move },
  ] as const;

  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle className="text-lg">{i18n('settings_header')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {options.map(({ key, label, checked }) => (
          <div key={key} className="flex items-center gap-2">
            <Checkbox
              id={`setting-${key}`}
              checked={checked}
              onCheckedChange={(value) => updateSetting(key, value === true)}
            />
            <Label htmlFor={`setting-${key}`}>{label}</Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
