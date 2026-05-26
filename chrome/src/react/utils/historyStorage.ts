import { KEYS } from '@/enums';
import type { ChromeStorageSchema } from '@/models/chromeStorageSchema';
import type { Histories } from '@/models/history';
import chromeStorage from '@/utils/chromeStorage';
import historyManager from '@/utils/history';
import { mockHistories } from './mockHistories';

const isMockMode = (): boolean => {
  return __DMM_HISTORY_USE_MOCK__;
};

export const restoreHistories = async (): Promise<Histories> => {
  if (isMockMode()) {
    return mockHistories;
  }

  const obj = await chromeStorage.get({ keys: KEYS.DMM_HISTORY });
  return historyManager.get(obj);
};

export const saveHistories = (items: Histories): void => {
  if (isMockMode()) return;

  const entity: ChromeStorageSchema = {
    [KEYS.DMM_HISTORY]: {
      [KEYS.HISTORIES]: items
    }
  };

  chromeStorage.set({ obj: entity });
};
