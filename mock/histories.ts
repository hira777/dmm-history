import { History, Histories } from '@/models/history';
import { removeExpiredSaleInfo } from '@/utils/history';

const tomorrow = new Date();
const yesterday = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
yesterday.setDate(yesterday.getDate() - 1);

export const getHistories = (): Histories => {
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

export const getHistoriesForStory = (): Histories => {
  const history = {
    id: '12',
    title: '良い作品',
    href: '',
    imageUrl: 'https://dummyimage.com/200x300/000/fff',
    prices: [100, 200, 300],
    salePrices: null,
    saleLimitTime: null,
  };
  return [
    history,
    {
      ...history,
      id: '2',
      salePrices: [50, 100, 150],
      saleLimitTime: tomorrow.toString(),
    },
    {
      ...history,
      id: '3',
      salePrices: [50, 100, 150],
      saleLimitTime: yesterday.toString(),
    },
    { ...history, id: '4' },
    { ...history, id: '5' },
    { ...history, id: '6' },
    { ...history, id: '7' },
    { ...history, id: '8' },
    { ...history, id: '9' },
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
