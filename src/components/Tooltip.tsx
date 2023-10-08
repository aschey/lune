import { Component, JSXElement } from "solid-js";
import { twMerge } from "tailwind-merge";

export interface TooltipProps {
  text: string;
  delay?: "short" | "long";
  children: JSXElement;
}

export const Tooltip: Component<TooltipProps> = (props) => (
  <div
    class={twMerge(
      "tooltip tooltip-neutral-focus transition ease-in-out before:opacity-0 after:opacity-0 hover:before:opacity-80 hover:after:opacity-80",
      props.delay === "long"
        ? "hover:before:delay-1000 hover:after:delay-1000"
        : "hover:before:delay-75 hover:after:delay-75"
    )}
    data-tip={props.text}
  >
    {props.children}
  </div>
);
