import { PinnerSettings } from "../../types/PinnerSettings";
import { SettingsBuilder } from "./settingsBuilder";

export const getSettings = (settings: any): PinnerSettings => {
  const settingsBuilder = new SettingsBuilder();

  const close = settings?.close;
  const confirm = settings?.confirm;
  const move = settings?.move;

  if (typeof close === "boolean") {
    settingsBuilder.setClose(close);
  }

  if (typeof confirm === "boolean") {
    settingsBuilder.setConfirm(confirm);
  }

  if (typeof move === "boolean") {
    settingsBuilder.setMove(move);
  }

  return settingsBuilder.getSettings();
}
