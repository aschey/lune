import {
  IconDefinition,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import Fa from "solid-fa";
import { Component, JSX, createSignal } from "solid-js";
import { twMerge } from "tailwind-merge";

export interface InputProps {
  type?: "text" | "number" | "checkbox";
  name: string;
  label?: string;
  fullWidth?: boolean;
  ref?: (element: HTMLInputElement) => void;
  value?: string | number | string[] | undefined;
  onInput?: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange?: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur?: JSX.EventHandler<HTMLInputElement, FocusEvent>;
}

export const Input: Component<InputProps> = (props) => {
  let inputRef: HTMLInputElement | undefined = undefined;
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
        id={props.name}
        value={props.value ?? ""}
        type={props.type}
        onInput={props.onInput}
        onChange={props.onChange}
        onBlur={props.onBlur}
        class={twMerge(
          "peer input-bordered input-md border border-base-content border-opacity-40 bg-base-100 rounded-btn text-base focus-visible:ring-1 ring-secondary focus:outline-none z-1",
          !!props.label ? "pt-4" : "",
          props.fullWidth ? "w-full" : ""
        )}
      />
      {props.label && (
        <label
          class={`absolute top-3 left-0 pl-4 text-base-content scale-90 -translate-y-3 transition-transform ${
            !btnMouseDown() &&
            "peer-focus:scale-90 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
          }`}
          for={props.name}
        >
          {props.label}
        </label>
      )}
    </>
  );

  switch (props.type) {
    case "number":
      return (
        <NumberInput
          input={input}
          inputRef={inputRef}
          fullWidth={props.fullWidth}
          onChange={props.onChange}
          onMouseDown={() => setBtnMouseDown(true)}
          onMouseUp={() => setBtnMouseDown(false)}
        />
      );
    case "checkbox":
      return <CheckboxInput name={props.name} label={props.label} />;
    default:
      return (
        <div class={twMerge("py-1 flex", props.fullWidth ? "w-full" : "")}>
          <span class={twMerge("relative", props.fullWidth ? "w-full" : "")}>
            {input}
          </span>
        </div>
      );
  }
};

const CheckboxInput: Component<{
  name: string;
  label?: string;
}> = (props) => {
  return (
    <div class="py-1 flex">
      <label for={props.name} class="flex cursor-pointer relative p-1">
        <input
          id={props.name}
          name={props.name}
          type="checkbox"
          class="peer w-0 h-0"
        />
        <span class="absolute top-4 left-[0.6em] transform origin-[0%_100%] peer-checked:animate-[checkbox-check_125ms_150ms_cubic-bezier(.4,.0,.23,1)_forwards]"></span>
        <span class="flex border-base-content mr-3 justify-center items-center w-6 h-6 border-2 rounded transition-all peer-checked:border-[0.75em] peer-checked:border-primary peer-checked:animate-[shrink-bounce-in_150ms_cubic-bezier(.4,.0,.2,1)] peer-[:not(checked)]:animate-[shrink-bounce-out_150ms_cubic-bezier(.4,.0,.2,1)]"></span>
        {props.label}
      </label>
    </div>
  );
};

const NumberInput: Component<{
  onChange?: JSX.EventHandler<HTMLInputElement, Event>;
  onMouseDown: () => void;
  onMouseUp: () => void;
  input: JSX.Element;
  inputRef: HTMLInputElement | undefined;
  fullWidth?: boolean;
}> = (props) => {
  const handleButtonChange = (changeVal: number) => {
    if (!props.inputRef) {
      return;
    }
    const value =
      props.inputRef.value == null || props.inputRef.value == ""
        ? 0
        : parseFloat(props.inputRef.value as string) + changeVal;
    props.inputRef.value = value.toString();

    props.onChange?.({
      ...new Event("change"),
      currentTarget: props.inputRef,
      target: props.inputRef,
    });
  };

  return (
    <div class={twMerge("py-1 flex", props.fullWidth ? "w-full" : "")}>
      <span class={twMerge("relative", props.fullWidth ? "w-full" : "")}>
        {props.input}
        <span class="hidden absolute right-2 top-[0.6rem] hover:block peer-focus:block">
          <div class="flex flex-col">
            <SpinnerButton
              onMouseDown={props.onMouseDown}
              onMouseUp={props.onMouseUp}
              icon={faAngleUp}
              onClick={() => handleButtonChange(1)}
            />

            <SpinnerButton
              onMouseDown={props.onMouseDown}
              onMouseUp={props.onMouseUp}
              icon={faAngleDown}
              onClick={() => handleButtonChange(-1)}
            />
          </div>
        </span>
      </span>
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
