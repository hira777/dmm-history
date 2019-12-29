import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/react/App';
import { StoreContextProvider } from '@/react/contexts/StoreContext';

ReactDOM.render(
  <StoreContextProvider>
    <App />
  </StoreContextProvider>,
  document.getElementById('app')
);
