import React, { useMemo } from 'react';
import styled from 'styled-components';

function pxToRem(value: number, font = 16) {
  return `${value / font}rem`;
}

export type SearchResultStatsPtops = {
  searchResultsCount: number;
  keywords: string;
  isLoding: boolean;
};

export const SearchResultStats: React.FC<SearchResultStatsPtops> = ({
  searchResultsCount,
  keywords,
  isLoding,
}) => {
  const stats = useMemo(() => {
    if (isLoding) {
      return <>読み込み中</>;
    }

    if (keywords === '' && searchResultsCount === 0) {
      return '履歴が存在しません';
    }

    return keywords === ''
      ? `${searchResultsCount}件`
      : `${keywords} ${searchResultsCount}件`;
  }, [searchResultsCount, keywords, isLoding]);

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
