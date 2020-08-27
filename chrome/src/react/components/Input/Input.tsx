import React, { useState } from 'react';

type Props = {
  labelText: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export const Input: React.FC<Props> = ({
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
