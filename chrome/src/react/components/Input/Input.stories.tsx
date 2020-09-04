import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Input, InputProps } from './index';

export default {
  title: 'Input',
  component: Input,
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Deflaut = Template.bind({});
Deflaut.args = {
  labelText: 'keyword',
  placeholder: 'キーワードから探す',
};
