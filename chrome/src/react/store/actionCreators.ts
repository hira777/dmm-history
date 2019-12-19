import { Histories } from '@/models/history';
import types from '@/react/store/actionTypes';

export function restoreHistories(histories: Histories) {
  return {
    type: types.RESTORE_HISTORIES,
    payload: histories
  };
}

export function removeHistory(id: string) {
  return {
    type: types.REMOVE_HISTORY,
    payload: id
  };
}

export function keywordsUpdate(keywords: string) {
  return {
    type: types.KEYWORDS_UPDATE,
    payload: keywords
  };
}
