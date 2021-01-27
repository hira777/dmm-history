import React, { useState } from 'react';
import debounce from 'lodash.debounce';
import { Container } from './components/Container';
import { GlobalStyle } from './components/GlobalStyle';
import { Header } from './components/Header';
import { HistoryList } from './components/HistoryList';
import { SearchResultStats } from './components/SearchResultStats';
import useChromeStorageHistories from './hooks/useChromeStorageHistories';
import useFilteredHistories from './hooks/useFilteredHistories';

const App: React.FC = () => {
  const [keywords, setKeywords] = useState('');
  const {
    histories: allHistories,
    saveHistories,
    isLoading,
  } = useChromeStorageHistories();
  const { filteredHistories: histories } = useFilteredHistories({
    histories: allHistories,
    keywords,
  });
  const onChange = debounce((value: string): void => {
    setKeywords(value);
  }, 200);
  const onClickDelete = (id: string) => {
    saveHistories(allHistories.filter((history) => history.id !== id));
  };

  return (
    <>
      <GlobalStyle />
      <Header onChange={onChange} />
      <Container>
        {isLoading ? null : (
          <>
            <SearchResultStats
              searchResultsCount={histories.length}
              keywords={keywords}
            />
            <HistoryList histories={histories} onClickDelete={onClickDelete} />
          </>
        )}
      </Container>
    </>
  );
};

export default App;
