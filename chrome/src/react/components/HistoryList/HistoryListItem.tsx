import React from 'react';
import styled from 'styled-components';

import { History } from '@/models/history';
import { removeHistory } from '@/react/store/actionCreators';
import { useStoreDispatchContext } from '@/react/contexts/StoreContext';
import usePriceInfo from '@/react/hooks/usePriceInfo';
import pxToRem from '@/react/utils/pxToRem';

const HistoryListItem: React.FC<History> = ({
  id,
  title,
  href,
  imageUrl,
  prices,
  salePrices,
  saleLimitTime
}) => {
  const dispatch = useStoreDispatchContext();
  const { sale, price, salePercent } = usePriceInfo({
    prices,
    salePrices,
    saleLimitTime
  });
  const handleClickDelete = (id: string): void => {
    dispatch(removeHistory(id));
  };

  return (
    <Card href={href} target="_blank" rel="noopener noreferrer">
      <CardDeleteButton
        className="card-delete-button"
        aria-label="削除する"
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
          handleClickDelete(id);
        }}
      />
      <CardImage>
        <img src={imageUrl} alt="" />
      </CardImage>
      <CardTitle>{title}</CardTitle>
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
  margin-bottom: ${pxToRem(25)};

  &:hover {
    .card-delete-button {
      display: inline-block;
    }
  }
`;

const CardImage = styled.figure`
  a {
    display: block;
  }

  img {
    object-fit: contain;
    display: block;
  }
`;

const CardDeleteButton = styled.button`
  display: none;
  position: absolute;
  top: ${pxToRem(5)};
  right: ${pxToRem(7)};
  width: 20px;
  height: 20px;
  border: none;
  outline: none;
  background-color: rgba(10, 10, 10, 0.6);
  font-size: 0;
  cursor: pointer;
  pointer-events: auto;
  appearance: none;
  vertical-align: top;

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
    height: 2px;
  }
  &::after {
    width: 2px;
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
  /* stylelint-disable-line */
  -webkit-box-orient: vertical; /* stylelint-disable-line */
  -webkit-line-clamp: 2;
`;

const CardPriceInfo = styled.div`
  display: flex;
  margin-top: ${pxToRem(3)};
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
