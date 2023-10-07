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
  fullWidth?: boolean;
  onAdd: () => void;
  onRemove: (item: InputListItem, index: number) => void;
}

export const InputList: Component<InputListProps> = (props) => {
  return (
    <div class="flex flex-col">
      <div class="flex m-3 w-full items-center justify-between">
        <div class="flex">Test5</div>
        <div class="flex mr-1">
          <Button outlined class="mx-3 h-8 text-success" onClick={props.onAdd}>
            <Fa icon={faPlus} />
          </Button>
        </div>
      </div>

      <For each={props.items}>
        {(item, i) => (
          <div class="flex w-full relative h-14 overflow-hidden">
            <div class="flex w-full absolute top-0 left-0 opacity-100">
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
                fullWidth={props.fullWidth}
              />
            </div>
          </div>
        )}
      </For>
    </div>
  );
};
