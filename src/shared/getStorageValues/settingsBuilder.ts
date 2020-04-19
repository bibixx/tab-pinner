import { defaultStorageValues } from "./defaultStorageValues";
import { PinnerSettings } from "../../types/PinnerSettings";

export class SettingsBuilder {
  close: boolean = defaultStorageValues.settings.close;
  confirm: boolean = defaultStorageValues.settings.confirm;
  move: boolean = defaultStorageValues.settings.move;

  setClose(close: boolean) {
    this.close = close;
  }

  setConfirm(confirm: boolean) {
    this.confirm = confirm;
  }

  setMove(move: boolean) {
    this.move = move;
  }

  getSettings(): PinnerSettings {
    return {
      close: this.close,
      confirm: this.confirm,
      move: this.move,
    }
  }
}
