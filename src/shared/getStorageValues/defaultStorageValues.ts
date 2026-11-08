import { AppStorage } from '../../types/AppStorage';

export const defaultStorageValues: AppStorage = {
  rules: [
    {
      id: Date.now(),
      active: true,
      name: 'Facebook',
      matchType: 'simple',
      pattern: 'facebook.com',
      position: 0,
    },
  ],
  settings: {
    close: true,
    move: true,
  },
};
