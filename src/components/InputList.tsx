import { Component, For, createSignal, onMount } from "solid-js";
import { Input } from "./Input";
import Fa from "solid-fa";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";
import { twMerge } from "tailwind-merge";

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
    <div class="flex flex-col transition-all">
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
          <InputListItem
            item={item}
            index={i()}
            type={props.type}
            fullWidth={props.fullWidth}
            onRemove={props.onRemove}
          />
        )}
      </For>
    </div>
  );
};

interface InputListItemProps {
  item: InputListItem;
  index: number;
  type: "number" | "text" | "checkbox";
  fullWidth?: boolean;
  onRemove: (item: InputListItem, index: number) => void;
}

const InputListItem: Component<InputListItemProps> = (props) => {
  const [show, setShow] = createSignal(false);

  onMount(() => {
    setTimeout(() => {
      setShow(true);
    }, 15);
  });

  return (
    <div
      class={twMerge(
        "flex w-full relative  overflow-hidden transition-all",
        show() ? "h-14" : "h-0"
      )}
    >
      <div
        class={twMerge(
          "flex w-full absolute top-0 left-0 transition-all",
          show() ? "opacity-100" : "opacity-0"
        )}
      >
        <div class="flex">
          <Button
            outlined
            class="mx-3 h-8 my-3 text-error"
            onClick={() => {
              setShow(false);
              setTimeout(() => {
                props.onRemove(props.item, props.index);
              }, 150);
            }}
          >
            <Fa icon={faX} />
          </Button>
        </div>
        <Input
          type={props.type}
          name={props.item.name(props.index)}
          label={props.item.label?.(props.index)}
          fullWidth={props.fullWidth}
        />
      </div>
    </div>
  );
};
