import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { getHistories } from '../../../../../mock/histories';
import { HistoryList, HistoryListProps } from './HistoryList';

export default {
  title: 'HistoryList',
  component: HistoryList,
} as Meta;

const Template: Story<HistoryListProps> = (args) => <HistoryList {...args} />;

const histories = getHistories();
export const Deflaut = Template.bind({});
Deflaut.args = {
  histories: [...histories, ...histories, ...histories],
};

export const NotFound = Template.bind({});
NotFound.args = {
  histories: [],
};
