import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import { keywordsUpdate } from '@/react/store/actionCreators';
import {
  useStoreContext,
  useStoreDispatchContext
} from '@/react/context/StoreContext';

const SearchInput: React.FC = () => {
  const state = useStoreContext();
  const dispatch = useStoreDispatchContext();
  const [text, setText] = useState('');
  const historyExists = useMemo(() => state.histories.length > 0, [
    state.histories
  ]);
  const handleInput = useCallback(
    (newText: string) => {
      setText(newText);
      dispatch(keywordsUpdate(newText));
    },
    [dispatch]
  );

  return (
    <Input
      className="input is-small"
      value={text}
      disabled={!historyExists}
      placeholder={historyExists ? '検索' : '履歴が存在しません'}
      onChange={(e): void => handleInput(e.target.value)}
    />
  );
};

const Input = styled.input`
  &.is-small.input {
    border-radius: 3px;
    height: 28px;

    &:disabled {
      background: #e9ecef;
    }
  }
`;

export default SearchInput;
