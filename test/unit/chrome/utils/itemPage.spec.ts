import itemPage from '@/utils/itemPage';

describe('itemPage', () => {
  describe('getCid', () => {
    it('商品IDを取得する', () => {
      expect(
        itemPage.getCid(
          'https://www.dmm.co.jp/digital/videoa/-/detail/=/cid=h_897esv00044/'
        )
      ).toBe('h_897esv00044');
      expect(
        itemPage.getCid(
          'https://www.dmm.co.jp/digital/videoa/-/detail/=/cid=118abp00858/'
        )
      ).toBe('118abp00858');
      expect(
        itemPage.getCid(
          'https://www.dmm.co.jp/digital/videoa/-/detail/=/cid=h_1241kbvr00011/'
        )
      ).toBe('h_1241kbvr00011');
    });
  });
});
