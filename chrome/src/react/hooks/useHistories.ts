import { useEffect, useState } from 'react';

import type { Histories } from '@/models/history';
import matchAllKeywords from '@/utils/matchAllKeywords';
import { normalizeKeywords } from '@/react/utils/keyword';
import { restoreHistories, saveHistories } from '@/react/utils/historyStorage';

type UseHistories = Readonly<{
  allItems: Histories;
  items: Histories;
  searchInput: string;
  setSearchInput: (value: string) => void;
  removeItem: (itemId: string) => void;
}>;

export const useHistories = (): UseHistories => {
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
    restoreHistories().then(items => {
      setAllItems(items);
    });
  }, []);

  const removeItem = (itemId: string): void => {
    setAllItems(currentItems => {
      const nextItems = currentItems.filter(item => item.id !== itemId);
      saveHistories(nextItems);
      return nextItems;
    });
  };

  const updateSearchInput = (value: string): void => {
    setSearchInput(value.replace(/\u3000/g, ' '));
  };

  return {
    allItems,
    items,
    searchInput,
    setSearchInput: updateSearchInput,
    removeItem
  };
};
