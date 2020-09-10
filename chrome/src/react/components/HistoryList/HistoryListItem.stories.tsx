import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { getHistory, getHistoryOnSale } from '../../../../../mock/histories';
import { HistoryList } from './HistoryList';
import { HistoryListItem, HistoryListItemProps } from './HistoryListItem';

export default {
  title: 'HistoryListItem',
  component: HistoryListItem,
  decorators: [
    (Story) => (
      <HistoryList>
        <Story />
      </HistoryList>
    ),
  ],
} as Meta;

const Template: Story<HistoryListItemProps> = (args) => (
  <HistoryListItem {...args} />
);

export const Deflaut = Template.bind({});
Deflaut.args = getHistory();

export const Sale = Template.bind({});
Sale.args = getHistoryOnSale();
