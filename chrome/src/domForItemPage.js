// DMMの商品ページのDOMに対する処理要求に応じるメソッド群
import { orderBy } from 'lodash-es';

import * as Dom from './utils/dom';

/**
 * 商品タイトルを取得
 * @return {String}
 */
const getTitle = () => document.getElementById('title').innerText.trim();

/**
 * 商品画像のURLを取得
 * @return {String}
 */
const getImageUrl = () =>
  document.getElementById('sample-video').querySelectorAll('img')[0].src;

/**
 * 商品のシリーズを取得
 * @return {String}
 */
const getSeries = () => {
  const element = document.querySelectorAll(
    '.box-rank + table > tbody > tr'
  )[7];
  return element.querySelectorAll('a')[0]
    ? element.querySelectorAll('a')[0].innerText.trim()
    : undefined;
};

/**
 * 商品のメーカーを取得
 * @return {String}
 */
const getMaker = () => {
  const element = document.querySelectorAll(
    '.box-rank + table > tbody > tr'
  )[8];
  return element.querySelectorAll('a')[0]
    ? element.querySelectorAll('a')[0].innerText.trim()
    : undefined;
};

/**
 * 出演女優を取得
 * @return {Array}
 */
const getActresses = () => {
  const element = document.querySelectorAll(
    '.box-rank + table > tbody > tr'
  )[5];
  return Dom.getTexts({
    element,
    selectors: 'a',
  });
};

/**
 * 商品のお気に入り数を取得
 * @return {Number}
 */
const getFavoriteCount = () =>
  Number(
    document.querySelectorAll('.box-rank .tx-count > span')[0].innerText.trim()
  );

/**
 * 商品の価格情報を取得
 * @return {Array}
 */
const getPrices = () => {
  const basketContentsElement = document.getElementById('basket_contents');
  const priceElement = basketContentsElement.querySelectorAll('.price');
  // 商品がセール時のみに存在する要素。セール時はこの要素の中に価格（テキスト）が存在する。
  // セール時は.priceから価格を取得できないため、こちらから取得する。
  const txLtElement = basketContentsElement.querySelectorAll('.tx-lt');
  const prices = [...(isSale() ? txLtElement : priceElement)].map(element =>
    Number(
      element.innerText
        .trim()
        .replace('円', '')
        .replace(',', '')
    )
  );

  // 価格を昇順（[100, 50, 30] => [30, 50, 100]）にして返す
  return orderBy(prices);
};

/**
 * 商品のセール価格情報を取得
 * @return {Array}
 */
const getSalePrices = () => {
  const basketContentsElement = document.getElementById('basket_contents');
  const salePriceElement = basketContentsElement.querySelectorAll(
    '.tx-hangaku'
  );

  if (salePriceElement.length > 0) {
    const salePrices = [...salePriceElement].map(element =>
      Number(
        element.innerText
          .trim()
          .replace('円', '')
          .replace(',', '')
      )
    );

    // 価格を昇順（[100, 50, 30] => [30, 50, 100]）にして返す
    return orderBy(salePrices);
  } else {
    return null;
  }
};

/**
 * 商品がセール中かどうか
 * @return {Boolean}
 */
const isSale = () => {
  const basketContentsElement = document.getElementById('basket_contents');
  const txLtElement = basketContentsElement.querySelectorAll('.tx-lt');

  return txLtElement.length > 0;
};

/**
 * セール時間を取得
 * @return {String|null}
 */
const getSaleLimitTime = () => {
  const saleTimeElement = document.querySelector('.mv-sale > span');

  if (saleTimeElement) {
    const timeText = saleTimeElement.innerText;
    const matched = timeText.match(/(\d+)月(\d+)日\D+(\d+):/);
    const year = new Date().getFullYear();
    const month = Number(matched[1]);
    const day = Number(matched[2]);
    const hour = Number(matched[3]);

    return new Date(year, month - 1, day, hour).toString();
  } else {
    return null;
  }
};

export default {
  getTitle,
  getImageUrl,
  // getSeries,
  // getMaker,
  // getActresses,
  // getFavoriteCount,
  getPrices,
  // getIsSale,
  getSalePrices,
  getSaleLimitTime,
};
