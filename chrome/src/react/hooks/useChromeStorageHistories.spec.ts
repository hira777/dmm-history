import { renderHook, act } from '@testing-library/react-hooks';

import { getHistories } from '../../../../mock/histories';
import chromeStorage from '../../utils/chromeStorage';

import useChromeStorageHistories from './useChromeStorageHistories';

jest.mock('../../utils/chromeStorage');
describe('useChromeStorageHistories', () => {
  const histories = getHistories();

  (chromeStorage as jest.Mocked<typeof chromeStorage>).get.mockResolvedValue({
    dmmHistory: { histories },
  });

  test('ChromeStorage から履歴を取得する', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useChromeStorageHistories()
    );

    await waitForNextUpdate();

    expect(result.current.histories).toEqual(histories);
  });

  test('ChromeStorage に履歴をセットする', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useChromeStorageHistories()
    );

    await waitForNextUpdate();

    act(() => {
      result.current.saveHistories(histories);
    });

    expect(chromeStorage.set).toHaveBeenCalledTimes(1);
    expect(chromeStorage.set).toHaveBeenCalledWith({
      obj: {
        dmmHistory: {
          histories,
        },
      },
    });
  });
});
