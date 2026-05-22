import isAfter from 'date-fns/is_after';
import { useEffect, useState, type ReactElement } from 'react';

import { KEYS } from '@/enums';
import type { ChromeStorageSchema } from '@/models/chromeStorageSchema';
import type { Histories, History } from '@/models/history';
import chromeStorage from '@/utils/chromeStorage';
import historyManager from '@/utils/history';
import matchAllKeywords from '@/utils/matchAllKeywords';
import './App.scss';

const normalizeKeywords = (keywords: string): string[] => {
  return keywords
    .replace(/\u3000/g, ' ')
    .split(' ')
    .filter(keyword => keyword !== '');
};

const formatWithComma = (number: number): string => {
  return number.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
};

const isSale = (item: History): boolean => {
  return (
    item.salePrices !== null &&
    item.saleLimitTime !== null &&
    !isAfter(new Date().toString(), item.saleLimitTime)
  );
};

const getPrice = (item: History): string => {
  const prices = isSale(item) ? item.salePrices : item.prices;
  if (prices === null) return '';

  const formattedPrices = prices.map(price => formatWithComma(price));
  const maxIndex = formattedPrices.length - 1;

  return formattedPrices.length > 1
    ? `¥${formattedPrices[0]}〜¥${formattedPrices[maxIndex]}`
    : `¥${formattedPrices[0]}`;
};

const getSalePercent = (item: History): number => {
  if (item.salePrices === null) return 0;

  return isSale(item)
    ? Math.floor((1 - item.salePrices[0] / item.prices[0]) * 100)
    : 0;
};

type HeaderProps = Readonly<{
  itemsExist: boolean;
  searchInput: string;
  onSearchInputChange: (value: string) => void;
}>;

function Header({
  itemsExist,
  searchInput,
  onSearchInputChange
}: HeaderProps): ReactElement {
  return (
    <nav className="navbar is-transparent is-fixed-top">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item has-text-weight-bold">DMM History</div>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item">
              <div className="field">
                <div className="control">
                  <input
                    className="input is-small history-search-input"
                    placeholder={itemsExist ? '検索' : '履歴が存在しません'}
                    disabled={!itemsExist}
                    value={searchInput}
                    onChange={event =>
                      onSearchInputChange(event.currentTarget.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

type HistoriesSummaryProps = Readonly<{
  allItems: Histories;
  numberOfItems: number;
  searchInput: string;
}>;

function HistoriesSummary({
  allItems,
  numberOfItems,
  searchInput
}: HistoriesSummaryProps): ReactElement {
  const itemsExist = allItems.length > 0;

  return (
    <nav className="level">
      <div className="level-left">
        <div className="level-item">
          <p className="subtitle is-5">
            {!itemsExist && <strong>履歴が存在しません</strong>}
            {itemsExist && searchInput === '' && (
              <strong>{numberOfItems} タイトル</strong>
            )}
            {itemsExist && searchInput !== '' && (
              <strong>
                「{searchInput}」に対して{numberOfItems} タイトルが見つかりました
              </strong>
            )}
          </p>
        </div>
      </div>
    </nav>
  );
}

type HistoryCardProps = Readonly<{
  item: History;
  onDelete: (itemId: string) => void;
}>;

function HistoryCard({ item, onDelete }: HistoryCardProps): ReactElement {
  const sale = isSale(item);

  return (
    <div className="card card-equal-height history-card">
      <div className="card-image">
        <button
          type="button"
          className="delete card-delete-button"
          onClick={() => onDelete(item.id)}
        />
        <figure className="image">
          <a href={item.href} target="_blank" rel="noreferrer">
            <img src={item.imageUrl} alt={item.title} />
          </a>
        </figure>
      </div>

      <div className="card-content">
        <p className="card-content-title">
          <a href={item.href} target="_blank" rel="noreferrer">
            {item.title}
          </a>
        </p>
        <p className={`card-content-price${sale ? ' is-sale' : ''}`}>
          {getPrice(item)}
          {sale && <span className="tag is-danger">{getSalePercent(item)}%OFF</span>}
        </p>
      </div>
    </div>
  );
}

type HistoryCardsProps = Readonly<{
  items: Histories;
  onDelete: (itemId: string) => void;
}>;

function HistoryCards({ items, onDelete }: HistoryCardsProps): ReactElement {
  return (
    <div className="columns is-multiline">
      {items.map(item => (
        <div className="column is-2 history-card-column" key={item.id}>
          <HistoryCard item={item} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}

function saveHistories(items: Histories): void {
  const entity: ChromeStorageSchema = {
    [KEYS.DMM_HISTORY]: {
      [KEYS.HISTORIES]: items
    }
  };

  chromeStorage.set({ obj: entity });
}

export default function App(): ReactElement {
  const [allItems, setAllItems] = useState<Histories>([]);
  const [searchInput, setSearchInput] = useState('');
  const keywords = normalizeKeywords(searchInput);
  const items =
    keywords.length > 0
      ? allItems.filter(({ title }) =>
          matchAllKeywords({
            keywords,
            target: title
          })
        )
      : allItems;

  useEffect(() => {
    chromeStorage.get({ keys: KEYS.DMM_HISTORY }).then(obj => {
      setAllItems(historyManager.get(obj));
    });
  }, []);

  const handleDelete = (itemId: string): void => {
    setAllItems(currentItems => {
      const nextItems = currentItems.filter(item => item.id !== itemId);
      saveHistories(nextItems);
      return nextItems;
    });
  };

  return (
    <>
      <Header
        itemsExist={allItems.length > 0}
        searchInput={searchInput}
        onSearchInputChange={value => setSearchInput(value.replace(/\u3000/g, ' '))}
      />
      <section className="section">
        <div id="histories" className="container">
          <HistoriesSummary
            allItems={allItems}
            numberOfItems={items.length}
            searchInput={searchInput}
          />
          <HistoryCards items={items} onDelete={handleDelete} />
        </div>
      </section>
    </>
  );
}
