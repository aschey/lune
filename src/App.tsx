import { createSignal } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { Tab, Tabs } from "./components/Tabs";
import { Service, Services } from "./components/Services";
import { Card } from "./components/Card";

const App = () => {
  const services: Service[] = [
    {
      name: "service 1",
      methods: [{ name: "method 1" }, { name: "method 2" }],
    },
    { name: "service 2", methods: [] },
    { name: "service 3", methods: [{ name: "method 1" }] },
  ];
  return (
    <div class="flex container pt-1 pl-1">
      <div class="w-60 text-center ">
        <Services services={services} />
      </div>
      <div class="flex w-full pt-1 pl-10">
        <div class="w-1/2">hi</div>
        <div class="divider divider-horizontal before:bg-neutral after:bg-neutral" />
        <div class="w-1/2">hi2</div>
      </div>
    </div>
  );
};

export default App;
