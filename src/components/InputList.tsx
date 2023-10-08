import { Component, For, createSignal, onCleanup, onMount } from "solid-js";
import { Input } from "./Input";
import { ComponentList } from "./ComponentList";

export interface InputListItem {
  name: (index: number) => string;
  label?: (index: number) => string;
}

export interface InputListProps {
  items: InputListItem[];
  type: "number" | "text" | "checkbox";
  label?: string;
  fullWidth?: boolean;
  onAdd: () => void;
  onRemoveAll: () => void;
  onRemove: (item: InputListItem, index: number) => void;
}

export const InputList: Component<InputListProps> = (props) => (
  <ComponentList
    items={props.items}
    onAdd={props.onAdd}
    onRemoveAll={props.onRemoveAll}
    onRemove={(index) => props.onRemove(props.items[index], index)}
  >
    {(item, i) => (
      <Input
        name={item.name(i())}
        label={item.label?.(i())}
        type={props.type}
        fullWidth={props.fullWidth}
      />
    )}
  </ComponentList>
);
