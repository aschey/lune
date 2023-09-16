import { Component, For } from "solid-js";
import { Input } from "./Input";

export interface InputListItem {
  name: string;
  label?: string;
}

export interface InputListProps {
  items: InputListItem[];
  type: "number" | "text" | "checkbox";
  onAdd: () => void;
}

export const InputList: Component<InputListProps> = (props) => {
  return (
    <div>
      <button onClick={props.onAdd}>Add</button>
      <For each={props.items}>
        {(i) => <Input type={props.type} name={i.name} label={i.label} />}
      </For>
    </div>
  );
};
