import { MAX_HISTORIES } from '@/enums';
import { keys, ChromeStorageSchema } from '@/models/chromeStorageSchema';
import { History } from '@/models/history';
import history from '@/utils/history';
import chromeStorage from '@/utils/chromeStorage';
import {
  getAffiliateUrl,
  getImageUrl,
  getItemId,
  getLabel,
  getMaker,
  getPrices,
  getSaleLimitTime,
  getSalePrices,
  getTitle,
  waitForItemPageData,
  waitForSaleLimitTime
} from '@/utils/itemPage';

async function saveNewHistory(): Promise<void> {
  const ready = await waitForItemPageData();
  if (!ready) return;

  const itemId = getItemId(location.href);
  const salePrices = getSalePrices();
  const saleLimitTime = salePrices
    ? await waitForSaleLimitTime().then((ready) => {
        return ready ? getSaleLimitTime() : null;
      })
    : null;
  const newHistory: History = {
    id: itemId,
    title: getTitle(),
    href: getAffiliateUrl(itemId),
    imageUrl: getImageUrl(itemId),
    maker: getMaker(),
    label: getLabel(),
    prices: getPrices(),
    salePrices,
    saleLimitTime
  };
  const obj = await chromeStorage.get({ keys: keys.dmmHistory });
  const histories = history
    .add(history.get(obj), newHistory)
    .slice(0, MAX_HISTORIES);
  const entity: ChromeStorageSchema = { ...obj };
  entity.dmmHistory = entity.dmmHistory || {};
  entity.dmmHistory.histories = histories;
  chromeStorage.set({ obj: entity });
}

saveNewHistory();
