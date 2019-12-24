import React from 'react';
import styled from 'styled-components';

import { History } from '@/models/history';
import { removeHistory } from '@/react/store/actionCreators';
import { useStoreDispatchContext } from '@/react/context/StoreContext';
import usePriceInfo from '@/react/hooks/usePriceInfo';

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
    <Column className="column is-2">
      <Card className="card">
        <div className="card-image">
          <button
            className="delete card-delete-button"
            onClick={(): void => {
              handleClickDelete(id);
            }}
          ></button>
          <figure className="image">
            <a href={href} target="_blank" rel="noopener noreferrer">
              <img src={imageUrl} alt="" />
            </a>
          </figure>
        </div>
        <div className="card-content">
          <p className="card-content-title">
            <a href={href} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </p>
          <p className="card-content-priceinfo">
            <span className={`card-content-price ${sale ? 'sale' : ''}`}>
              {price}
            </span>
            {sale && <span className="tag is-danger">{salePercent}% OFF</span>}
          </p>
        </div>
      </Card>
    </Column>
  );
};

const Column = styled.div`
  padding: 1rem 0.6rem 0.6rem 0.6rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  height: 100%;
  box-shadow: none;
  border-bottom: 1px solid rgba(10, 10, 10, 0.1);

  .card-image {
    .image {
      img {
        object-fit: contain;
        display: block;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  .card-delete-button {
    position: absolute;
    z-index: 2;
    top: -10px;
    right: -7px;
  }

  .card-content {
    padding: 5px;
    .card-content-title {
      overflow: hidden;
      height: 2.1rem;
      font-size: 12px;
      font-weight: normal;
      line-height: 1.1rem;
      a {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        &:hover {
          text-decoration: underline;
        }
      }
      &:not(:last-child) {
        margin-bottom: 0.6rem;
      }
    }
    .card-content-priceinfo {
      font-size: 0;
    }
    .card-content-price {
      margin-right: 5px;
      font-size: 12px;
      font-weight: bold;
      color: #2d2d2d;

      &.sale {
        color: #c00;
      }
    }
    .tag:not(body) {
      font-size: 10px;
      font-weight: bold;
      padding: 0 0.3em;
      height: 1.5em;
      background: #c00;
    }
  }
`;

export default HistoryListItem;
