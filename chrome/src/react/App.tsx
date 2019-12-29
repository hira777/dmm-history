import React from 'react';

import './App.scss';

import Container from '@/react/components/Container';
import Header from '@/react/components/Header';
import HistoryList from '@/react/components/HistoryList';
import SearchResultStats from '@/react/components/SearchResultStats';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <SearchResultStats />
        <HistoryList />
      </Container>
    </>
  );
};

export default App;
