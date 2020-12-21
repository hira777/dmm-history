import { renderHook } from '@testing-library/react-hooks';

import { getHistories } from '../../../../mock/histories';
import useFilteredHistories from './useFilteredHistories';

describe('useFilteredHistories', () => {
  const histories = getHistories();

  test('キーワードにマッチした履歴がない場合、すべての履歴を返す', () => {
    const { result } = renderHook(() =>
      useFilteredHistories({
        histories,
        keywords: '',
      })
    );

    expect(result.current.filteredHistories).toEqual(histories);
    expect(result.current.numberOfHistories).toBe(histories.length);
  });

  test('キーワードにマッチした履歴がある場合、マッチした履歴だけを返す', () => {
    const { result } = renderHook(() =>
      useFilteredHistories({
        histories,
        keywords: 'すごい',
      })
    );

    expect(result.current.filteredHistories).toEqual([
      histories[1],
      histories[2],
    ]);
    expect(result.current.numberOfHistories).toBe(2);
  });

  test('キーワードにマッチした履歴がある場合、マッチした履歴だけを返す（and 検索）', () => {
    const { result } = renderHook(() =>
      useFilteredHistories({
        histories,
        keywords: '超 すごい',
      })
    );

    expect(result.current.filteredHistories).toEqual([histories[2]]);
    expect(result.current.numberOfHistories).toBe(1);
  });
});
