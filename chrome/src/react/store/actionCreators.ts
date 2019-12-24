/* eslint @typescript-eslint/explicit-function-return-type: 0 */

import { Histories } from '@/models/history';
import types from '@/react/store/actionTypes';

export function restoreHistories(histories: Histories) {
  return {
    type: types.RESTORE_HISTORIES,
    payload: histories
  } as const;
}

export function removeHistory(id: string) {
  return {
    type: types.REMOVE_HISTORY,
    payload: id
  } as const;
}

export function keywordsUpdate(keywords: string) {
  return {
    type: types.KEYWORDS_UPDATE,
    payload: keywords
  } as const;
}
