import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { SearchResultStats, SearchResultStatsProps } from './SearchResultStats';

export default {
  title: 'SearchResultStats',
  component: SearchResultStats,
} as Meta;

const Template: Story<SearchResultStatsProps> = (args) => (
  <SearchResultStats {...args} />
);

export const Deflaut = Template.bind({});
Deflaut.args = {
  searchResultsCount: 100,
  keywords: 'すごい作品',
};

export const NotExists = Template.bind({});
NotExists.args = {
  searchResultsCount: 0,
  keywords: '',
};
