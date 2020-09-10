import React, { useMemo } from 'react';
import styled from 'styled-components';

import HistoryListItem from './HistoryListItem';
import { Histories, History } from '@/models/history';

function pxToRem(value: number, font = 16) {
  return `${value / font}rem`;
}

export type HistoryListProps = {
  histories: Histories;
  onClickDelete: (id: string) => void;
};

export const HistoryList: React.FC<HistoryListProps> = ({
  histories,
  onClickDelete,
}) => {
  return useMemo(() => {
    if (!histories.length)
      return (
        <NotFount>
          <p>絞り込み条件に一致する商品は見つかりませんでした。</p>
        </NotFount>
      );

    return (
      <Wrapper>
        <Columns>
          {histories.map((history: History) => {
            return (
              <Column key={history.id}>
                <HistoryListItem
                  key={history.id}
                  history={history}
                  onClickDelete={onClickDelete}
                />
              </Column>
            );
          })}
        </Columns>
      </Wrapper>
    );
  }, [histories]);
};

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 960px;
`;

const NotFount = styled(Wrapper)`
  margin: ${pxToRem(40)} auto;
  text-align: center;
`;

export const Columns = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const columnCount = 6;
export const Column = styled.div`
  margin-left: ${pxToRem(15)};
  width: calc((100% - (${pxToRem(15)} * ${columnCount - 1})) / ${columnCount});

  &:nth-child(n + ${columnCount + 1}) {
    margin-top: ${pxToRem(40)};
  }

  &:nth-child(${columnCount}n + 1) {
    margin-left: 0;
  }
`;
