import { getHistory, getHistoryOnSale } from '../../../../mock/histories';

import { renderHook } from '@testing-library/react-hooks';

import usePriceInfo from './usePriceInfo';

describe('usePriceInfo', () => {
  test('履歴が通常商品の時の価格情報を返す', () => {
    const history = getHistory();
    const { result } = renderHook(() =>
      usePriceInfo({
        prices: history.prices,
        salePrices: history.salePrices,
        saleLimitTime: history.saleLimitTime
      })
    );

    expect(result.current).toEqual({
      sale: false,
      price: '¥100〜¥300',
      salePercent: 0
    });
  });

  test('履歴がセール品の時の価格情報を返す', () => {
    const history = getHistoryOnSale();

    const { result } = renderHook(() =>
      usePriceInfo({
        prices: history.prices,
        salePrices: history.salePrices,
        saleLimitTime: history.saleLimitTime
      })
    );

    expect(result.current).toEqual({
      sale: true,
      price: '¥50〜¥150',
      salePercent: 50
    });
  });
});
