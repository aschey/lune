import { createSignal } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { Tab, Tabs } from "./components/Tabs";

import { Card } from "./components/Card";
import { GrpcRequest } from "./components/GrpcRequest";
import { Expander, ExpanderNodeProps } from "./components/Expander";
import { InputList, InputListItem } from "./components/InputList";
import { MessageDescriptor } from "./bindings";

const App = () => {
  const services: ExpanderNodeProps[] = [
    {
      name: "service 1",
      children: ["method 1", "method 2"],
    },
    { name: "service 2", children: [] },
    { name: "service 3", children: ["method 1"] },
  ];
  const protoRequest: MessageDescriptor = {
    name: "test",
    fields: [
      {
        name: "test1",
        number: 1,
        cardinality: "Optional",
        kind: "String",
        oneof_index: null,
      },
      {
        name: "test2",
        number: 1,
        cardinality: "Optional",
        kind: "Int32",

        oneof_index: null,
      },
      {
        name: "test3",
        number: 1,
        cardinality: "Optional",
        kind: "Bool",

        oneof_index: null,
      },
      {
        name: "test4",
        number: 1,
        cardinality: "Optional",
        kind: "Bytes",
        oneof_index: null,
      },
      {
        name: "test5",
        number: 1,
        cardinality: "Repeated",
        kind: "Float",
        oneof_index: null,
      },
      {
        name: "test6",
        number: 1,
        cardinality: "Repeated",
        kind: "String",

        oneof_index: null,
      },
      {
        name: "test7",
        number: 1,
        cardinality: "Repeated",
        kind: "Bytes",
        oneof_index: null,
      },
    ],
  };

  const [items, setItems] = createSignal<InputListItem[]>([]);

  return (
    <div class="flex container pt-1 pl-1">
      <div class="w-60 text-center ">
        <Card>
          <Expander nodes={services} />
        </Card>
      </div>
      <div class="flex w-full pt-1 pl-10">
        <div class="w-1/2">
          <GrpcRequest message={protoRequest} />
        </div>
        <div class="divider divider-horizontal before:bg-neutral after:bg-neutral" />
        <div class="w-1/2">
          <Card>
            {/* <InputList
              type="text"
              items={items()}
              onAdd={() => setItems((i) => [...i, { name: "hi", label: "hi" }])}
            /> */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default App;
