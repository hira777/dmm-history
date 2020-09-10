import React from 'react';
import { GlobalStyle } from '@/react/components/GlobalStyle';
import { StoreContextProvider } from '@/react/contexts/StoreContext';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

const withStoreContextProvider = (Story, context) => {
  return (
    <StoreContextProvider>
      <GlobalStyle />
      <Story {...context} />
    </StoreContextProvider>
  );
};
export const decorators = [withStoreContextProvider];
