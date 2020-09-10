import { History, Histories } from '@/models/history';
import { removeExpiredSaleInfo } from '@/utils/history';

export const getHistories = (): Histories => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return [
    {
      id: '12',
      title: '良い作品',
      href: '',
      imageUrl: 'https://dummyimage.com/200x300/000/fff',
      prices: [100, 200, 300],
      salePrices: null,
      saleLimitTime: null,
    },
    {
      id: '25',
      title: 'すごい作品',
      href: '',
      imageUrl: 'https://dummyimage.com/200x300/000/fff',
      prices: [100, 200, 300],
      salePrices: [50, 100, 150],
      saleLimitTime: tomorrow.toString(),
    },
    {
      id: '31',
      title: '超すごい作品',
      href: '',
      imageUrl: 'https://dummyimage.com/200x300/000/fff',
      prices: [100, 200, 300],
      salePrices: [50, 100, 150],
      saleLimitTime: yesterday.toString(),
    },
  ];
};

export const getHistory = (): History => {
  return getHistories()[0];
};

export const getHistoryOnSale = (): History => {
  return getHistories()[1];
};

export const getHistoriesRemovedExpiredSaleInfo = (): Histories => {
  return removeExpiredSaleInfo(getHistories());
};
