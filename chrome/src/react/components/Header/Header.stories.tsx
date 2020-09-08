import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Header } from './index';

export default {
  title: 'Header',
  component: Header,
} as Meta;

export type InputProps = {
  onChange: (value: string) => void;
};
const Template: Story<InputProps> = (args) => <Header {...args} />;

export const Deflaut = Template.bind({});
Deflaut.args = {};
