export type MatchType = 'simple' | 'regexp';

export interface PinnerRule {
  id: number;
  name: string;
  active: boolean;
  matchType: MatchType;
  pattern: string;
  position: number | null;
}
