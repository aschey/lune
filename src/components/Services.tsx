import { Component, For } from "solid-js";
import { Card } from "./Card";
import Fa from "solid-fa";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { createStore } from "solid-js/store";

export interface Service {
  name: string;
  methods: Method[];
}

export interface Method {
  name: string;
}

// https://nemzes.net/posts/animating-height-auto/
const ServiceNode: Component<{
  service: Service;
  isOpen: boolean;
}> = (props) => {
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
        <For each={props.service.methods}>
          {(m) => (
            <li class="">
              <a class="pl-12 link-highlight p-2">{m.name}</a>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export const Services: Component<{ services: Service[] }> = (props) => {
  const [expanded, setExpanded] = createStore(
    props.services.reduce((o, s) => {
      o[s.name] = false;
      return o;
    }, {} as Record<string, boolean>)
  );

  return (
    <Card>
      <ul class="menu py-1">
        <For each={props.services}>
          {(s) => {
            const isExpanded = () => expanded[s.name];
            return (
              <li class="px-1">
                <a
                  class="link-highlight p-2"
                  onclick={() => {
                    setExpanded(s.name, !isExpanded());
                  }}
                >
                  <Fa
                    icon={faAngleRight}
                    class={`mt-1 mr-3 transition-transform duration-200 transform ${
                      isExpanded() ? "rotate-90" : ""
                    }`}
                  />
                  {s.name}
                </a>

                <ServiceNode service={s} isOpen={isExpanded()} />
              </li>
            );
          }}
        </For>
      </ul>
    </Card>
  );
};
