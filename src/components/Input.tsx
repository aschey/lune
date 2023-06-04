import {
  IconDefinition,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import Fa from "solid-fa";
import { Component, JSX, createSignal } from "solid-js";

export interface InputProps {
  type?: "text" | "number";
  name: string;
  label: string;
  ref?: (element: HTMLInputElement) => void;
  value?: string | number | string[] | undefined;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>;
}

export const Input: Component<InputProps> = (props) => {
  let inputRef: HTMLInputElement;
  const [btnMouseDown, setBtnMouseDown] = createSignal(false);

  const input = (
    <>
      <input
        ref={(el) => {
          inputRef = el;
          props.ref?.(el);
        }}
        placeholder=" "
        name={props.name}
        value={props.value ?? ""}
        type={props.type}
        onInput={props.onInput}
        onChange={props.onChange}
        onBlur={props.onBlur}
        class="peer input-bordered input-md border border-base-content border-opacity-40 bg-base-100 rounded-btn text-base focus-visible:ring-1 ring-secondary focus:outline-none z-1"
        style={{ "padding-top": "1rem" }}
      />
      <label
        class={`absolute top-3 left-0 pl-4 text-base-content scale-90 -translate-y-3 ${
          !btnMouseDown() &&
          "peer-focus:scale-90 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
        }`}
        for={props.name}
      >
        {props.label}
      </label>
    </>
  );

  const handleButtonChange = (changeVal: number) => {
    const value =
      inputRef.value == null || inputRef.value == ""
        ? 0
        : parseFloat(inputRef.value as string) + changeVal;
    inputRef.value = value.toString();

    props.onChange({
      ...new Event("change"),
      currentTarget: inputRef,
      target: inputRef,
    });
  };

  if (props.type === "number") {
    return (
      <div class="py-1 flex">
        <span class="relative">
          {input}
          <span class="hidden absolute right-2 top-[0.6rem] hover:block peer-focus:block">
            <div class="flex flex-col">
              <SpinnerButton
                onMouseDown={() => setBtnMouseDown(true)}
                onMouseUp={() => setBtnMouseDown(false)}
                icon={faAngleUp}
                onClick={() => handleButtonChange(1)}
              />

              <SpinnerButton
                onMouseDown={() => setBtnMouseDown(true)}
                onMouseUp={() => setBtnMouseDown(false)}
                icon={faAngleDown}
                onClick={() => handleButtonChange(-1)}
              />
            </div>
          </span>
        </span>
      </div>
    );
  }

  return (
    <div class="py-1 flex">
      <span class="relative">{input}</span>
    </div>
  );
};

interface SpinnerProps {
  onMouseDown: () => void;
  onMouseUp: () => void;
  onClick: () => void;
  icon: IconDefinition;
}
const SpinnerButton: Component<SpinnerProps> = (props) => (
  <button
    onMouseDown={props.onMouseDown}
    onMouseUp={props.onMouseUp}
    class="text-base-content flex flex-row justify-center w-6 rounded hover:bg-base-content hover:bg-opacity-30 active:bg-opacity-60"
    onClick={props.onClick}
  >
    <Fa class="w-6" icon={props.icon} />
  </button>
);
