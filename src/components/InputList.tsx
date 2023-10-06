import { Component, For } from "solid-js";
import { Input } from "./Input";
import Fa from "solid-fa";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";

export interface InputListItem {
  name: (index: number) => string;
  label?: (index: number) => string;
}

export interface InputListProps {
  items: InputListItem[];
  type: "number" | "text" | "checkbox";
  label?: string;
  onAdd: () => void;
  onRemove: (item: InputListItem, index: number) => void;
}

export const InputList: Component<InputListProps> = (props) => {
  return (
    <div class="flex flex-col">
      <div class="flex p-2">
        {props.label || "Add"}
        <Button class="px-2 ml-1" onClick={props.onAdd}>
          <Fa icon={faPlus} class="text-success" />
        </Button>
      </div>

      <For each={props.items}>
        {(item, i) => (
          <span class="flex">
            <div class="flex">
              <Button
                class="py-0 my-2 mx-1"
                onClick={() => props.onRemove(item, i())}
              >
                <Fa icon={faX} class="text-base-content" />
              </Button>
            </div>
            <Input
              type={props.type}
              name={item.name(i())}
              label={item.label?.(i())}
            />
          </span>
        )}
      </For>
    </div>
  );
};
