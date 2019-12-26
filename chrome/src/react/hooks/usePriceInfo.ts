import { useMemo } from 'react';
import isAfter from 'date-fns/is_after';

import { Prices } from '@/models/history';

function formatWithComma(number: number): string {
  return number.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

type PriceInfoParams = {
  prices: Prices;
  salePrices: Prices | null;
  saleLimitTime: string | null;
};
type PriceInfo = {
  // セールかどうか
  sale: boolean;
  // "¥250〜¥890" のような文字列
  price: string;
  // 値引き割合
  salePercent: number;
};

/**
 * 履歴内容に応じた価格情報を返却する Hooks
 */
export default function usePriceInfo({
  prices,
  salePrices,
  saleLimitTime
}: PriceInfoParams): PriceInfo {
  const sale = useMemo(() => {
    return salePrices !== null && saleLimitTime !== null;
  }, [salePrices, saleLimitTime]);

  const price = useMemo(() => {
    const _prices = sale ? salePrices : prices;
    if (_prices === null) return '';
    // 価格に3桁ずつカンマをつける
    const formattedPrices = _prices.map(price => formatWithComma(price));
    const maxIndex = formattedPrices.length - 1;

    return formattedPrices.length > 1
      ? `¥${formattedPrices[0]}〜¥${formattedPrices[maxIndex]}`
      : `¥${formattedPrices[0]}`;
  }, [sale, salePrices, prices]);

  const salePercent = useMemo(() => {
    if (salePrices === null) return 0;

    return sale ? Math.floor((1 - salePrices[0] / prices[0]) * 100) : 0;
  }, [sale, salePrices, prices]);

  return { sale, price, salePercent };
}
