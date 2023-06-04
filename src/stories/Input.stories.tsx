import type { Meta, StoryObj } from "storybook-solidjs";
import { Input } from "../components/Input";

const meta = {
  component: Input,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    type: "text",
  },
};

export const Number: Story = {
  args: {
    type: "number",
  },
};
