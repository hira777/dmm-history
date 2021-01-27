import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { getHistoriesForStory } from '../../../../../mock/histories';
import { Container } from '../Container';
import { HistoryList, HistoryListProps } from './HistoryList';

export default {
  title: 'HistoryList',
  component: HistoryList,
} as Meta;

const Template: Story<HistoryListProps> = (args) => (
  <Container>
    <HistoryList {...args} />
  </Container>
);

export const Deflaut = Template.bind({});
Deflaut.args = {
  histories: getHistoriesForStory(),
};

export const NotFound = Template.bind({});
NotFound.args = {
  histories: [],
};
