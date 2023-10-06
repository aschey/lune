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
      <div class="flex m-3 items-center">
        {props.label || "Add"}
        <Button outlined class="mx-3 h-8 text-success" onClick={props.onAdd}>
          <Fa icon={faPlus} />
        </Button>
      </div>

      <For each={props.items}>
        {(item, i) => (
          <span class="flex">
            <div class="flex">
              <Button
                outlined
                class="mx-3 h-8 my-3 text-error"
                onClick={() => props.onRemove(item, i())}
              >
                <Fa icon={faX} />
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
