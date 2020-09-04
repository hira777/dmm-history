import React, { useState } from 'react';

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
    <input
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
