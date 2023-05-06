import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import HelpButton from './HelpButton';

export default {
  title: 'Components/form/HelpButton',
  component: HelpButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof HelpButton>;

const Template: ComponentStory<typeof HelpButton> = (args) => <HelpButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick: () => null,
};
