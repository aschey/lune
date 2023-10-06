import { Component, JSX, JSXElement } from "solid-js";
import { twMerge } from "tailwind-merge";

export interface ButtonProps {
  children: JSXElement;
  class?: string;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
}

export const Button: Component<ButtonProps> = (props) => (
  <button
    onClick={props.onClick}
    class={twMerge(
      "link link-hover hover:text-accent hover:bg-base-content hover:bg-opacity-10 px-2 py-1 rounded",
      props.class
    )}
  >
    {props.children}
  </button>
);
