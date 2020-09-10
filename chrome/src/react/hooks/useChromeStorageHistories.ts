import { useEffect, useState } from 'react';

import { KEYS } from '@/enums';
import { ChromeStorageSchema } from '@/models/chromeStorageSchema';
import { Histories } from '@/models/history';
import chromeStorage from 'chromeStorage';
import historyManager from '@/utils/history';

type ChromeStorageHistories = {
  // Chrome Storage の履歴
  histories: Histories;
  // Chrome Storage の履歴を更新するメソッド
  saveHistories: (histories: Histories) => void;
};

/**
 * Chrome Storage の履歴の取得、更新をする Hooks
 */
export default function useChromeStorageHistories(): ChromeStorageHistories {
  const [histories, setStoredHistories] = useState<Histories>([]);

  useEffect(() => {
    let mounted = true;

    const f = async (): Promise<void> => {
      const obj = await chromeStorage.get({ keys: KEYS.DMM_HISTORY });
      const histories = historyManager.get(obj);

      if (mounted) {
        setStoredHistories(histories);
      }
    };
    f();

    return (): void => {
      mounted = true;
    };
  }, []);

  const saveHistories = (histories: Histories): void => {
    const entity: ChromeStorageSchema = {
      [KEYS.DMM_HISTORY]: {
        [KEYS.HISTORIES]: histories,
      },
    };

    chromeStorage.set({ obj: entity });
  };

  return { histories, saveHistories };
}
