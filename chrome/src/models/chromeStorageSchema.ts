import { Histories } from '@/models/history';
import type { SaleFilter } from '@/utils/saleFilter';

export const keys = {
  dmmHistory: 'dmmHistory',
  histories: 'histories',
  saleSearchFilter: 'saleSearchFilter'
} as const;

// 本当は`keys.dmmHistory`と`keys.histories`をインデックスシグネチャに利用したい
// https://github.com/microsoft/TypeScript/issues/13778
export type ChromeStorageSchema = {
  dmmHistory?: {
    histories?: Histories;
  };
  saleSearchFilter?: SaleFilter;
};
