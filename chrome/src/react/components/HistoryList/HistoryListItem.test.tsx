import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { getHistory } from '../../../../../mock/histories';
import { HistoryListItem, HistoryListItemProps } from './HistoryListItem';

const history = getHistory();
const props: HistoryListItemProps = {
  history,
  onClickDelete: jest.fn(),
};

describe('HistoryListItem', () => {
  it('「削除する」ボタンをクリックすると、onChange が実行される', () => {
    const { getByLabelText } = render(<HistoryListItem {...props} />);
    const element = getByLabelText('削除する');
    fireEvent.click(element);
    expect(props.onClickDelete).toHaveBeenCalledTimes(1);
    expect(props.onClickDelete).toHaveBeenNthCalledWith(1, history.id);
  });
});
