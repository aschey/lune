import { Component } from "solid-js";
import { twMerge } from "tailwind-merge";

export interface TextAreaProps {
  label: string;
  fullWidth?: boolean;
}

export const TextArea: Component<TextAreaProps> = (props) => {
  return (
    <div
      class={twMerge("rounded relative flex py-1", props.fullWidth && "w-full")}
    >
      <span
        class={twMerge(
          "peer block pt-4 textarea overflow-hidden border border-base-100 focus-visible:ring-1 ring-secondary focus:outline-none rounded min-w-[14rem] resize-y",
          props.fullWidth ? "w-full" : "w-56"
        )}
        role="textbox"
        contenteditable
      ></span>
      <span class="absolute top-3 left-0 pl-4 text-base-content transition-transform peer-focus:scale-90 peer-focus:-translate-y-2 peer-[&:not(:empty)]:scale-90 peer-[&:not(:empty)]:-translate-y-2">
        {props.label}
      </span>
    </div>
  );
};
