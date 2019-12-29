import React, { useMemo } from 'react';
import styled from 'styled-components';

import useFilteredHistories from '@/react/hooks/useFilteredHistories';
import { useStoreContext } from '@/react/contexts/StoreContext';
import pxToRem from '@/react/utils/pxToRem';

const useStats = () => {
  const state = useStoreContext();
  const { numberOfHistories } = useFilteredHistories(state);
  const keywords = useMemo(() => state.keywords.join(',').replace(',', ' '), [
    state.keywords
  ]);

  return useMemo(() => {
    if (state.restoredHistories) {
      if (keywords === '' && numberOfHistories === 0) {
        return '履歴が存在しません';
      }

      return keywords === ''
        ? `${numberOfHistories}件`
        : `${keywords} ${numberOfHistories}件`;
    }

    return <>読み込み中</>;
  }, [state.restoredHistories, numberOfHistories, keywords]);
};

export const SearchResultStats: React.FC = () => {
  const stats = useStats();

  return (
    <Wrapper>
      <span>{stats}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: ${pxToRem(20)};

  span {
    font-size: ${pxToRem(18)};
    font-weight: bold;
  }
`;
