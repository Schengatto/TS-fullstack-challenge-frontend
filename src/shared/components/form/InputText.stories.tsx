import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import InputText from './InputText';

export default {
  title: 'Components/form/InputText',
  component: InputText,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof InputText>;

const Template: ComponentStory<typeof InputText> = (args) => <InputText {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'InputText Default',
};

export const Text = Template.bind({});
Text.args = {
  label: 'InputText Text',
  type: 'text',
  description: "InputText Component for text input",
  value: "Hello World!"
};

export const Number = Template.bind({});
Number.args = {
  label: 'InputText Number',
  type: 'number',
  description: "InputText Component for number input",
  value: 42
};
