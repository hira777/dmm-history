/**
 * @file DMMの商品ページのデータを取得するメソッド群
 */

import orderBy from 'lodash.orderby';

/**
 * URLから商品IDを取得
 */
const getCid = (url: string): string => {
  const matched = url.match(/cid=.+(?=\/)/g);
  return matched ? matched[0].replace('cid=', '') : '';
};

/**
 * 商品タイトルを取得
 */
const getTitle = (): string => {
  return (document.getElementById('title') as HTMLElement).innerText.trim();
};

/**
 * 商品画像のURLを取得
 */
const getImageUrl = (): string => {
  return (document.getElementById(
    'sample-video'
  ) as HTMLElement).querySelectorAll('img')[0].src;
};

/**
 * 商品がセール中かどうか
 */
const isSale = (): boolean => {
  const basketContentsElement = document.getElementById(
    'basket_contents'
  ) as HTMLElement;
  const txLtElement = basketContentsElement.querySelectorAll('.tx-lt');

  return txLtElement.length > 0;
};

type Prices = number[];

/**
 * 商品の価格情報を取得
 */
const getPrices = (): Prices => {
  const basketContentsElement = document.getElementById(
    'basket_contents'
  ) as HTMLElement;
  const priceElement = basketContentsElement.querySelectorAll('.price');
  // 商品がセール時のみに存在する要素。セール時はこの要素の中に価格（テキスト）が存在する。
  // セール時は.priceから価格を取得できないため、こちらから取得する。
  const txLtElement = basketContentsElement.querySelectorAll('.tx-lt');
  const prices: Prices = [];

  (isSale() ? txLtElement : priceElement).forEach(element => {
    prices.push(
      Number(
        (element as HTMLElement).innerText
          .trim()
          .replace('円', '')
          .replace(',', '')
      )
    );
  });

  // 価格を昇順（[100, 50, 30] => [30, 50, 100]）にして返す
  return orderBy(prices);
};

/**
 * 商品のセール価格情報を取得
 */
const getSalePrices = (): Prices | null => {
  const basketContentsElement = document.getElementById(
    'basket_contents'
  ) as HTMLElement;
  const salePriceElement = basketContentsElement.querySelectorAll(
    '.tx-hangaku'
  );
  const salePrices: Prices = [];

  if (salePriceElement.length > 0) {
    salePriceElement.forEach(element => {
      salePrices.push(
        Number(
          (element as HTMLElement).innerText
            .trim()
            .replace('円', '')
            .replace(',', '')
        )
      );
    });

    // 価格を昇順（[100, 50, 30] => [30, 50, 100]）にして返す
    return orderBy(salePrices);
  } else {
    return null;
  }
};

/**
 * セール時間を取得
 */
const getSaleLimitTime = (): string | null => {
  const saleTimeElement = document.querySelector<HTMLElement>(
    '.mv-sale > span'
  );

  if (saleTimeElement) {
    const timeText = saleTimeElement.innerText;
    const matched = timeText.match(/(\d+)月(\d+)日\D+(\d+):/);

    if (!matched) return null;

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
  getCid,
  getTitle,
  getImageUrl,
  getPrices,
  getSalePrices,
  getSaleLimitTime
};
