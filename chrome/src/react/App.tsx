import type { ReactElement } from 'react';

import Header from './components/Header';
import HistoriesSummary from './components/HistoriesSummary';
import HistoryCards from './components/HistoryCards';
import { useHistories } from './hooks/useHistories';
import './App.scss';

export default function App(): ReactElement {
  const { allItems, items, searchInput, setSearchInput, removeItem } =
    useHistories();

  return (
    <>
      <Header
        itemsExist={allItems.length > 0}
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
      />
      <section className="section">
        <div id="histories" className="container">
          <HistoriesSummary
            allItems={allItems}
            numberOfItems={items.length}
            searchInput={searchInput}
          />
          <HistoryCards items={items} onDelete={removeItem} />
        </div>
      </section>
    </>
  );
}
