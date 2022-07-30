import { defaultStorageValues } from './defaultStorageValues';
import { PinnerSettings } from '../../types/PinnerSettings';

export class SettingsBuilder {
  close: boolean = defaultStorageValues.settings.close;

  move: boolean = defaultStorageValues.settings.move;

  setClose(close: boolean) {
    this.close = close;
  }

  setMove(move: boolean) {
    this.move = move;
  }

  getSettings(): PinnerSettings {
    return {
      close: this.close,
      move: this.move,
    };
  }
}
