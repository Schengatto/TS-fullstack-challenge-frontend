import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DropDown from './DropDown';

export default {
  title: 'Components/form/DropDown',
  component: DropDown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DropDown>;

const Template: ComponentStory<typeof DropDown> = (args) => <DropDown {...args} />;

export const Default = Template.bind({});
Default.args = {
  onChange: () => null,
  items: [
    { label: "test 1", value: 1 },
    { label: "test 2", value: 2 },
    { label: "test 3", value: 3 }
  ]
};
