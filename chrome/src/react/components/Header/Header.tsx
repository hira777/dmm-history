import React from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

import { Input } from '../Input';
import { useStoreDispatchContext } from '@/react/contexts/StoreContext';
import { setKeywords } from '@/react/store/actionCreators';

type InputProps = {
  onChange: (value: string) => void;
};

export const Header: React.FC<InputProps> = () => {
  const dispatch = useStoreDispatchContext();
  const onChange = debounce((newText: string): void => {
    dispatch(setKeywords(newText));
  }, 200);

  return (
    <StyledHeader>
      <StyledHeaderContainer>
        <StyledHeaderColumn>
          <StyledHeaderLogo>DMM History</StyledHeaderLogo>
        </StyledHeaderColumn>
        <StyledHeaderColumn>
          <Input
            labelText="keyword"
            placeholder="キーワードから探す"
            onChange={onChange}
          />
        </StyledHeaderColumn>
      </StyledHeaderContainer>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  height: 50px;
  padding: 0;
  background-color: #363636;
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  max-width: 960px;
  height: 100%;
  margin: 0 auto;
`;

const StyledHeaderColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 20px;
`;

const StyledHeaderLogo = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;
