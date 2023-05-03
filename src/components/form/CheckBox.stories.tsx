import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CheckBox from './CheckBox';

export default {
  title: 'Components/form/CheckBox',
  component: CheckBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = (args) => <CheckBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'CheckBox Default',
};

export const Checked = Template.bind({});
Checked.args = {
  label: 'CheckBox Checked',
  checked: true
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'CheckBox Disabled',
  disabled: true
};
