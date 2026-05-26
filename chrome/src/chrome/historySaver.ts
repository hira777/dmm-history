import { MAX_HISTORIES } from '@/enums';
import { keys, ChromeStorageSchema } from '@/models/chromeStorageSchema';
import { History } from '@/models/history';
import history from '@/utils/history';
import chromeStorage from '@/utils/chromeStorage';
import itemPage from '@/utils/itemPage';

async function saveNewHistory(): Promise<void> {
  const ready = await itemPage.waitForItemPageData();
  if (!ready) return;

  const itemId = itemPage.getItemId(location.href);
  const salePrices = itemPage.getSalePrices();
  const saleLimitTime = salePrices
    ? await itemPage.waitForSaleLimitTime().then((ready) => {
        return ready ? itemPage.getSaleLimitTime() : null;
      })
    : null;
  const newHistory: History = {
    id: itemId,
    title: itemPage.getTitle(),
    href: itemPage.getAffiliateUrl(itemId),
    imageUrl: itemPage.getImageUrl(itemId),
    maker: itemPage.getMaker(),
    label: itemPage.getLabel(),
    prices: itemPage.getPrices(),
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
