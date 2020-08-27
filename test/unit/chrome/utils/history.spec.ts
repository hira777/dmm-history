import { KEYS } from '@/enums';
import { add, get } from '@/utils/history';

describe('history', () => {
  const histories = [
    { id: 12, title: '良い作品' },
    { id: 25, title: 'すごい作品' },
    { id: 31, title: '超すごい作品' },
  ];

  describe('add', () => {
    it('新しい履歴を追加する', () => {
      const newHistory = { id: 88, title: 'とんでもない作品' };
      expect(add(histories, newHistory)).toEqual([
        { id: 88, title: 'とんでもない作品' },
        { id: 12, title: '良い作品' },
        { id: 25, title: 'すごい作品' },
        { id: 31, title: '超すごい作品' },
      ]);
    });

    it('新しい履歴のidが既存の履歴idと重複する場合、重複する既存の履歴を削除して新しい履歴を追加する', () => {
      const newHistory = { id: 25, title: 'すごい作品' };
      expect(add(histories, newHistory)).toEqual([
        { id: 25, title: 'すごい作品' },
        { id: 12, title: '良い作品' },
        { id: 31, title: '超すごい作品' },
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
      expect(get(chromeStorageObject)).toEqual(histories);
    });

    it('履歴が存在しない場合、空の履歴を取得する', () => {
      let chromeStorageObject = {
        [KEYS.DMM_HISTORY]: {},
      };
      expect(get(chromeStorageObject)).toEqual([]);
      chromeStorageObject = {};
      expect(get(chromeStorageObject)).toEqual([]);
    });
  });
});
