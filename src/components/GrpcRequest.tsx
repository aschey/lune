import { Component, For, createEffect } from "solid-js";
import { Card } from "./Card";
import { createForm, insert } from "@modular-forms/solid";

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
  name: string;
  label?: Label;
  type: Type;
  typeName?: string;
}

export interface ProtoMessage {
  fields: ProtoField[];
}

type ProtoForm = {
  // test: string;
  fields: { label: string; value: string }[];
};

export const GrpcRequest: Component<{ message: ProtoMessage }> = (props) => {
  const [loginForm, { Form, Field, FieldArray }] = createForm<ProtoForm>({
    initialValues: {
      fields: props.message.fields.map((f) => ({ label: f.name, value: "" })),
    },
  });

  return (
    <Card class="h-full">
      <Form onSubmit={() => {}}>
        <FieldArray name="fields">
          {(fieldArray) => {
            console.log("field array", fieldArray);
            return (
              <For each={fieldArray.items}>
                {(item, index) => {
                  console.log("a", item, index());
                  return (
                    <div class="py-1">
                      <Field name={`fields.${index()}.label`}>
                        {(field, _) => (
                          <label class="label inline-block text-right py-1 px-2 w-20">
                            <span class="label-text">{field.value}</span>
                          </label>
                        )}
                      </Field>
                      <Field name={`fields.${index()}.value`}>
                        {(field, props) => (
                          <input
                            {...props}
                            value={field.value}
                            type="text"
                            class="input-bordered input-sm border border-base-content border-opacity-40 bg-base-100 rounded-btn text-base focus-visible:ring-1 ring-secondary focus:outline-none"
                          />
                        )}
                      </Field>
                    </div>
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
