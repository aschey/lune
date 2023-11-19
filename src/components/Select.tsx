import { Component } from "solid-js";
import { Select as KSelect } from "@kobalte/core";
import Fa from "solid-fa";
import { faCaretDown, faCheck } from "@fortawesome/free-solid-svg-icons";

export interface SelectProps {
  options: string[];
  placeholder: string;
  selectedOption: string | undefined;
  onChange: (val: string) => void;
}

export const Select: Component<SelectProps> = (props) => {
  return (
    <KSelect.Root
      options={props.options}
      placeholder={props.placeholder}
      onChange={props.onChange}
      itemComponent={(props) => (
        <KSelect.Item
          item={props.item}
          class="rounded flex items-center justify-between h-8 py-2 relative select-none outline-none"
        >
          <KSelect.ItemLabel>{props.item.rawValue}</KSelect.ItemLabel>
          <KSelect.ItemIndicator class="h-5 w-5 inline-flex items-center justify-center">
            <Fa icon={faCheck} />
          </KSelect.ItemIndicator>
        </KSelect.Item>
      )}
    >
      <KSelect.Trigger
        class="inline-flex items-center justify-between w-52 rounded-md px-4 bg-neutral h-10 outline-none border-2 border-solid border-neutral-focus text-neutral-content"
        aria-label={props.placeholder}
      >
        <KSelect.Value class="overflow-ellipsis whitespace-nowrap overflow-hidden">
          {props.selectedOption}
        </KSelect.Value>
        <KSelect.Icon class="h-5 w-5 flex-[0_0_20px]">
          <Fa icon={faCaretDown} />
        </KSelect.Icon>
      </KSelect.Trigger>
      <KSelect.Portal>
        <KSelect.Content class="rounded-md border-2 shadow-md bg-neutral outline-none text-neutral-content border-neutral-focus origin-[var(--kb-select-content-transform-origin)]">
          <KSelect.Listbox class="overflow-y-auto max-h-80 p-2 outline-none" />
        </KSelect.Content>
      </KSelect.Portal>
    </KSelect.Root>
  );
};
