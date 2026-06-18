import { describe, expect, it } from 'vitest';

import {
  applySaleFilterToUrl,
  createCorrectedSaleSearchUrl,
  createSaleFilterChangeSearchUrl,
  findSaleFilterFromUrl,
  isSaleFilterClearUrl,
  isSaleSearchResultUrl
} from './saleSearchFilterUrl';

const saleFilter = {
  label: 'アイポケキャンペーン30％OFF第9弾',
  paramName: 'campaign' as const,
  paramValue: 'ideapocketcp'
};

describe('saleSearchFilterUrl', () => {
  describe('isSaleSearchResultUrl', () => {
    it('キーワード付きのAV一覧URLの場合はtrueを返す', () => {
      expect(
        isSaleSearchResultUrl(
          new URL('https://video.dmm.co.jp/av/list/?key=%E4%B9%B3%E9%A6%96')
        )
      ).toBe(true);
    });

    it('AV一覧以外またはキーワードなしの場合はfalseを返す', () => {
      expect(
        isSaleSearchResultUrl(
          new URL('https://video.dmm.co.jp/av/list/?campaign=all')
        )
      ).toBe(false);
      expect(
        isSaleSearchResultUrl(
          new URL('https://video.dmm.co.jp/av/detail/?key=test')
        )
      ).toBe(false);
    });
  });

  describe('applySaleFilterToUrl', () => {
    it('URLにセール条件を追加する', () => {
      expect(
        applySaleFilterToUrl(
          new URL('https://video.dmm.co.jp/av/list/?key=test'),
          saleFilter
        ).href
      ).toBe('https://video.dmm.co.jp/av/list/?key=test&campaign=ideapocketcp');
    });

    it('セール条件がない場合はURLを変更しない', () => {
      expect(
        applySaleFilterToUrl(
          new URL('https://video.dmm.co.jp/av/list/?key=test'),
          null
        ).href
      ).toBe('https://video.dmm.co.jp/av/list/?key=test');
    });
  });

  describe('createCorrectedSaleSearchUrl', () => {
    it('キーワード検索後に消えたセール条件を復元する', () => {
      expect(
        createCorrectedSaleSearchUrl(
          new URL('https://video.dmm.co.jp/av/list/?key=test'),
          saleFilter
        )?.href
      ).toBe('https://video.dmm.co.jp/av/list/?key=test&campaign=ideapocketcp');
    });

    it('セール条件がすでに付いている場合は補正しない', () => {
      expect(
        createCorrectedSaleSearchUrl(
          new URL(
            'https://video.dmm.co.jp/av/list/?key=test&campaign=ideapocketcp'
          ),
          saleFilter
        )
      ).toBe(null);
    });

    it('指定なしの場合は補正しない', () => {
      expect(
        createCorrectedSaleSearchUrl(
          new URL('https://video.dmm.co.jp/av/list/?key=test'),
          null
        )
      ).toBe(null);
    });
  });

  describe('createSaleFilterChangeSearchUrl', () => {
    it('セール検索結果中に別セールへ切り替えるURLを作る', () => {
      expect(
        createSaleFilterChangeSearchUrl(
          new URL('https://video.dmm.co.jp/av/list/?campaign=all&key=test'),
          saleFilter,
          'test'
        )?.href
      ).toBe('https://video.dmm.co.jp/av/list/?campaign=ideapocketcp&key=test');
    });

    it('指定なしへ切り替えた場合はセール条件を外す', () => {
      expect(
        createSaleFilterChangeSearchUrl(
          new URL('https://video.dmm.co.jp/av/list/?campaign=all&key=test'),
          null,
          'test'
        )?.href
      ).toBe('https://video.dmm.co.jp/av/list/?key=test');
    });

    it('現在URLにkeyとcampaignがない場合はURLを作らない', () => {
      expect(
        createSaleFilterChangeSearchUrl(
          new URL('https://video.dmm.co.jp/av/list/?key=test'),
          saleFilter,
          'test'
        )
      ).toBe(null);
      expect(
        createSaleFilterChangeSearchUrl(
          new URL('https://video.dmm.co.jp/av/list/?campaign=all'),
          saleFilter,
          'test'
        )
      ).toBe(null);
    });

    it('フォームのキーワードが空の場合はURLを作らない', () => {
      expect(
        createSaleFilterChangeSearchUrl(
          new URL('https://video.dmm.co.jp/av/list/?campaign=all&key=test'),
          saleFilter,
          null
        )
      ).toBe(null);
    });
  });

  describe('isSaleFilterClearUrl', () => {
    it('セール検索結果から同じキーワードのセール解除URLへ遷移する場合はtrueを返す', () => {
      expect(
        isSaleFilterClearUrl(
          new URL('https://video.dmm.co.jp/av/list/?campaign=all&key=test'),
          new URL('https://video.dmm.co.jp/av/list/?key=test')
        )
      ).toBe(true);
    });

    it('現在URLにcampaignがない場合はfalseを返す', () => {
      expect(
        isSaleFilterClearUrl(
          new URL('https://video.dmm.co.jp/av/list/?key=test'),
          new URL('https://video.dmm.co.jp/av/list/?key=test')
        )
      ).toBe(false);
    });

    it('別のキーワードや別ページへのURLはfalseを返す', () => {
      expect(
        isSaleFilterClearUrl(
          new URL('https://video.dmm.co.jp/av/list/?campaign=all&key=test'),
          new URL('https://video.dmm.co.jp/av/list/?key=other')
        )
      ).toBe(false);
      expect(
        isSaleFilterClearUrl(
          new URL('https://video.dmm.co.jp/av/list/?campaign=all&key=test'),
          new URL('https://video.dmm.co.jp/av/detail/?key=test')
        )
      ).toBe(false);
    });
  });

  describe('findSaleFilterFromUrl', () => {
    it('URLのcampaignに一致するセール条件を返す', () => {
      expect(
        findSaleFilterFromUrl(
          new URL('https://video.dmm.co.jp/av/list/?campaign=ideapocketcp'),
          [
            {
              label: 'すべてのセール',
              paramName: 'campaign',
              paramValue: 'all'
            },
            saleFilter
          ]
        )
      ).toEqual(saleFilter);
    });

    it('URLのcampaignに一致するセール条件がない場合はnullを返す', () => {
      expect(
        findSaleFilterFromUrl(
          new URL('https://video.dmm.co.jp/av/list/?campaign=closed'),
          [saleFilter]
        )
      ).toBe(null);
    });

    it('URLにcampaignがない場合はnullを返す', () => {
      expect(
        findSaleFilterFromUrl(
          new URL('https://video.dmm.co.jp/av/list/?key=test'),
          [saleFilter]
        )
      ).toBe(null);
    });
  });
});
