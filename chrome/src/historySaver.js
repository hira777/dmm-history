import { KEYS, AFFILIATE_ID } from './enums';
import history from './utils/history';
import chromeStorage from './utils/chromeStorage';
import dom from './domForItemPage';

const saveNewHistory = () => {
  const newHistory = {
    id: location.href.match(/cid=(\d|[a-z])+/g)[0].replace('cid=', ''),
    title: dom.getTitle(),
    href: `${location.protocol}//${location.host}${
      location.pathname
    }${AFFILIATE_ID}`,
    imageUrl: dom.getImageUrl(),
    prices: dom.getPrices(),
    salePrices: dom.getSalePrices(),
    saleLimitTime: dom.getSaleLimitTime()
  };

  chromeStorage.get({ keys: KEYS.DMM_HISTORY }).then(obj => {
    const histories = history.add(history.get(obj), newHistory).slice(0, 120);
    const entity = { ...obj };
    entity[KEYS.DMM_HISTORY] = entity[KEYS.DMM_HISTORY] || {};
    entity[KEYS.DMM_HISTORY][KEYS.HISTORIES] = histories;
    chromeStorage.set({ obj: entity });
  });
};

saveNewHistory();
