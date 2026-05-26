import { describe, expect, it } from 'vitest';

import type { History } from '@/models/history';
import { getPrice, getSalePercent, isSale } from './historyCard';

const createHistory = (overrides: Partial<History> = {}): History => ({
  id: 'sample001',
  title: 'サンプル作品',
  href: 'https://video.dmm.co.jp/av/content/?id=sample001',
  imageUrl: 'https://example.com/sample001.jpg',
  maker: 'サンプルメーカー',
  label: 'サンプルレーベル',
  prices: [1000],
  salePrices: null,
  saleLimitTime: null,
  ...overrides
});

describe('historyCard', () => {
  describe('isSale', () => {
    it('セール価格とセール期限があり、期限内の場合はセール中として扱う', () => {
      const item = createHistory({
        salePrices: [500],
        saleLimitTime: new Date(2099, 11, 31, 23, 59).toString()
      });

      expect(isSale(item)).toBe(true);
    });

    it('セール価格がない場合はセール中として扱わない', () => {
      const item = createHistory({
        salePrices: null,
        saleLimitTime: new Date(2099, 11, 31, 23, 59).toString()
      });

      expect(isSale(item)).toBe(false);
    });

    it('セール期限を過ぎている場合はセール中として扱わない', () => {
      const item = createHistory({
        salePrices: [500],
        saleLimitTime: new Date(2000, 0, 1).toString()
      });

      expect(isSale(item)).toBe(false);
    });
  });

  describe('getPrice', () => {
    it('通常価格を表示用の文字列に変換する', () => {
      const item = createHistory({
        prices: [1980]
      });

      expect(getPrice(item)).toBe('¥1,980');
    });

    it('価格が複数ある場合は価格帯として表示する', () => {
      const item = createHistory({
        prices: [500, 1980]
      });

      expect(getPrice(item)).toBe('¥500〜¥1,980');
    });

    it('セール中の場合はセール価格を表示する', () => {
      const item = createHistory({
        prices: [1000],
        salePrices: [500],
        saleLimitTime: new Date(2099, 11, 31, 23, 59).toString()
      });

      expect(getPrice(item)).toBe('¥500');
    });
  });

  describe('getSalePercent', () => {
    it('セール中の場合は割引率を計算する', () => {
      const item = createHistory({
        prices: [1000],
        salePrices: [500],
        saleLimitTime: new Date(2099, 11, 31, 23, 59).toString()
      });

      expect(getSalePercent(item)).toBe(50);
    });

    it('セール中ではない場合は0を返す', () => {
      const item = createHistory({
        prices: [1000],
        salePrices: [500],
        saleLimitTime: new Date(2000, 0, 1).toString()
      });

      expect(getSalePercent(item)).toBe(0);
    });
  });
});
