import { Component, JSX, JSXElement } from "solid-js";
import { twMerge } from "tailwind-merge";

export interface ButtonProps {
  children: JSXElement;
  class?: string;
  outlined?: boolean;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
}

export const Button: Component<ButtonProps> = (props) => (
  <button
    onClick={props.onClick}
    disabled={props.disabled}
    type={props.type}
    class={twMerge(
      "link link-hover px-2 py-1 rounded transition-transform",
      !props.disabled && "active:scale-90",
      props.disabled && "opacity-50 cursor-not-allowed",
      !props.outlined && "hover:bg-opacity-80",
      props.outlined &&
        "border-2 border-solid border-current bg-[color-mix(in_srgb,currentColor_15%,transparent)]",
      props.outlined &&
        !props.disabled &&
        "hover:bg-[color-mix(in_srgb,currentColor_30%,transparent)]",
      props.class
    )}
  >
    {props.children}
  </button>
);
