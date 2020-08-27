import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Input } from './index';

const props = {
  labelText: 'keyword',
  placeholder: 'キーワードで絞り込む',
  onChange: jest.fn(),
};

describe('Input', () => {
  it('aria-label が存在する', () => {
    const { getByLabelText } = render(<Input {...props} />);
    const element = getByLabelText(props.labelText);
    expect(element).toBeInTheDocument();
  });

  it('placeholder が存在する', () => {
    const { getByPlaceholderText } = render(<Input {...props} />);
    const element = getByPlaceholderText(props.placeholder);
    expect(element).toBeInTheDocument();
  });

  it('input の値を更新すると、onChange が実行される', () => {
    const { getByLabelText } = render(<Input {...props} />);
    const element = getByLabelText(props.labelText);
    const value = 'abc';
    fireEvent.change(element, { target: { value } });
    expect((element as HTMLInputElement).value).toBe(value);
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenNthCalledWith(1, value);
  });
});
