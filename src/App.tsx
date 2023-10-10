import { createSignal } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { Tab, Tabs } from "./components/Tabs";

import { Card } from "./components/Card";
import { GrpcRequest } from "./components/GrpcRequest";
import { Expander, ExpanderNodeProps } from "./components/Expander";
import { InputList, InputListItem } from "./components/InputList";
import { FileDescriptor, MessageDescriptor } from "./bindings";
import { Select } from "./components/Select";

const App = () => {
  const services: ExpanderNodeProps[] = [
    {
      name: "service 1",
      children: ["method 1", "method 2"],
    },
    { name: "service 2", children: [] },
    { name: "service 3", children: ["method 1"] },
  ];

  const fileDescriptor: FileDescriptor = {
    name: "testFd",
    enumTypes: [],
    messageTypes: [],
    services: [
      {
        name: "service1",
        methods: [
          {
            name: "foo",
            input: {
              name: "input1",
              fields: [],
              oneofs: [],
            },
            output: {
              name: "output1",
              fields: [],
              oneofs: [],
            },
            isClientStreaming: false,
            isServerStreaming: false,
          },
        ],
      },
    ],
  };

  const protoRequest: MessageDescriptor = {
    name: "test",
    fields: [
      {
        name: "test1",
        number: 1,
        cardinality: "optional",
        kind: "string",
      },
      {
        name: "test2",
        number: 1,
        cardinality: "optional",
        kind: "int32",
      },
      {
        name: "test3",
        number: 1,
        cardinality: "optional",
        kind: "bool",
      },
      {
        name: "test4",
        number: 1,
        cardinality: "optional",
        kind: "bytes",
      },
      {
        name: "test5",
        number: 1,
        cardinality: "repeated",
        kind: "float",
      },
      {
        name: "test6",
        number: 1,
        cardinality: "repeated",
        kind: "string",
      },
      {
        name: "test7",
        number: 1,
        cardinality: "repeated",
        kind: "bytes",
      },
    ],
    oneofs: [],
  };

  const [items, setItems] = createSignal<InputListItem[]>([]);
  const [selected, setSelected] = createSignal(undefined);
  return (
    <div class="flex flex-col container pt-1 pl-1">
      <div class="flex">
        <Select
          placeholder="choose a thing"
          selectedOption={selected()}
          onChange={setSelected}
          options={["thing 1", "thing 2", "thing 3"]}
        />
      </div>
      <div class="flex flex-row">
        <div class="w-60 text-center">
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
    </div>
  );
};

export default App;
