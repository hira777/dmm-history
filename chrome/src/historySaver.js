import { ROOT_KEY, HISTORIES_KEY, MAX_HISTORIES, AFFILIATE_ID } from './config';
import { duplicateObjValueIndex } from './utils/array';
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

  chromeStorage.get({ keys: ROOT_KEY }).then(obj => {
    const entity = Object.assign({}, obj);
    let histories = getCurrentHistories(obj);
    const duplicateIndex = duplicateObjValueIndex(histories, newHistory, 'id');

    if (duplicateIndex > -1) {
      histories.splice(duplicateIndex, 1);
    }

    histories.unshift(newHistory);

    console.log(histories.length);

    if (histories.length > MAX_HISTORIES) {
      histories.pop();
    }

    entity[ROOT_KEY] = entity[ROOT_KEY] || {};
    entity[ROOT_KEY][HISTORIES_KEY] = histories;
    console.log('entity', entity);
    chromeStorage.set({ obj: entity });
  });
};

/**
 * 現在の履歴を取得する
 * @param {Object} obj chrome.storageから取得したオブジェクト
 * @return {Array}
 */
const getCurrentHistories = obj => {
  return obj[ROOT_KEY] && obj[ROOT_KEY][HISTORIES_KEY]
    ? obj[ROOT_KEY][HISTORIES_KEY]
    : [];
};

const init = () => {
  saveNewHistory();
};

init();
