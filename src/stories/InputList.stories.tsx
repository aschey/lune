import type { Meta, StoryObj } from "storybook-solidjs";
import { InputList, InputListItem } from "../components/InputList";
import { createSignal } from "solid-js";

const meta = {
  component: InputList,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof InputList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: ({}) => {
    const [items, setItems] = createSignal<InputListItem[]>([]);
    return (
      <InputList
        items={items()}
        type="text"
        onAdd={() =>
          setItems((i) => [
            { name: (i) => `item${i}`, label: (i) => `item${i}` },
            ...i,
          ])
        }
        onRemove={(item) =>
          setItems((i) => i.filter((i) => i.name !== item.name))
        }
      />
    );
  },
};
