import React, { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';

import HistoryListItem from './HistoryListItem';
import { History } from '@/models/history';
import {
  useStoreContext,
  useStoreDispatchContext
} from '@/react/contexts/StoreContext';
import useChromeStorageHistories from '@/react/hooks/useChromeStorageHistories';
import useFilteredHistories from '@/react/hooks/useFilteredHistories';
import { restoreHistories } from '@/react/store/actionCreators';
import pxToRem from '@/react/utils/pxToRem';

export const HistoryList: React.FC = () => {
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
      <Wrapper>
        <Columns>
          {filteredHistories.map((history: History) => {
            return (
              <Column key={history.id}>
                <HistoryListItem key={history.id} {...history} />
              </Column>
            );
          })}
        </Columns>
      </Wrapper>
    );
  }, [filteredHistories]);
};

const Wrapper = styled.div`
  margin-top: ${pxToRem(10)};
`;

const ColumnPadding = 10;
const Columns = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -${pxToRem(ColumnPadding)};
`;

const Column = styled.div`
  width: ${100 / 6}%;
  padding: 0 ${pxToRem(ColumnPadding)};
`;
