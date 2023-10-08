import { Component } from "solid-js";
import { ComponentList } from "./ComponentList";
import { TextArea } from "./TextArea";

export interface TextAreaListItem {
  label: (index: number) => string;
}

export interface TextAreaListProps {
  items: TextAreaListItem[];
  label: string;
  fullWidth?: boolean;
  onAdd: () => void;
  onRemoveAll: () => void;
  onRemove: (item: TextAreaListItem, index: number) => void;
}

export const TextAreaList: Component<TextAreaListProps> = (props) => (
  <ComponentList
    items={props.items}
    onAdd={props.onAdd}
    onRemoveAll={props.onRemoveAll}
    onRemove={(index) => props.onRemove(props.items[index], index)}
  >
    {(item, i) => (
      <TextArea label={item.label?.(i())} fullWidth={props.fullWidth} />
    )}
  </ComponentList>
);
