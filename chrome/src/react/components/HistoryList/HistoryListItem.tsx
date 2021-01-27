import React from 'react';
import styled from 'styled-components';

import { History } from '@/models/history';
import usePriceInfo from '@/react/hooks/usePriceInfo';
import * as colors from '@/react/colors/';

function pxToRem(value: number, font = 16) {
  return `${value / font}rem`;
}

export type HistoryListItemProps = {
  history: History;
  onClickDelete: (id: string) => void;
};

export const HistoryListItem: React.FC<HistoryListItemProps> = ({
  history,
  onClickDelete,
}) => {
  const { sale, price, salePercent } = usePriceInfo({
    prices: history.prices,
    salePrices: history.salePrices,
    saleLimitTime: history.saleLimitTime,
  });

  return (
    <Card href={history.href} target="_blank" rel="noopener noreferrer">
      <CardDeleteButton
        aria-label="削除する"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onClickDelete(history.id);
        }}
      />
      <CardImage>
        <img src={history.imageUrl} alt={history.title} />
      </CardImage>
      <CardTitle>{history.title}</CardTitle>
      <CardPriceInfo>
        <CardPrice className={`${sale ? 'sale' : ''}`}>{price}</CardPrice>
        {sale && <CardSalePrice>{salePercent}%OFF</CardSalePrice>}
      </CardPriceInfo>
    </Card>
  );
};

const Card = styled.a`
  display: block;
  position: relative;
  color: ${colors.primary};
`;

const CardImage = styled.figure`
  a {
    display: block;
  }
  img {
    object-fit: contain;
    display: block;
    width: 100%;
  }
`;

const CardDeleteButton = styled.button`
  display: none;
  position: absolute;
  top: ${pxToRem(5)};
  right: ${pxToRem(7)};
  width: 20px;
  height: 20px;
  border: 1px solid #fff;
  outline: none;
  background-color: rgba(10, 10, 10, 0.6);
  font-size: 0;
  cursor: pointer;
  pointer-events: auto;
  appearance: none;
  vertical-align: top;
  ${Card}:hover & {
    display: inline-block;
  }
  &:hover {
    background-color: rgba(10, 10, 10, 0.9);
  }
  &::before,
  &::after {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
    transform-origin: center center;
    background-color: #fff;
    content: '';
  }
  &::before {
    width: 50%;
    height: 1px;
  }
  &::after {
    width: 1px;
    height: 50%;
  }
`;

const CardTitle = styled.p`
  display: -webkit-box;
  height: ${pxToRem(32)};
  margin-top: ${pxToRem(5)};
  font-size: ${pxToRem(12)};
  line-height: ${pxToRem(16)};
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  ${Card}:hover & {
    text-decoration: underline;
  }
`;

const CardPriceInfo = styled.div`
  display: flex;
  margin-top: ${pxToRem(5)};
`;

const CardPrice = styled.span`
  color: #2d2d2d;
  font-size: ${pxToRem(12)};
  font-weight: bold;
  &.sale {
    margin-right: ${pxToRem(5)};
    color: #c00;
  }
`;

const CardSalePrice = styled.span`
  display: inline-flex;
  align-items: center;
  color: #c00;
  font-size: ${pxToRem(11)};
`;

export default HistoryListItem;
