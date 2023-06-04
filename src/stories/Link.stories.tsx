import type { Meta, StoryObj } from "storybook-solidjs";
import { Link } from "../components/Link";

const meta = {
  component: Link,
  tags: ["autodocs"],
  argTypes: {
    class: { control: "class" },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  args: {
    children: "This is a link",
  },
};
