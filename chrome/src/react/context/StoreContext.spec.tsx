import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { initialState } from '@/react/store/reducer';
import StoreContextProvider, {
  useStoreContext,
  useStoreDispatchContext
} from './StoreContext';

test('ContextConsumer に state を渡す', () => {
  const wrapper: React.ComponentType = ({ children }) => (
    <StoreContextProvider>{children}</StoreContextProvider>
  );

  const { result } = renderHook(() => useStoreContext(), { wrapper });

  expect(result.current).toEqual(initialState());
});

test('ContextConsumer に dispatcher を渡す', () => {
  const wrapper: React.ComponentType = ({ children }) => (
    <StoreContextProvider>{children}</StoreContextProvider>
  );

  const { result } = renderHook(() => useStoreDispatchContext(), { wrapper });

  expect(result.current).toBeInstanceOf(Function);
});
