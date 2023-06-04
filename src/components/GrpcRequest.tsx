import { Component, For, createEffect } from "solid-js";
import { Card } from "./Card";
import { createForm, insert } from "@modular-forms/solid";
import { Input } from "./Input";

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
}

export interface ProtoMessage {
  fields: Record<string, ProtoField>;
}

type ProtoForm = {
  // test: string;
  fields: { label: string; value: string }[];
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
    <Card class="h-full">
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
                        return (
                          <Field name={`fields.${index()}.value`}>
                            {(valueField, valueFieldProps) => {
                              return (
                                <Input
                                  label={labelField.value ?? ""}
                                  {...valueFieldProps}
                                  value={valueField.value}
                                  type={
                                    protoMessage.type === Type.Float
                                      ? "number"
                                      : "text"
                                  }
                                />
                              );
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
