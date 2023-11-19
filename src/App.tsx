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
    messageTypes: [
      {
        name: "input1",
        fields: [
          {
            name: "test1",
            number: 1,
            cardinality: "optional",
            kind: "string",
          },
          {
            name: "test2",
            number: 2,
            cardinality: "optional",
            kind: "int32",
          },
          {
            name: "test3",
            number: 3,
            cardinality: "optional",
            kind: "bool",
          },
          {
            name: "test4",
            number: 4,
            cardinality: "optional",
            kind: "bytes",
          },
          {
            name: "test5",
            number: 5,
            cardinality: "repeated",
            kind: "float",
          },
          {
            name: "test6",
            number: 6,
            cardinality: "repeated",
            kind: "string",
          },
          {
            name: "test7",
            number: 7,
            cardinality: "repeated",
            kind: "bytes",
          },
          {
            name: "test8",
            number: 8,
            cardinality: "optional",
            kind: { message: { normal: "test" } },
          },
        ],
        oneofs: [],
      },
      {
        name: "output1",
        fields: [],
        oneofs: [],
      },
      {
        name: "test",
        fields: [],
        oneofs: [],
      },
    ],
    services: [
      {
        name: "service1",
        methods: [
          {
            name: "foo",
            input: "input1",
            output: "output1",
            isClientStreaming: false,
            isServerStreaming: false,
          },
        ],
      },
    ],
  };

  return (
    <div class="flex flex-col container pt-1 pl-1">
      <div class="flex flex-row p-2">
        <div class="w-60 text-center">
          <Card>
            <Expander nodes={services} />
          </Card>
        </div>
        <div class="flex w-full px-10">
          <div class="w-1/2">
            <GrpcRequest message={fileDescriptor.messageTypes[0]} />
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
