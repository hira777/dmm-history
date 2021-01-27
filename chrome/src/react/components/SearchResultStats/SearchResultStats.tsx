import React, { useMemo } from 'react';
import styled from 'styled-components';

function pxToRem(value: number, font = 16) {
  return `${value / font}rem`;
}

export type SearchResultStatsProps = {
  searchResultsCount: number;
  keywords: string;
};

export const SearchResultStats: React.FC<SearchResultStatsProps> = ({
  searchResultsCount,
  keywords,
}) => {
  const stats = useMemo(() => {
    return keywords === ''
      ? `${searchResultsCount}件`
      : `${keywords} ${searchResultsCount}件`;
  }, [searchResultsCount, keywords]);

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
