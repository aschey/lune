import { Component, JSXElement } from "solid-js";
import { twMerge } from "tailwind-merge";

export const Card: Component<{
  children: JSXElement;
  class?: string;
}> = (props) => (
  <div
    class={twMerge(
      "card bg-neutral text-neutral-content rounded",
      props.class ?? ""
    )}
  >
    {props.children}
  </div>
);
