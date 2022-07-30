export interface PinnerRule {
  id: number;
  name: string;
  active: boolean;
  regexp: string;
  position: number | null;
}
