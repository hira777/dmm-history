import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { initialState } from '@/react/store/reducer';
import StoreContextProvider, {
  useStoreContext,
  useStoreDispatchContext
} from './StoreContext';

test('Consumer に state を渡すべき', () => {
  const wrapper = ({ children }) => (
    <StoreContextProvider>{children}</StoreContextProvider>
  );

  const { result } = renderHook(() => useStoreContext(), { wrapper });

  expect(result.current).toEqual(initialState());
});

test('Consumer に dispatcher を渡すべき', () => {
  const wrapper = ({ children }) => (
    <StoreContextProvider>{children}</StoreContextProvider>
  );

  const { result } = renderHook(() => useStoreDispatchContext(), { wrapper });

  expect(result.current).toBeInstanceOf(Function);
});
