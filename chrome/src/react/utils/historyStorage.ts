import { KEYS } from '@/enums';
import type { ChromeStorageSchema } from '@/models/chromeStorageSchema';
import type { Histories } from '@/models/history';
import chromeStorage from '@/utils/chromeStorage';
import historyManager from '@/utils/history';

export const restoreHistories = async (): Promise<Histories> => {
  const obj = await chromeStorage.get({ keys: KEYS.DMM_HISTORY });
  return historyManager.get(obj);
};

export const saveHistories = (items: Histories): void => {
  const entity: ChromeStorageSchema = {
    [KEYS.DMM_HISTORY]: {
      [KEYS.HISTORIES]: items
    }
  };

  chromeStorage.set({ obj: entity });
};
