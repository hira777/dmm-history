import { Histories } from '@/models/history';

export const keys = {
  dmmHistory: 'dmmHistory',
  histories: 'histories',
} as const;

// 本当は`keys.dmmHistory`と`keys.histories`をインデックスシグネチャに利用したい
// https://github.com/microsoft/TypeScript/issues/13778
export type ChromeStorageSchema = {
  dmmHistory?: {
    histories?: Histories;
  };
};
