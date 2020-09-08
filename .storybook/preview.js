import React from 'react';
import { StoreContextProvider } from '@/react/contexts/StoreContext';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

const withStoreContextProvider = (Story, context) => {
  return (
    <StoreContextProvider>
      <Story {...context} />
    </StoreContextProvider>
  );
};
export const decorators = [withStoreContextProvider];
