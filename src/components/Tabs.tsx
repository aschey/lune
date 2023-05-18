import { Component, JSX, JSXElement, children } from "solid-js";

export const Tab: Component<{ id: string; children: JSXElement }> = (props) => (
  <a
    id={props.id}
    class="tab tab-lifted text-opacity-50 hover:text-opacity-100 px-1 text-base-content"
  >
    {props.children}
  </a>
);

export const Tabs: Component<{
  selectedTabId: string;
  children: JSXElement;
}> = (props) => {
  const childElements = children(() => props.children).toArray();

  return (
    <div class="tabs">
      {childElements.map((c) => {
        if (c instanceof HTMLElement) {
          if (c.id === props.selectedTabId) {
            c.className += " tab-active";
          }
          return c;
        }
      })}
    </div>
  );
};
