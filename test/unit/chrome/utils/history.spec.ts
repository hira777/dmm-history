import { KEYS } from '@/enums';
import { History } from '@/models/history';
import history from '@/utils/history';

describe('history', () => {
  const histories: History[] = [
    {
      id: '12',
      title: '良い作品',
      href: '',
      imageUrl: '',
      prices: [100],
      salePrices: null,
      saleLimitTime: null,
    },
    {
      id: '25',
      title: 'すごい作品',
      href: '',
      imageUrl: '',
      prices: [100],
      salePrices: null,
      saleLimitTime: null,
    },
    {
      id: '31',
      title: '超すごい作品',
      href: '',
      imageUrl: '',
      prices: [100],
      salePrices: null,
      saleLimitTime: null,
    },
  ];

  describe('add', () => {
    it('新しい履歴を追加する', () => {
      const newHistory = {
        id: '88',
        title: 'とんでもない作品',
        href: '',
        imageUrl: '',
        prices: [100],
        salePrices: null,
        saleLimitTime: null,
      };
      expect(history.add(histories, newHistory)).toEqual([
        {
          id: '88',
          title: 'とんでもない作品',
          href: '',
          imageUrl: '',
          prices: [100],
          salePrices: null,
          saleLimitTime: null,
        },
        {
          id: '12',
          title: '良い作品',
          href: '',
          imageUrl: '',
          prices: [100],
          salePrices: null,
          saleLimitTime: null,
        },
        {
          id: '25',
          title: 'すごい作品',
          href: '',
          imageUrl: '',
          prices: [100],
          salePrices: null,
          saleLimitTime: null,
        },
        {
          id: '31',
          title: '超すごい作品',
          href: '',
          imageUrl: '',
          prices: [100],
          salePrices: null,
          saleLimitTime: null,
        },
      ]);
    });

    it('新しい履歴のidが既存の履歴idと重複する場合、重複する既存の履歴を削除して新しい履歴を追加する', () => {
      const newHistory = {
        id: '25',
        title: 'すごい作品',
        href: '',
        imageUrl: '',
        prices: [100],
        salePrices: null,
        saleLimitTime: null,
      };
      expect(history.add(histories, newHistory)).toEqual([
        {
          id: '25',
          title: 'すごい作品',
          href: '',
          imageUrl: '',
          prices: [100],
          salePrices: null,
          saleLimitTime: null,
        },
        {
          id: '12',
          title: '良い作品',
          href: '',
          imageUrl: '',
          prices: [100],
          salePrices: null,
          saleLimitTime: null,
        },
        {
          id: '31',
          title: '超すごい作品',
          href: '',
          imageUrl: '',
          prices: [100],
          salePrices: null,
          saleLimitTime: null,
        },
      ]);
    });
  });

  describe('get', () => {
    it('履歴を取得する', () => {
      const chromeStorageObject = {
        [KEYS.DMM_HISTORY]: {
          [KEYS.HISTORIES]: histories,
        },
      };
      expect(history.get(chromeStorageObject)).toEqual(histories);
    });

    it('履歴が存在しない場合、空の履歴を取得する', () => {
      let chromeStorageObject = {
        [KEYS.DMM_HISTORY]: {},
      } as {};
      expect(history.get(chromeStorageObject)).toEqual([]);
      chromeStorageObject = {};
      expect(history.get(chromeStorageObject)).toEqual([]);
    });
  });
});
