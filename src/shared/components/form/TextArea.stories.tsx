import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextArea from './TextArea';

export default {
  title: 'Components/form/TextArea',
  component: TextArea,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'TextArea Default',
};

export const Text = Template.bind({});
Text.args = {
  label: 'TextArea Text',
  type: 'text',
  description: "TextArea Component for text input",
  value: "Hello World!"
};
