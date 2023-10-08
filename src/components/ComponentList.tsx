import {
  Accessor,
  Component,
  For,
  JSXElement,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import Fa from "solid-fa";
import { faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";
import { twMerge } from "tailwind-merge";
import { Tooltip } from "./Tooltip";

export interface ComponentListProps<T> {
  items: T[];
  children: (item: T, index: Accessor<number>) => JSXElement;
  onAdd: () => void;
  onRemoveAll: () => void;
  onRemove: (index: number) => void;
}

export function ComponentList<T extends any>(
  props: ComponentListProps<T>
): JSXElement {
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
          <ComponentListItem
            removed={removed()}
            index={i()}
            onRemove={props.onRemove}
          >
            {props.children(item, i)}
          </ComponentListItem>
        )}
      </For>
    </div>
  );
}

interface ComponentListItemProps<T> {
  index: number;
  removed: boolean;
  children: JSXElement;
  onRemove: (index: number) => void;
}

function ComponentListItem<T>(props: ComponentListItemProps<T>): JSXElement {
  const [show, setShow] = createSignal(false);
  const [hideOverflow, setHideOverflow] = createSignal(true);
  const [removeTimeout, setRemoveTimeout] = createSignal<
    NodeJS.Timeout | undefined
  >(undefined);

  onMount(() => {
    requestAnimationFrame(() => {
      setShow(true);
    });

    setAnimationTimeout(() => {
      setHideOverflow(false);
    });
  });

  const clearRemoveTimeout = () => {
    const timeout = removeTimeout();
    if (timeout) {
      clearTimeout(timeout);
      setRemoveTimeout(undefined);
    }
  };

  const handleRemove = () => {
    setShow(false);
    setHideOverflow(true);
    if (!removeTimeout()) {
      const timeout = setAnimationTimeout(() => {
        props.onRemove(props.index);
        setRemoveTimeout(undefined);
      });
      setRemoveTimeout(timeout);
    }
  };

  onCleanup(() => {
    clearRemoveTimeout();
  });

  return (
    <div
      class={twMerge(
        "grid w-full transition-all",
        show() && !props.removed ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
    >
      <div
        class={twMerge(
          "flex w-full transition-all",
          (props.removed || hideOverflow()) && "overflow-hidden",
          show() && !props.removed ? "visible" : "invisible"
        )}
      >
        <div class="mx-3 my-3">
          <Tooltip text="Remove Item" delay="long">
            <Button outlined class="h-8 text-error" onClick={handleRemove}>
              <Fa icon={faX} />
            </Button>
          </Tooltip>
        </div>
        {props.children}
      </div>
    </div>
  );
}

const setAnimationTimeout = (f: () => void) => setTimeout(f, 150);
