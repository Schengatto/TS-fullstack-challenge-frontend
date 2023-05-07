import { ComponentStory, ComponentMeta } from '@storybook/react';
import Select from './Select';

export default {
  title: 'Components/form/Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
  onChange: () => null,
  items: [
    { label: "test 1", value: 1 },
    { label: "test 2", value: 2 },
    { label: "test 3", value: 3 }
  ]
};
