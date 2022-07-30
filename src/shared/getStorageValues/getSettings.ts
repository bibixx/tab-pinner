import { PinnerSettings } from '../../types/PinnerSettings';
import { SettingsBuilder } from './settingsBuilder';

export const getSettings = (settings: Record<string, string>): PinnerSettings => {
  const settingsBuilder = new SettingsBuilder();

  const close = settings?.close;
  const move = settings?.move;

  if (typeof close === 'boolean') {
    settingsBuilder.setClose(close);
  }

  if (typeof move === 'boolean') {
    settingsBuilder.setMove(move);
  }

  return settingsBuilder.getSettings();
};
