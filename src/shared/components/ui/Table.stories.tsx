import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Table from "./Table";

export default {
  title: "Components/ui/Table",
  component: Table,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Table",
  headers: [
    { key: "name", label: "Name" },
    { key: "color" },
    { key: "price", label: "Cost", parseFunction: (price) => `${price}€` },
  ],
  items: [
    { name: "Apple", color: "red", price: 10 },
    { name: "Banana", color: "yellow", price: 5 },
    { name: "Orange", color: "orange", price: 8 },
    { name: "Kiwi", color: "Green", price: 4.99 },
    { name: "Strawberry", color: "Red", price: 5.99 },
    { name: "Grapes", color: "Purple", price: 6.99 },
    { name: "Pineapple", color: "Yellow/Green ", price: 7.99 },
    { name: "Mango", color: "Yellow/Green", price: 8.99 },
    { name: "Cherry", color: "Red", price: 9.99 },
    { name: "Watermelon", color: "Green/Red/White", price: 10.99 },
    { name: "Lemon", color: "Yellow/Green ", price: 11.99 }
  ],
  searchKey: "name"
};

