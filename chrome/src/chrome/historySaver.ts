import { KEYS, AFFILIATE_ID, MAX_HISTORIES } from '@/enums';
import { History } from '@/models/history';
import history from '@/utils/history';
import chromeStorage from '@/utils/chromeStorage';
import itemPage from '@/utils/itemPage';

async function saveNewHistory(): Promise<void> {
  const newHistory: History = {
    id: itemPage.getCid(location.href),
    title: itemPage.getTitle(),
    href: `${location.protocol}//${location.host}${
      location.pathname
    }${AFFILIATE_ID}`,
    imageUrl: itemPage.getImageUrl(),
    prices: itemPage.getPrices(),
    salePrices: itemPage.getSalePrices(),
    saleLimitTime: itemPage.getSaleLimitTime()
  };
  const obj = await chromeStorage.get({ keys: KEYS.DMM_HISTORY });
  const histories = history
    .add(history.get(obj), newHistory)
    .slice(0, MAX_HISTORIES);
  const entity = { ...obj };
  entity[KEYS.DMM_HISTORY] = entity[KEYS.DMM_HISTORY] || {};
  entity[KEYS.DMM_HISTORY][KEYS.HISTORIES] = histories;
  chromeStorage.set({ obj: entity });
}

saveNewHistory();
