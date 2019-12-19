import React, { useMemo } from 'react';

import useFilteredHistories from '@/react/hooks/useFilteredHistories';
import { useStoreContext } from '@/react/context/StoreContext';

const HistoryNavInfo: React.FC = () => {
  const state = useStoreContext();
  const { numberOfHistories } = useFilteredHistories(state);
  const keywords = useMemo(() => state.keywords.join(',').replace(',', ' '), [
    state.keywords
  ]);

  return useMemo(() => {
    if (state.restoredHistories) {
      if (keywords === '' && numberOfHistories === 0) {
        return <>履歴が存在しません</>;
      }

      return keywords === '' ? (
        <>{numberOfHistories} タイトル</>
      ) : (
        <>
          「{keywords}」に対して{numberOfHistories} タイトルが見つかりました
        </>
      );
    }

    return <>読み込み中</>;
  }, [state.restoredHistories, numberOfHistories, keywords]);
};

const HistoryNav: React.FC = () => {
  return (
    <nav className="level">
      <div className="level-left">
        <div className="level-item">
          <p className="subtitle is-5">
            <strong>
              <HistoryNavInfo />
            </strong>
          </p>
        </div>
      </div>
    </nav>
  );
};

export default HistoryNav;
