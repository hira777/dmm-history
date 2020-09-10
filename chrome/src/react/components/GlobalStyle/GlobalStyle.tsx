import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';

const StyledGlobalStyle = createGlobalStyle`
  a {
    text-decoration: none;
  }
`;

export const GlobalStyle = () => {
  return (
    <>
      <Reset />
      <StyledGlobalStyle />
    </>
  );
};
