import { getHistories } from '../../../../mock/histories';
import types from './actionTypes';
import { reducer, initialState as getInitialState } from './reducer';

describe('reducer', () => {
  const initialState = getInitialState();
  const histories = getHistories();
  test(types.RESTORE_HISTORIES, () => {
    expect(
      reducer(initialState, {
        type: types.RESTORE_HISTORIES,
        payload: histories
      })
    ).toEqual({
      ...initialState,
      ...{
        histories,
        restoredHistories: true
      }
    });
  });

  test(types.REMOVE_HISTORY, () => {
    const state = {
      ...initialState,
      ...{
        histories
      }
    };
    const targetId = '12';
    const expectedHistories = histories.filter(({ id }) => id !== targetId);

    expect(
      reducer(state, {
        type: types.REMOVE_HISTORY,
        payload: targetId
      })
    ).toEqual({
      ...initialState,
      ...{
        histories: expectedHistories
      }
    });
  });

  test(types.SET_KEYWORDS, () => {
    expect(
      reducer(initialState, {
        type: types.SET_KEYWORDS,
        payload: 'すごい'
      })
    ).toEqual({
      ...initialState,
      ...{
        keywords: ['すごい']
      }
    });

    expect(
      reducer(initialState, {
        type: types.SET_KEYWORDS,
        payload: 'すごい 作品'
      })
    ).toEqual({
      ...initialState,
      ...{
        keywords: ['すごい', '作品']
      }
    });
  });
});
