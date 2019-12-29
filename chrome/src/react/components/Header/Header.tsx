import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

import TextField from '../TextField';
import { useStoreDispatchContext } from '@/react/contexts/StoreContext';
import { setKeywords } from '@/react/store/actionCreators';
import pxToRem from '@/react/utils/pxToRem';

export const Header: React.FC = () => {
  const dispatch = useStoreDispatchContext();

  const onChangeTextField = useCallback(
    debounce((newText: string): void => {
      dispatch(setKeywords(newText));
    }, 200),
    [dispatch]
  );

  return useMemo(
    () => (
      <Wrapper>
        <HeaderContainer>
          <HeaderColumn>
            <HeaderLogo>DMM History</HeaderLogo>
          </HeaderColumn>
          <HeaderColumn>
            <TextField onChange={onChangeTextField} />
          </HeaderColumn>
        </HeaderContainer>
      </Wrapper>
    ),
    [onChangeTextField]
  );
};
3;

const Wrapper = styled.header`
  height: 50px;
  padding: 0;
  background-color: #363636;
`;

const HeaderContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  max-width: 960px;
  height: 100%;
  margin: 0 auto;
`;

const HeaderColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 15px;
`;

const HeaderLogo = styled.div`
  color: #fff;
  font-size: ${pxToRem(16)};
  font-weight: bold;
`;
