import { Histories } from '@/models/history';

const histories: Histories = [
  {
    id: '12',
    title: '良い作品',
    href: '',
    imageUrl: '',
    prices: [100, 200, 300],
    salePrices: null,
    saleLimitTime: ''
  },
  {
    id: '25',
    title: 'すごい作品',
    href: '',
    imageUrl: '',
    prices: [100, 200, 300],
    salePrices: null,
    saleLimitTime: ''
  },
  {
    id: '31',
    title: '超すごい作品',
    href: '',
    imageUrl: '',
    prices: [100, 200, 300],
    salePrices: null,
    saleLimitTime: ''
  }
];

export const getHistories = (): Histories => histories;
