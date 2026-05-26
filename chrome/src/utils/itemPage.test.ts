import { describe, expect, it } from 'vitest';

import itemPage from './itemPage';

describe('itemPage', () => {
  describe('getItemId', () => {
    it('商品IDを取得する', () => {
      expect(
        itemPage.getItemId('https://video.dmm.co.jp/av/content/?id=prvr00087')
      ).toBe('prvr00087');
    });
  });

  describe('normalizeTitle', () => {
    it('商品タイトルからFANZA動画の接尾辞を削除する', () => {
      expect(
        itemPage.normalizeTitle(
          'サンプルタイトル｜エロ動画・アダルトビデオ｜FANZA動画'
        )
      ).toBe('サンプルタイトル');
    });
  });

  describe('getImageUrl', () => {
    it('商品IDから商品画像URLを取得する', () => {
      expect(itemPage.getImageUrl('nqtd00022')).toBe(
        'https://awsimgsrc.dmm.co.jp/pics_dig/digital/video/nqtd00022/nqtd00022ps.jpg?w=200&h=272&t=margin'
      );
    });
  });

  describe('getAffiliateUrl', () => {
    it('商品IDからアフィリエイトURLを取得する', () => {
      expect(itemPage.getAffiliateUrl('sone00682')).toBe(
        'https://al.fanza.co.jp/?lurl=https%3A%2F%2Fvideo.dmm.co.jp%2Fav%2Fcontent%2F%3Fid%3Dsone00682&af_id=hira777-004'
      );
    });
  });

  describe('parsePriceText', () => {
    it('価格文字列を数値に変換する', () => {
      expect(itemPage.parsePriceText('1,780円')).toBe(1780);
      expect(itemPage.parsePriceText('580円')).toBe(580);
    });
  });

  describe('parseSaleLimitTimeText', () => {
    it('セール期限の文字列を日時に変換する', () => {
      expect(
        itemPage.parseSaleLimitTimeText('5月26日(火) 23:59 まで', 2026)
      ).toBe(new Date(2026, 4, 26, 23, 59).toString());
    });
  });

  describe('getSaleLimitTimeText', () => {
    it('セール期限の要素から期限文字列を取得する', () => {
      const root = {
        querySelectorAll: () => [
          {
            textContent: `
              SALE
              5月26日(火) 23:59 まで
            `
          }
        ]
      } as unknown as ParentNode;

      expect(itemPage.getSaleLimitTimeText(root)).toContain(
        '5月26日(火) 23:59 まで'
      );
    });
  });

  describe('normalizeProductInfoValue', () => {
    it('商品情報の未設定値を空文字に変換する', () => {
      expect(itemPage.normalizeProductInfoValue('----')).toBe('');
      expect(itemPage.normalizeProductInfoValue(' キチックス/妄想族 ')).toBe(
        'キチックス/妄想族'
      );
    });
  });

  describe('getProductInfoValue', () => {
    it('商品情報テーブルから指定した項目を取得する', () => {
      const createRow = (label: string, value: string) => {
        return {
          querySelector: (selector: string) => {
            if (selector === 'th') return { textContent: label };
            if (selector === 'td') return { textContent: value };
            return null;
          }
        };
      };
      const root = {
        querySelectorAll: () => [
          createRow('メーカー：', 'キチックス/妄想族'),
          createRow('レーベル：', '炉利')
        ]
      } as unknown as ParentNode;

      expect(itemPage.getProductInfoValue('メーカー', root)).toBe(
        'キチックス/妄想族'
      );
      expect(itemPage.getProductInfoValue('レーベル', root)).toBe('炉利');
    });
  });
});
