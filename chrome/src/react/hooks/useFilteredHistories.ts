import { useMemo } from 'react';

import { Histories } from '@/models/history';
import matchAllKeywords from '@/utils/matchAllKeywords';

type Params = {
  histories: Histories;
  keywords: string[];
};
type FilteredHistories = {
  // キーワードにマッチする履歴。キーワードが存在しなければ履歴を全て返す。
  filteredHistories: Histories;
  // 履歴（filteredHistories）の件数
  numberOfHistories: number;
};

/**
 * フィルタリングした履歴情報を返却する Hooks
 */
export default function useFilteredHistories({
  histories,
  keywords
}: Params): FilteredHistories {
  const filteredHistories = useMemo(() => {
    if (!keywords.length) {
      return histories;
    }

    return histories.filter(({ title }) =>
      matchAllKeywords({
        keywords: keywords,
        target: title
      })
    );
  }, [histories, keywords]);

  const numberOfHistories = useMemo(() => filteredHistories.length, [
    filteredHistories
  ]);

  return { filteredHistories, numberOfHistories };
}
