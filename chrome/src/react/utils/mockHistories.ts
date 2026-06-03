import type { Histories } from '@/models/history';

export const mockHistories: Histories = [
  {
    id: 'mock001',
    title: 'サンプル作品 A 期間限定セール',
    href: 'https://video.dmm.co.jp/av/content/?id=mock001',
    imageUrl: 'https://picsum.photos/seed/dmm-history-mock-001/200/272',
    maker: 'サンプルメーカー',
    label: 'サンプルレーベル',
    prices: [980, 1980],
    salePrices: [490, 990],
    saleLimitTime: new Date(2099, 11, 31, 23, 59).toString(),
    hasSampleVideo: true,
    sampleVideoUrl:
      'https://www.dmm.co.jp/litevideo/-/part/=/affi_id=hira777-004/cid=ofje00512/size=1280_720/',
    sampleVideoPlayCount: 58014,
    favoriteCount: 4555
  },
  {
    id: 'mock002',
    title: '検索確認用 素人 ドキュメント作品',
    href: 'https://video.dmm.co.jp/av/content/?id=mock002',
    imageUrl: 'https://picsum.photos/seed/dmm-history-mock-002/200/272',
    maker: 'テストメーカー',
    label: 'テストレーベル',
    prices: [550],
    salePrices: null,
    saleLimitTime: null,
    hasSampleVideo: false,
    sampleVideoUrl: null,
    sampleVideoPlayCount: null,
    favoriteCount: 120
  },
  {
    id: 'mock003',
    title: '長いタイトル表示を確認するためのサンプル作品タイトル',
    href: 'https://video.dmm.co.jp/av/content/?id=mock003',
    imageUrl: 'https://picsum.photos/seed/dmm-history-mock-003/200/272',
    maker: 'ローカルメーカー',
    label: 'ローカルレーベル',
    prices: [300, 1200, 2500],
    salePrices: null,
    saleLimitTime: null,
    hasSampleVideo: true,
    sampleVideoUrl:
      'https://www.dmm.co.jp/litevideo/-/part/=/affi_id=hira777-004/cid=mida00642/size=1280_720/',
    sampleVideoPlayCount: 1200,
    favoriteCount: null
  }
];
