import { describe, expect, it } from 'vitest';

import { hasSaleFilter } from './saleSearchFilterStorage';

describe('saleSearchFilterStorage', () => {
  describe('hasSaleFilter', () => {
    it('同じパラメータのセール条件が存在する場合はtrueを返す', () => {
      expect(
        hasSaleFilter(
          [
            {
              label: 'すべてのセール',
              paramName: 'campaign',
              paramValue: 'all'
            }
          ],
          {
            label: '保存済みのすべてのセール',
            paramName: 'campaign',
            paramValue: 'all'
          }
        )
      ).toBe(true);
    });

    it('同じパラメータのセール条件が存在しない場合はfalseを返す', () => {
      expect(
        hasSaleFilter(
          [
            {
              label: 'すべてのセール',
              paramName: 'campaign',
              paramValue: 'all'
            }
          ],
          {
            label: '終了したセール',
            paramName: 'campaign',
            paramValue: 'closed'
          }
        )
      ).toBe(false);
    });
  });
});
