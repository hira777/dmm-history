import { describe, expect, it } from 'vitest';

import { KEYS } from '@/enums';
import type { History } from '@/models/history';
import { add, get } from './history';

describe('history', () => {
  const createHistory = (id: string, title: string): History => ({
    id,
    title,
    href: `https://example.com/${id}`,
    imageUrl: `https://example.com/${id}.jpg`,
    maker: 'メーカー',
    label: 'レーベル',
    prices: [1000],
    salePrices: null,
    saleLimitTime: null
  });

  const histories = [
    createHistory('12', '良い作品'),
    createHistory('25', 'すごい作品'),
    createHistory('31', '超すごい作品')
  ];

  describe('add', () => {
    it('新しい履歴を追加する', () => {
      const newHistory = createHistory('88', 'とんでもない作品');
      expect(add(histories, newHistory)).toEqual([
        createHistory('88', 'とんでもない作品'),
        createHistory('12', '良い作品'),
        createHistory('25', 'すごい作品'),
        createHistory('31', '超すごい作品')
      ]);
    });

    it('新しい履歴のidが既存の履歴idと重複する場合、重複する既存の履歴を削除して新しい履歴を追加する', () => {
      const newHistory = createHistory('25', 'すごい作品');
      expect(add(histories, newHistory)).toEqual([
        createHistory('25', 'すごい作品'),
        createHistory('12', '良い作品'),
        createHistory('31', '超すごい作品')
      ]);
    });
  });

  describe('get', () => {
    it('履歴を取得する', () => {
      const chromeStorageObject = {
        [KEYS.DMM_HISTORY]: {
          [KEYS.HISTORIES]: histories
        }
      };
      expect(get(chromeStorageObject)).toEqual(histories);
    });

    it('履歴が存在しない場合、空の履歴を取得する', () => {
      const chromeStorageObject = {
        [KEYS.DMM_HISTORY]: {}
      };
      expect(get(chromeStorageObject)).toEqual([]);
      expect(get({})).toEqual([]);
    });
  });
});
