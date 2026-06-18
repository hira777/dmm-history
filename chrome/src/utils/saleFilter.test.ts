import { describe, expect, it } from 'vitest';

import {
  createSaleFilter,
  getSaleFilters,
  uniqueSaleFilters
} from './saleFilter';

describe('saleFilter', () => {
  describe('createSaleFilter', () => {
    it('セールリンクからセール情報を取得する', () => {
      expect(
        createSaleFilter({
          href: '/av/list/?campaign=ideapocketcp&sort=suggest',
          textContent: ' アイポケキャンペーン30％OFF第9弾 '
        })
      ).toEqual({
        label: 'アイポケキャンペーン30％OFF第9弾',
        paramName: 'campaign',
        paramValue: 'ideapocketcp'
      });
    });

    it('ラベル内の空白を整理する', () => {
      expect(
        createSaleFilter({
          href: '/av/list/?campaign=all&sort=suggest',
          textContent: `
            すべてのセール
          `
        })
      ).toEqual({
        label: 'すべてのセール',
        paramName: 'campaign',
        paramValue: 'all'
      });
    });

    it('対象外のリンクは取得しない', () => {
      expect(
        createSaleFilter({
          href: '/amateur/list/?campaign=all&sort=suggest',
          textContent: 'すべてのセール'
        })
      ).toBe(null);
      expect(
        createSaleFilter({
          href: '/av/list/?point_campaign=pointback',
          textContent: 'ポイント還元'
        })
      ).toBe(null);
      expect(
        createSaleFilter({
          href: '/av/list/?campaign=all',
          textContent: ''
        })
      ).toBe(null);
    });
  });

  describe('uniqueSaleFilters', () => {
    it('重複するセール条件を除外する', () => {
      expect(
        uniqueSaleFilters([
          {
            label: 'すべてのセール',
            paramName: 'campaign',
            paramValue: 'all'
          },
          {
            label: 'もっと見るのすべてのセール',
            paramName: 'campaign',
            paramValue: 'all'
          },
          {
            label: 'アイポケキャンペーン30％OFF第9弾',
            paramName: 'campaign',
            paramValue: 'ideapocketcp'
          }
        ])
      ).toEqual([
        {
          label: 'すべてのセール',
          paramName: 'campaign',
          paramValue: 'all'
        },
        {
          label: 'アイポケキャンペーン30％OFF第9弾',
          paramName: 'campaign',
          paramValue: 'ideapocketcp'
        }
      ]);
    });
  });

  describe('getSaleFilters', () => {
    it('サイドバー内のcampaignを持つリンクを取得する', () => {
      const root = {
        querySelectorAll: (selector: string) => {
          if (
            selector ===
            '[data-e2eid="sidebar-menu"] a[href*="/av/list/"][href*="campaign="]'
          ) {
            return [
              {
                href: '/av/list/?campaign=all&sort=suggest',
                textContent: 'すべてのセール'
              },
              {
                href: '/av/list/?campaign=ideapocketcp',
                textContent: 'アイポケキャンペーン30％OFF第9弾'
              }
            ];
          }

          return [];
        }
      } as unknown as ParentNode;

      expect(getSaleFilters(root)).toEqual([
        {
          label: 'すべてのセール',
          paramName: 'campaign',
          paramValue: 'all'
        },
        {
          label: 'アイポケキャンペーン30％OFF第9弾',
          paramName: 'campaign',
          paramValue: 'ideapocketcp'
        }
      ]);
    });
  });
});
