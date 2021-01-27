import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { getHistory, getHistoryOnSale } from '../../../../../mock/histories';
import { Container } from '../Container';
import { Wrapper, Columns, Column } from './HistoryList';
import { HistoryListItem, HistoryListItemProps } from './HistoryListItem';

export default {
  title: 'HistoryListItem',
  component: HistoryListItem,
  decorators: [
    (Story) => (
      <Container>
        <Wrapper>
          <Columns>
            <Column>
              <Story />
            </Column>
          </Columns>
        </Wrapper>
      </Container>
    ),
  ],
} as Meta;

const Template: Story<HistoryListItemProps> = (args) => (
  <HistoryListItem {...args} />
);

export const Deflaut = Template.bind({});
Deflaut.args = {
  history: getHistory(),
};

export const Sale = Template.bind({});
Sale.args = {
  history: getHistoryOnSale(),
};
