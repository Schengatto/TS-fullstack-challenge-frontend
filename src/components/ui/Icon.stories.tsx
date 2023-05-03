import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Icon from './Icon';

export default {
  title: 'Components/ui/Icon',
  component: Icon,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Search = Template.bind({});
Search.args = {
  size: 20,
  type: 'search'
};

export const Prev = Template.bind({});
Prev.args = {
  size: 20,
  type: 'prev'
};

export const Next = Template.bind({});
Next.args = {
  size: 20,
  type: 'next'
};