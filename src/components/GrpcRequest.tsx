import { Component, For, createEffect, createSignal } from "solid-js";
import { Card } from "./Card";
import { FieldElementProps, createForm, insert } from "@modular-forms/solid";
import { Input } from "./Input";
import { TextArea } from "./TextArea";
import { InputList, InputListItem } from "./InputList";
import { TextAreaList, TextAreaListItem } from "./TextAreaList";
import { FieldDescriptor, Kind, MessageDescriptor } from "../bindings";

type ProtoForm = {
  fields: { label: string; value: string }[];
};

const toInputType = (
  type: Kind
): "number" | "text" | "checkbox" | undefined => {
  switch (type) {
    case "Double":
    case "Float":
    case "Int64":
    case "Uint64":
    case "Int32":
    case "Fixed64":
    case "Fixed64":
    case "Sfixed64":
    case "Sfixed32":
    case "Sint64":
    case "Sint32":
      return "number";
    case "Bool":
      return "checkbox";
    case "String":
      return "text";
    case "Bytes":
      return undefined;
    default:
      return "text";
  }
};

export const GrpcRequest: Component<{ message: MessageDescriptor }> = (
  props
) => {
  const [loginForm, { Form, Field, FieldArray }] = createForm<ProtoForm>({
    initialValues: {
      fields: props.message.fields.map((f) => ({
        label: f.name,
        value: "",
      })),
    },
  });

  return (
    <Card class="h-full p-2">
      <Form onSubmit={() => {}}>
        <FieldArray name="fields">
          {(fieldArray) => {
            return (
              <For each={fieldArray.items}>
                {(_, index) => {
                  return (
                    <Field name={`fields.${index()}.label`}>
                      {(labelField, _) => {
                        const protoMessage = props.message.fields[index()];
                        const inputType = toInputType(protoMessage.kind);
                        return (
                          <Field name={`fields.${index()}.value`}>
                            {(valueField, valueFieldProps) => {
                              if (protoMessage.cardinality === "Repeated") {
                                if (inputType) {
                                  const [items, setItems] = createSignal<
                                    InputListItem[]
                                  >([]);
                                  return (
                                    <InputList
                                      type={inputType!}
                                      items={items()}
                                      title={labelField.value}
                                      fullWidth
                                      onAdd={() =>
                                        setItems((i) => [
                                          ...i,
                                          {
                                            name: (i) =>
                                              `${labelField.value}.${i}`,
                                            label: (i) =>
                                              `${labelField.value}[${i}]`,
                                          },
                                        ])
                                      }
                                      onRemove={(item) => {
                                        setItems((i) =>
                                          i.filter((i) => i.name != item.name)
                                        );
                                      }}
                                      onRemoveAll={() => {
                                        setItems([]);
                                      }}
                                    />
                                  );
                                } else {
                                  const [items, setItems] = createSignal<
                                    TextAreaListItem[]
                                  >([]);
                                  return (
                                    <TextAreaList
                                      items={items()}
                                      title={labelField.value ?? ""}
                                      fullWidth
                                      onAdd={() =>
                                        setItems((i) => [
                                          ...i,
                                          {
                                            label: (i) =>
                                              `${labelField.value}[${i}]`,
                                          },
                                        ])
                                      }
                                      onRemove={(item) => {
                                        setItems((i) =>
                                          i.filter((i) => i.label != item.label)
                                        );
                                      }}
                                      onRemoveAll={() => {
                                        setItems([]);
                                      }}
                                    />
                                  );
                                }
                              }
                              if (inputType) {
                                return (
                                  <Input
                                    label={labelField.value ?? ""}
                                    {...valueFieldProps}
                                    value={valueField.value}
                                    type={inputType}
                                    fullWidth
                                  />
                                );
                              } else {
                                return (
                                  <TextArea
                                    label={labelField.value ?? ""}
                                    fullWidth
                                  />
                                );
                              }
                            }}
                          </Field>
                        );
                      }}
                    </Field>
                  );
                }}
              </For>
            );
          }}
        </FieldArray>
      </Form>
    </Card>
  );
};
