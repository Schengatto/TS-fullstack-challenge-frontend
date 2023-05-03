import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PageNavigator from './PageNavigator';

export default {
  title: 'Components/ui/PageNavigator',
  component: PageNavigator,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PageNavigator>;

const Template: ComponentStory<typeof PageNavigator> = (args) => <PageNavigator {...args} />;

export const Default = Template.bind({});
Default.args = {
  pageCount: 10,
  pageNumber: 2,
  pageSize: 10
};