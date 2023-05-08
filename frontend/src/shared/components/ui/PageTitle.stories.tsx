import { ComponentStory, ComponentMeta } from '@storybook/react';
import PageTitle from './PageTitle';

export default {
  title: 'Components/ui/PageTitle',
  component: PageTitle,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PageTitle>;

const Template: ComponentStory<typeof PageTitle> = (args) => <PageTitle {...args} />;

export const Search = Template.bind({});
Search.args = {
  title: "Test Title"
};
