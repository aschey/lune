import { Component, For, createEffect, createSignal } from "solid-js";
import { Card } from "./Card";
import {
  FieldElementProps,
  createForm,
  insert,
  setValue,
} from "@modular-forms/solid";
import { Input } from "./Input";
import { TextArea } from "./TextArea";
import { InputList, InputListItem } from "./InputList";
import { TextAreaList, TextAreaListItem } from "./TextAreaList";
import {
  Cardinality,
  FieldDescriptor,
  Kind,
  MessageDescriptor,
} from "../bindings";
import { Button } from "./Button";

type ProtoForm = {
  fields: {
    label: string;
    value: string | string[];
  }[];
};

const toInputType = (
  kind: Kind
): "number" | "text" | "checkbox" | undefined => {
  switch (kind) {
    case "double":
    case "float":
    case "int64":
    case "uint64":
    case "int32":
    case "fixed64":
    case "fixed32":
    case "sfixed64":
    case "sfixed32":
    case "sint64":
    case "sint32":
      return "number";
    case "bool":
      return "checkbox";
    case "string":
      return "text";
    case "bytes":
      return undefined;
    default:
      return "text";
  }
};

export const GrpcRequest: Component<{ message: MessageDescriptor }> = (
  props
) => {
  const [form, { Form, Field, FieldArray }] = createForm<ProtoForm>({
    initialValues: {
      fields: props.message.fields.map((f) => ({
        label: f.name,
        value: "",
      })),
    },
  });

  return (
    <Card class="h-full p-2">
      <Form
        onSubmit={(values) => {
          console.log(values);
        }}
      >
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
                          <Field
                            name={`fields.${index()}.value`}
                            type={
                              protoMessage.cardinality === "repeated"
                                ? "string[]"
                                : "string"
                            }
                          >
                            {(valueField, valueFieldProps) => {
                              if (protoMessage.cardinality === "repeated") {
                                if (inputType) {
                                  const [items, setItems] = createSignal<
                                    InputListItem[]
                                  >([]);
                                  createEffect(() => {
                                    setValue(
                                      form,
                                      `fields.${index()}.value`,
                                      items().map((i) => i.name)
                                    );
                                  });
                                  return (
                                    <InputList
                                      type={inputType!}
                                      items={items()}
                                      title={labelField.value}
                                      fullWidth
                                      onAdd={() => {
                                        setItems((i) => [
                                          ...i,
                                          {
                                            name: (i) =>
                                              `${labelField.value}.${i}`,
                                            label: (i) =>
                                              `${labelField.value}[${i}]`,
                                          },
                                        ]);
                                      }}
                                      onRemove={(_, index) => {
                                        setItems((i) =>
                                          i.filter((_, i) => i !== index)
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
        <Button type="submit">submit</Button>
      </Form>
    </Card>
  );
};
