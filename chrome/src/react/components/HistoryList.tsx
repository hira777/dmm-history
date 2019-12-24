import React, { useEffect, useMemo, useRef } from 'react';

import { History } from '@/models/history';
import HistoryListItem from '@/react/components/HistoryListItem';
import useChromeStorageHistories from '@/react/hooks/useChromeStorageHistories';
import useFilteredHistories from '@/react/hooks/useFilteredHistories';
import { restoreHistories } from '@/react/store/actionCreators';
import {
  useStoreContext,
  useStoreDispatchContext
} from '@/react/context/StoreContext';

const HistoryList: React.FC = () => {
  const state = useStoreContext();
  const dispatch = useStoreDispatchContext();
  const {
    histories: chromeStorageHistories,
    saveHistories
  } = useChromeStorageHistories();
  const { filteredHistories } = useFilteredHistories(state);

  useEffect(() => {
    if (chromeStorageHistories.length) {
      dispatch(restoreHistories(chromeStorageHistories));
    }
  }, [chromeStorageHistories, dispatch]);

  const initialHistories = useRef(true);
  useEffect(() => {
    if (initialHistories.current) {
      initialHistories.current = false;
      return;
    }
    saveHistories(state.histories);
  }, [saveHistories, state.histories]);

  return useMemo(() => {
    if (!filteredHistories.length) return <></>;

    return (
      <div className="columns is-multiline">
        {filteredHistories.map((history: History) => {
          return <HistoryListItem key={history.id} {...history} />;
        })}
      </div>
    );
  }, [filteredHistories]);
};

export default HistoryList;
