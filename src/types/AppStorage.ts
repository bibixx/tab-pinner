import { PinnerRule } from "./PinnerRule";
import { PinnerSettings } from "./PinnerSettings";

export interface AppStorage {
  rules: PinnerRule[];
  settings: PinnerSettings;
}
