import isAfter from 'date-fns/is_after';

import type { History } from '@/models/history';

const formatWithComma = (number: number): string => {
  return number.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
};

export const isSale = (item: History): boolean => {
  return (
    item.salePrices !== null &&
    item.saleLimitTime !== null &&
    !isAfter(new Date().toString(), item.saleLimitTime)
  );
};

export const getPrice = (item: History): string => {
  const prices = isSale(item) ? item.salePrices : item.prices;
  if (prices === null) return '';

  const formattedPrices = prices.map((price) => formatWithComma(price));
  const maxIndex = formattedPrices.length - 1;

  return formattedPrices.length > 1
    ? `¥${formattedPrices[0]}〜¥${formattedPrices[maxIndex]}`
    : `¥${formattedPrices[0]}`;
};

export const getSalePercent = (item: History): number => {
  if (item.salePrices === null) return 0;

  return isSale(item)
    ? Math.floor((1 - item.salePrices[0] / item.prices[0]) * 100)
    : 0;
};
