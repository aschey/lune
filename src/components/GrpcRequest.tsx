import { Component, For, createEffect, createSignal } from "solid-js";
import { Card } from "./Card";
import { FieldElementProps, createForm, insert } from "@modular-forms/solid";
import { Input } from "./Input";
import { TextArea } from "./TextArea";
import { InputList, InputListItem } from "./InputList";
import { TextAreaList, TextAreaListItem } from "./TextAreaList";

export enum Label {
  Optional = 1,
  Required = 2,
  Repeated = 3,
}

export enum Type {
  /// 0 is reserved for errors.
  /// Order is weird for historical reasons.
  Double = 1,
  Float = 2,
  /// Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT64 if
  /// negative values are likely.
  Int64 = 3,
  Uint64 = 4,
  /// Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT32 if
  /// negative values are likely.
  Int32 = 5,
  Fixed64 = 6,
  Fixed32 = 7,
  Bool = 8,
  String = 9,
  /// Tag-delimited aggregate.
  /// Group type is deprecated and not supported in proto3. However, Proto3
  /// implementations should still be able to parse the group wire format and
  /// treat group fields as unknown fields.
  Group = 10,
  /// Length-delimited aggregate.
  Message = 11,
  /// New in version 2.
  Bytes = 12,
  Uint32 = 13,
  Enum = 14,
  Sfixed32 = 15,
  Sfixed64 = 16,
  /// Uses ZigZag encoding.
  Sint32 = 17,
  /// Uses ZigZag encoding.
  Sint64 = 18,
}

export interface ProtoField {
  label?: Label;
  type: Type;
  typeName?: string;
  listType?: Type;
  mapKeyType?: Type;
  mapValueType?: Type;
}

export interface ProtoMessage {
  fields: Record<string, ProtoField>;
}

type ProtoForm = {
  fields: { label: string; value: string }[];
};

const toInputType = (
  type: Type
): "number" | "text" | "checkbox" | undefined => {
  switch (type) {
    case Type.Double:
    case Type.Float:
    case Type.Int64:
    case Type.Uint64:
    case Type.Int32:
    case Type.Fixed64:
    case Type.Fixed32:
    case Type.Sfixed64:
    case Type.Sfixed32:
    case Type.Sint64:
    case Type.Sint32:
      return "number";
    case Type.Bool:
      return "checkbox";
    case Type.String:
      return "text";
    case Type.Bytes:
      return undefined;
    default:
      return "text";
  }
};

export const GrpcRequest: Component<{ message: ProtoMessage }> = (props) => {
  const [loginForm, { Form, Field, FieldArray }] = createForm<ProtoForm>({
    initialValues: {
      fields: Object.keys(props.message.fields).map((f) => ({
        label: f,
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
                        const protoMessage =
                          props.message.fields[labelField.value || ""];
                        const inputType = toInputType(protoMessage.type);
                        return (
                          <Field name={`fields.${index()}.value`}>
                            {(valueField, valueFieldProps) => {
                              if (protoMessage.label === Label.Repeated) {
                                if (inputType) {
                                  const [items, setItems] = createSignal<
                                    InputListItem[]
                                  >([]);
                                  return (
                                    <InputList
                                      type={inputType!}
                                      items={items()}
                                      label={labelField.value}
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
                                      label={labelField.value ?? ""}
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
