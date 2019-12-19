import React from 'react';

import '@/react/App.scss';
import Nav from '@/react/components/Nav';
import HistoryList from '@/react/components/HistoryList';
import HistoryNav from '@/react/components/HistoryNav';
import StoreContextProvider from '@/react/context/StoreContext';

const App: React.FC = () => {
  return (
    <StoreContextProvider>
      <Nav />
      <section className="section">
        <div className="container">
          <HistoryNav />
          <HistoryList />
        </div>
      </section>
    </StoreContextProvider>
  );
};

export default App;
