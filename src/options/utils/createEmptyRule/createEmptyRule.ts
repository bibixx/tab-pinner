import { PinnerRule } from '../../../types/PinnerRule';

export const createEmptyRule = (): PinnerRule => ({
  id: Date.now(),
  name: '',
  active: true,
  matchType: 'simple',
  pattern: '',
  position: null,
});
