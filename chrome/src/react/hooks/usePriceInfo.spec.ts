import { renderHook } from '@testing-library/react-hooks';

import usePriceInfo from './usePriceInfo';

describe('usePriceInfo', () => {
  test('履歴が通常商品の時の価格情報を返すべき', () => {
    const { result } = renderHook(() =>
      usePriceInfo({
        prices: [100, 300, 500],
        salePrices: null,
        saleLimitTime: null
      })
    );

    expect(result.current).toEqual({
      sale: false,
      price: '¥100〜¥500',
      salePercent: 0
    });
  });

  test('履歴がセール品の時の価格情報を返すべき', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const { result } = renderHook(() =>
      usePriceInfo({
        prices: [100, 300, 500],
        salePrices: [50, 150, 250],
        saleLimitTime: tomorrow.toString()
      })
    );

    expect(result.current).toEqual({
      sale: true,
      price: '¥50〜¥250',
      salePercent: 50
    });
  });

  test('履歴がセール期限が切れているセール品の時の価格情報を返すべき', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const { result } = renderHook(() =>
      usePriceInfo({
        prices: [100, 300, 500],
        salePrices: [50, 150, 250],
        saleLimitTime: yesterday.toString()
      })
    );

    expect(result.current).toEqual({
      sale: false,
      price: '¥100〜¥500',
      salePercent: 0
    });
  });
});
