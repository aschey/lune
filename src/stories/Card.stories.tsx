import type { Meta, StoryObj } from "storybook-solidjs";
import { Card } from "../components/Card";

const meta = {
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    class: { control: "class" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  args: {
    class: "w-32 h-16 items-center justify-center",
    children: <div>This is a card</div>,
  },
};
