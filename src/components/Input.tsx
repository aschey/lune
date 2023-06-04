import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Fa from "solid-fa";
import { Component, JSX } from "solid-js";

export interface InputProps {
  type?: "text" | "number";
  ref: (element: HTMLInputElement) => void;
  value?: string | number | string[] | undefined;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>;
}

export const Input: Component<InputProps> = (props) => {
  const input = (
    <input
      ref={props.ref}
      value={props.value ?? ""}
      type={props.type}
      onInput={props.onInput}
      onChange={props.onChange}
      onBlur={props.onBlur}
      class="peer input-bordered input-sm border border-base-content border-opacity-40 bg-base-100 rounded-btn text-base focus-visible:ring-1 ring-secondary focus:outline-none"
      style={{ "z-index": 1 }}
    />
  );

  if (props.type === "number") {
    return (
      <span style={{ position: "relative" }}>
        {input}
        <span
          class="hidden peer-focus:block"
          style={{
            position: "absolute",
            right: "0.5rem",
            top: "-0.15rem",
          }}
        >
          <div
            style={{
              display: "flex",
              "flex-direction": "column",
              "font-size": "0.8em",
            }}
          >
            <button class="text-base-content rounded hover:bg-base-content hover:bg-opacity-30">
              <Fa icon={faAngleUp} />
            </button>
            <button class="text-base-content rounded hover:bg-base-content hover:bg-opacity-30">
              <Fa icon={faAngleDown} />
            </button>
          </div>
        </span>
      </span>
    );
  }

  return input;
};
