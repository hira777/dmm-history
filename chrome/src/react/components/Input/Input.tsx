import React, { useState } from 'react';
import styled from 'styled-components';

export type InputProps = {
  labelText: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({
  placeholder,
  labelText,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <StyledInput
      type="text"
      aria-label={labelText}
      placeholder={placeholder}
      value={inputValue}
      onChange={(e): void => {
        setInputValue(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
};

const StyledInput = styled.input`
  width: 100%;
  max-width: 100%;
  height: 32px;
  padding: 10px 8px;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-sizing: border-box;

  &:disabled {
    background: #e9ecef;
  }

  &:focus {
    outline: none;
  }
`;
