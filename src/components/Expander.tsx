import { Component, For, createSignal } from "solid-js";
import { Card } from "./Card";
import Fa from "solid-fa";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { createStore } from "solid-js/store";
import { Link } from "./Link";

export interface ExpanderNodeProps {
  name: string;
  children: string[];
}

export interface ExpanderProps {
  nodes: ExpanderNodeProps[];
}

export const Expander: Component<ExpanderProps> = (props) => {
  return (
    <ul class="menu py-1">
      <For each={props.nodes}>
        {(props) => {
          return <ExpanderNode {...props} />;
        }}
      </For>
    </ul>
  );
};

// https://nemzes.net/posts/animating-height-auto/
const ExpanderChild: Component<{ isOpen: boolean; children: string[] }> = (
  props
) => {
  return (
    <div
      class={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
        props.isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      } `}
    >
      <ul
        class={`transition-[visibility] duration-200 min-h-0 ${
          props.isOpen ? "visible" : "invisible"
        }`}
      >
        <For each={props.children}>
          {(m) => (
            <li class="">
              <Link class="pl-12 py-2">{m}</Link>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

const ExpanderNode: Component<ExpanderNodeProps> = (props) => {
  const [isExpanded, setIsExpanded] = createSignal(false);
  return (
    <li class="px-1">
      <Link
        class="p-2"
        onClick={() => {
          setIsExpanded((e) => !e);
        }}
      >
        <Fa
          icon={faAngleRight}
          class={`mt-1 mr-3 transition-transform duration-200 transform ${
            isExpanded() ? "rotate-90" : ""
          }`}
        />
        {props.name}
      </Link>

      <ExpanderChild children={props.children} isOpen={isExpanded()} />
    </li>
  );
};
