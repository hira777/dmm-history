import React from 'react';
import styled from 'styled-components';

export const Container: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  width: 960px;
  margin: 0 auto;
`;
