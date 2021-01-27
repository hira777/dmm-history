import { useEffect, useState, useRef } from 'react';

import { KEYS } from '@/enums';
import { ChromeStorageSchema } from '@/models/chromeStorageSchema';
import { Histories } from '@/models/history';
import chromeStorage from '@/utils/chromeStorage';
import historyManager from '@/utils/history';

type ChromeStorageHistories = {
  // Chrome Storage の履歴
  histories: Histories;
  // Chrome Storage の履歴を更新するメソッド
  saveHistories: (histories: Histories) => void;
  // 読み込み中どうか
  isLoading: boolean;
};

function useIsMountedRef() {
  const isMountedRef = useRef(false);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  });
  return isMountedRef;
}

/**
 * Chrome Storage の履歴の取得、更新をする Hooks
 */
export default function useChromeStorageHistories(): ChromeStorageHistories {
  const [histories, setHistories] = useState<Histories>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    const f = async (): Promise<void> => {
      const obj = await chromeStorage.get({ keys: KEYS.DMM_HISTORY });
      const histories = historyManager.get(obj);

      if (isMountedRef.current) {
        setHistories(histories);
        setIsLoading(false);
      }
    };
    f();
  }, [isMountedRef]);

  const saveHistories = (histories: Histories): void => {
    const entity: ChromeStorageSchema = {
      [KEYS.DMM_HISTORY]: {
        [KEYS.HISTORIES]: histories,
      },
    };
    chromeStorage.set({ obj: entity });
    setHistories(histories);
  };

  return { histories, saveHistories, isLoading };
}
