import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

type Props = {
  value?: string | number;
  placeholder?: string;
  onChange?: (newText: string) => void;
};

export const TextField: React.FC<Props> = ({ value = '', onChange }) => {
  const [text, setText] = useState(value);
  const _onChange = useCallback(
    (newText: string) => {
      setText(newText);

      if (onChange !== undefined) {
        onChange(newText);
      }
    },
    [onChange]
  );

  return (
    <Wrapper value={text} onChange={(e): void => _onChange(e.target.value)} />
  );
};

const Wrapper = styled.input`
  width: 100%;
  max-width: 100%;
  height: 28px;
  padding: 0 5px;
  border: none;
  border-radius: 3px;

  &:disabled {
    background: #e9ecef;
  }

  &:focus {
    outline: none;
  }
`;
