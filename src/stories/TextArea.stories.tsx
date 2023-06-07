import type { Meta, StoryObj } from "storybook-solidjs";
import { TextArea } from "../components/TextArea";

const meta = {
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  args: {
    label: "This is a textarea",
  },
};
