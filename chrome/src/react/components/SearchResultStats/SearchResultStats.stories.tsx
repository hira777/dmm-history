import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { SearchResultStats, SearchResultStatsPtops } from './SearchResultStats';

export default {
  title: 'SearchResultStats',
  component: SearchResultStats,
} as Meta;

const Template: Story<SearchResultStatsPtops> = (args) => (
  <SearchResultStats {...args} />
);

export const Deflaut = Template.bind({});
Deflaut.args = {
  searchResultsCount: 100,
  keywords: 'すごい作品',
  isLoding: false,
};

export const NotExists = Template.bind({});
NotExists.args = {
  searchResultsCount: 0,
  keywords: '',
  isLoding: false,
};

export const Loading = Template.bind({});
Loading.args = {
  searchResultsCount: 0,
  keywords: '',
  isLoding: true,
};
