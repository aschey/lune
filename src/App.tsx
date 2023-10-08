import { createSignal } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { Tab, Tabs } from "./components/Tabs";
// import { Service, Services } from "./components/Services";
import { Card } from "./components/Card";
import {
  GrpcRequest,
  Label,
  ProtoMessage,
  Type,
} from "./components/GrpcRequest";
import { Expander, ExpanderNodeProps } from "./components/Expander";
import { InputList, InputListItem } from "./components/InputList";

const App = () => {
  const services: ExpanderNodeProps[] = [
    {
      name: "service 1",
      children: ["method 1", "method 2"],
    },
    { name: "service 2", children: [] },
    { name: "service 3", children: ["method 1"] },
  ];
  const protoRequest: ProtoMessage = {
    fields: {
      test: {
        type: Type.Float,
      },
      test2: {
        type: Type.String,
      },
      test3: {
        type: Type.Bool,
      },
      test4: {
        type: Type.Bytes,
      },
      test5: {
        type: Type.Float,
        label: Label.Repeated,
      },
      test6: {
        type: Type.String,
        label: Label.Repeated,
      },
      test7: {
        type: Type.Bytes,
        label: Label.Repeated,
      },
    },
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
