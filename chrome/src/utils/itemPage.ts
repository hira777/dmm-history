/**
 * @file DMMの商品ページのデータを取得するメソッド群
 */

import orderBy from 'lodash.orderby';

import { AFFILIATE_ID } from '@/enums';
import { Prices } from '@/models/history';

const TITLE_SUFFIX = '｜エロ動画・アダルトビデオ｜FANZA動画';
const WAIT_TIMEOUT_MS = 10000;

/**
 * URLから商品IDを取得
 */
const getItemId = (url: string): string => {
  return new URL(url).searchParams.get('id') || '';
};

const normalizeTitle = (title: string): string => {
  return title.replace(TITLE_SUFFIX, '').trim();
};

const parsePriceText = (text: string): number => {
  return Number(text.trim().replace(/円/g, '').replace(/,/g, ''));
};

const parseSaleLimitTimeText = (
  text: string,
  year: number = new Date().getFullYear()
): string | null => {
  const matched = text.match(/(\d+)月(\d+)日\([^)]+\)\s*(\d+):(\d+)\s*まで/);

  if (!matched) return null;

  const month = Number(matched[1]);
  const day = Number(matched[2]);
  const hour = Number(matched[3]);
  const minute = Number(matched[4]);

  return new Date(year, month - 1, day, hour, minute).toString();
};

const getSaleLimitTimeText = (root: ParentNode = document): string => {
  const saleLimitElement = Array.from(
    root.querySelectorAll<HTMLElement>('div.relative.mb-1')
  ).find((element) => {
    return parseSaleLimitTimeText(element.textContent || '') !== null;
  });

  return saleLimitElement?.textContent || '';
};

const getPriceOptionItems = (): HTMLElement[] => {
  const priceList = Array.from(
    document.querySelectorAll<HTMLElement>('ul.flex.flex-col')
  ).find((element) => {
    return element.querySelector(
      'p.text-red-900, p.line-through, p.text-red-600'
    );
  });

  return priceList
    ? Array.from(priceList.querySelectorAll<HTMLElement>('li'))
    : [];
};

const getElementPrice = (element: HTMLElement | null): number | null => {
  if (!element || !element.textContent) return null;

  const price = parsePriceText(element.textContent);
  return Number.isNaN(price) ? null : price;
};

const normalizeProductInfoValue = (value: string): string => {
  const normalized = value.trim();
  return normalized === '----' ? '' : normalized;
};

const getProductInfoRows = (root: ParentNode = document): HTMLElement[] => {
  return Array.from(
    root.querySelectorAll<HTMLElement>('table.text-xs.shrink tr')
  );
};

const hasProductInfoRows = (): boolean => {
  const labels = getProductInfoRows().map((row) => {
    return row.querySelector('th')?.textContent?.trim();
  });

  return labels.includes('メーカー：') && labels.includes('レーベル：');
};

const getProductInfoValue = (
  label: string,
  root: ParentNode = document
): string => {
  const row = getProductInfoRows(root).find((element) => {
    return element.querySelector('th')?.textContent?.trim() === `${label}：`;
  });

  return normalizeProductInfoValue(row?.querySelector('td')?.textContent || '');
};

const hasItemPageData = (): boolean => {
  return (
    normalizeTitle(document.title) !== '' &&
    getPriceOptionItems().length > 0 &&
    hasProductInfoRows()
  );
};

const waitForItemPageData = (
  timeoutMs: number = WAIT_TIMEOUT_MS
): Promise<boolean> => {
  if (hasItemPageData()) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    let settled = false;

    const observer = new MutationObserver(() => {
      if (hasItemPageData()) {
        finish(true);
      }
    });

    const timeoutId = window.setTimeout(() => {
      finish(false);
    }, timeoutMs);

    const finish = (result: boolean): void => {
      if (settled) return;

      settled = true;
      window.clearTimeout(timeoutId);
      observer.disconnect();
      resolve(result);
    };

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true
    });
  });
};

const waitForSaleLimitTime = (
  timeoutMs: number = WAIT_TIMEOUT_MS
): Promise<boolean> => {
  if (getSaleLimitTime()) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    let settled = false;

    const observer = new MutationObserver(() => {
      if (getSaleLimitTime()) {
        finish(true);
      }
    });

    const timeoutId = window.setTimeout(() => {
      finish(false);
    }, timeoutMs);

    const finish = (result: boolean): void => {
      if (settled) return;

      settled = true;
      window.clearTimeout(timeoutId);
      observer.disconnect();
      resolve(result);
    };

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true
    });
  });
};

/**
 * 商品タイトルを取得
 */
const getTitle = (): string => {
  return normalizeTitle(document.title);
};

/**
 * 商品画像のURLを取得
 */
const getImageUrl = (itemId: string): string => {
  return `https://awsimgsrc.dmm.co.jp/pics_dig/digital/video/${itemId}/${itemId}ps.jpg?w=200&h=272&t=margin`;
};

const getAffiliateUrl = (itemId: string): string => {
  const itemUrl = `https://video.dmm.co.jp/av/content/?id=${itemId}`;

  return `https://al.fanza.co.jp/?lurl=${encodeURIComponent(itemUrl)}&af_id=${AFFILIATE_ID}`;
};

const getMaker = (): string => {
  return getProductInfoValue('メーカー');
};

const getLabel = (): string => {
  return getProductInfoValue('レーベル');
};

/**
 * 商品がセール中かどうか
 */
const isSale = (): boolean => {
  return getPriceOptionItems().some((element) => {
    return element.querySelector('p.line-through') !== null;
  });
};

/**
 * 商品の価格情報を取得
 */
const getPrices = (): Prices => {
  const sale = isSale();
  const prices = getPriceOptionItems()
    .map((element) => {
      const priceElement = sale
        ? element.querySelector<HTMLElement>('p.line-through')
        : element.querySelector<HTMLElement>('p.text-red-900');

      return getElementPrice(priceElement);
    })
    .filter((price): price is number => price !== null);

  // 価格を昇順（[100, 50, 30] => [30, 50, 100]）にして返す
  return orderBy(prices);
};

/**
 * 商品のセール価格情報を取得
 */
const getSalePrices = (): Prices | null => {
  const salePrices = getPriceOptionItems()
    .map((element) => {
      return getElementPrice(
        element.querySelector<HTMLElement>('p.text-red-600')
      );
    })
    .filter((price): price is number => price !== null);

  if (salePrices.length > 0) {
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
  return parseSaleLimitTimeText(getSaleLimitTimeText());
};

export default {
  getItemId,
  normalizeTitle,
  parsePriceText,
  parseSaleLimitTimeText,
  getSaleLimitTimeText,
  normalizeProductInfoValue,
  getProductInfoValue,
  waitForItemPageData,
  waitForSaleLimitTime,
  getTitle,
  getImageUrl,
  getAffiliateUrl,
  getMaker,
  getLabel,
  getPrices,
  getSalePrices,
  getSaleLimitTime
};
