import { Component, JSXElement } from "solid-js";

export const Card: Component<{ width?: number; children: JSXElement }> = (
  props
) => (
  <div
    class={`card bg-neutral text-neutral-content rounded ${
      props.width ? `w-${props.width}` : ""
    }`}
  >
    {props.children}
  </div>
);
