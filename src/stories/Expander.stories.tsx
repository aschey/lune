import type { Meta, StoryObj } from "storybook-solidjs";

import { Expander } from "../components/Expander";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  component: Expander,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Expander>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Docs: Story = {
  args: {
    nodes: [
      {
        name: "Node 1",
        children: ["Item 1", "Item 2"],
      },
      {
        name: "Node 2",
        children: ["Item 3", "Item 4"],
      },
    ],
  },
};
