import { Histories } from '@/models/history';

export type ChromeStorageSchema = {
  dmmHistory?: {
    histories?: Histories;
  };
};
