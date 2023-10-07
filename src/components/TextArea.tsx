import { Component } from "solid-js";
import { twMerge } from "tailwind-merge";

export const TextArea: Component<{ label: string; fullWidth?: boolean }> = (
  props
) => {
  return (
    <div class="rounded relative flex">
      <span
        class={twMerge(
          "peer block pt-4 textarea  overflow-hidden border border-base-100 resize focus-visible:ring-1 ring-secondary focus:outline-none rounded",
          props.fullWidth ? "w-full" : "w-56"
        )}
        role="textbox"
        contenteditable
      ></span>
      <span class="absolute top-3 left-0 pl-4 text-base-content transition-transform peer-focus:scale-90 peer-focus:-translate-y-3 peer-[&:not(:empty)]:scale-90 peer-[&:not(:empty)]:-translate-y-3 pointer-events-none">
        {props.label}
      </span>
    </div>
  );
};
