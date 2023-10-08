import { Component, For, createSignal, onCleanup, onMount } from "solid-js";
import { Input } from "./Input";
import Fa from "solid-fa";
import { faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";
import { twMerge } from "tailwind-merge";
import { Tooltip } from "./Tooltip";

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

export const InputList: Component<InputListProps> = (props) => {
  const [removed, setRemoved] = createSignal(false);
  const [removeAllTimeout, setRemoveAllTimeout] = createSignal<
    NodeJS.Timeout | undefined
  >(undefined);

  const removeAll = () => {
    props.onRemoveAll();
    setRemoved(false);
    setRemoveAllTimeout(undefined);
  };

  const cancelRemoveAllTimeout = () => {
    const timeout = removeAllTimeout();
    if (timeout) {
      removeAll();
      clearTimeout(timeout);
    }
  };

  return (
    <div class="flex flex-col transition-all">
      <div class="flex m-3 w-full items-center justify-between">
        <div class="flex">Test5</div>
        <div class="flex mr-1">
          <Tooltip text="Add Item" delay="long">
            <Button
              outlined
              class="mx-3 h-8 text-success"
              onClick={() => {
                cancelRemoveAllTimeout();
                props.onAdd();
              }}
            >
              <Fa icon={faPlus} />
            </Button>
          </Tooltip>
          <Tooltip text="Remove All" delay="long">
            <Button
              outlined
              class="mr-3 h-8 text-error"
              onClick={() => {
                setRemoved(true);
                if (!removeAllTimeout()) {
                  setRemoveAllTimeout(
                    setAnimationTimeout(() => {
                      removeAll();
                      setRemoveAllTimeout(undefined);
                    })
                  );
                }
              }}
            >
              <Fa icon={faTrash} />
            </Button>
          </Tooltip>
        </div>
      </div>

      <For each={props.items}>
        {(item, i) => (
          <InputListItem
            item={item}
            removed={removed()}
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
  removed: boolean;
  type: "number" | "text" | "checkbox";
  fullWidth?: boolean;
  onRemove: (item: InputListItem, index: number) => void;
}

const InputListItem: Component<InputListItemProps> = (props) => {
  const [show, setShow] = createSignal(false);
  const [removeTimeout, setRemoveTimeout] = createSignal<
    NodeJS.Timeout | undefined
  >(undefined);

  onMount(() => {
    setTimeout(() => {
      setShow(true);
    }, 0);
  });

  const clearRemoveTimeout = () => {
    const timeout = removeTimeout();
    if (timeout) {
      clearTimeout(timeout);
      setRemoveTimeout(undefined);
    }
  };

  onCleanup(() => {
    clearRemoveTimeout();
  });

  return (
    <div
      class={twMerge(
        "flex w-full transition-all",
        show() && !props.removed ? "h-14" : "h-0"
      )}
    >
      <div
        class={twMerge(
          "flex w-full transition-all",
          show() && !props.removed ? "opacity-100" : "opacity-0"
        )}
      >
        <div class="mx-3 my-3">
          <Tooltip text="Remove Item" delay="long">
            <Button
              outlined
              class="h-8 text-error"
              onClick={() => {
                setShow(false);
                if (!removeTimeout()) {
                  const timeout = setAnimationTimeout(() => {
                    props.onRemove(props.item, props.index);
                    setRemoveTimeout(undefined);
                  });
                  setRemoveTimeout(timeout);
                }
              }}
            >
              <Fa icon={faX} />
            </Button>
          </Tooltip>
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

const setAnimationTimeout = (f: () => void) => setTimeout(f, 150);
