use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, specta::Type, Debug)]
#[serde(rename_all = "camelCase")]
pub struct FileDescriptor {
    pub name: String,
    pub enum_types: Vec<EnumDescriptor>,
    pub message_types: Vec<MessageDescriptor>,
    pub services: Vec<ServiceDescriptor>,
}

impl From<prost_reflect::FileDescriptor> for FileDescriptor {
    fn from(value: prost_reflect::FileDescriptor) -> Self {
        Self {
            name: value.name().to_string(),
            enum_types: value.enums().map(|e| e.into()).collect(),
            message_types: value.messages().map(|m| m.into()).collect(),
            services: value.services().map(|s| s.into()).collect(),
        }
    }
}

#[derive(Serialize, Deserialize, specta::Type, Debug)]
#[serde(rename_all = "camelCase")]
pub struct EnumDescriptor {
    pub name: String,
    pub values: Vec<EnumValueDescriptor>,
}

impl From<prost_reflect::EnumDescriptor> for EnumDescriptor {
    fn from(value: prost_reflect::EnumDescriptor) -> Self {
        Self {
            name: value.name().to_string(),
            values: value.values().map(|v| v.into()).collect(),
        }
    }
}

#[derive(Serialize, Deserialize, specta::Type, Debug)]
#[serde(rename_all = "camelCase")]
pub struct EnumValueDescriptor {
    pub name: String,
    pub number: i32,
}

impl From<prost_reflect::EnumValueDescriptor> for EnumValueDescriptor {
    fn from(value: prost_reflect::EnumValueDescriptor) -> Self {
        Self {
            name: value.name().to_string(),
            number: value.number(),
        }
    }
}

#[derive(Serialize, Deserialize, specta::Type, Debug)]
#[serde(rename_all = "camelCase")]
pub struct ServiceDescriptor {
    pub name: String,
    pub methods: Vec<MethodDescriptor>,
}

impl From<prost_reflect::ServiceDescriptor> for ServiceDescriptor {
    fn from(value: prost_reflect::ServiceDescriptor) -> Self {
        Self {
            name: value.name().to_string(),
            methods: value.methods().map(|m| m.into()).collect(),
        }
    }
}

#[derive(Serialize, Deserialize, specta::Type, Debug)]
#[serde(rename_all = "camelCase")]
pub struct MethodDescriptor {
    pub name: String,
    pub input: String,
    pub output: String,
    pub is_client_streaming: bool,
    pub is_server_streaming: bool,
}

impl From<prost_reflect::MethodDescriptor> for MethodDescriptor {
    fn from(value: prost_reflect::MethodDescriptor) -> Self {
        Self {
            name: value.name().to_string(),
            input: value.input().name().to_string(),
            output: value.output().name().to_string(),
            is_client_streaming: value.is_client_streaming(),
            is_server_streaming: value.is_server_streaming(),
        }
    }
}

#[derive(Serialize, Deserialize, specta::Type, Debug)]
#[serde(rename_all = "camelCase")]
pub struct MessageDescriptor {
    pub name: String,
    pub fields: Vec<FieldDescriptor>,
    pub oneofs: Vec<OneofDescriptor>,
}

impl From<prost_reflect::MessageDescriptor> for MessageDescriptor {
    fn from(value: prost_reflect::MessageDescriptor) -> Self {
        Self {
            name: value.name().to_string(),
            fields: value.fields().map(|f| f.into()).collect(),
            oneofs: value.oneofs().map(|o| o.into()).collect(),
        }
    }
}

#[derive(Serialize, Deserialize, specta::Type, Debug)]
#[serde(rename_all = "camelCase")]
pub struct FieldDescriptor {
    pub name: String,
    pub number: u32,
    pub cardinality: Cardinality,
    pub kind: Kind,
}

impl From<prost_reflect::FieldDescriptor> for FieldDescriptor {
    fn from(value: prost_reflect::FieldDescriptor) -> Self {
        Self {
            name: value.name().to_owned(),
            number: value.number(),
            cardinality: value.cardinality().into(),
            kind: value.kind().into(),
        }
    }
}

#[derive(Serialize, Deserialize, specta::Type, Debug)]
#[serde(rename_all = "camelCase")]
pub struct OneofDescriptor {
    name: String,
    fields: Vec<FieldDescriptor>,
}

impl From<prost_reflect::OneofDescriptor> for OneofDescriptor {
    fn from(value: prost_reflect::OneofDescriptor) -> Self {
        Self {
            name: value.name().to_string(),
            fields: value.fields().map(|f| f.into()).collect(),
        }
    }
}

#[derive(Serialize, Deserialize, specta::Type, Debug)]
#[serde(rename_all = "camelCase")]
pub enum Cardinality {
    Optional,
    Required,
    Repeated,
}

impl From<prost_reflect::Cardinality> for Cardinality {
    fn from(value: prost_reflect::Cardinality) -> Self {
        match value {
            prost_reflect::Cardinality::Optional => Self::Optional,
            prost_reflect::Cardinality::Required => Self::Required,
            prost_reflect::Cardinality::Repeated => Self::Repeated,
        }
    }
}

#[derive(Serialize, Deserialize, specta::Type, Debug)]
#[serde(rename_all = "camelCase")]
pub enum MessageKind {
    Normal(String),
    Map { key: String, value: String },
}

#[derive(Serialize, Deserialize, specta::Type, Debug)]
#[serde(rename_all = "camelCase")]
pub enum Kind {
    Double,
    Float,
    Int32,
    Int64,
    Uint32,
    Uint64,
    Sint32,
    Sint64,
    Fixed32,
    Fixed64,
    Sfixed32,
    Sfixed64,
    Bool,
    String,
    Bytes,
    Message(MessageKind),
    Enum(EnumDescriptor),
}

impl From<prost_reflect::Kind> for Kind {
    fn from(value: prost_reflect::Kind) -> Self {
        match value {
            prost_reflect::Kind::Double => Self::Double,
            prost_reflect::Kind::Float => Self::Float,
            prost_reflect::Kind::Int64 => Self::Int64,
            prost_reflect::Kind::Uint64 => Self::Uint64,
            prost_reflect::Kind::Int32 => Self::Int32,
            prost_reflect::Kind::Fixed64 => Self::Fixed64,
            prost_reflect::Kind::Fixed32 => Self::Fixed32,
            prost_reflect::Kind::Bool => Self::Bool,
            prost_reflect::Kind::String => Self::String,
            prost_reflect::Kind::Message(descriptor) => {
                Self::Message(if descriptor.is_map_entry() {
                    MessageKind::Map {
                        key: descriptor.map_entry_key_field().name().to_string(),
                        value: descriptor.map_entry_value_field().name().to_string(),
                    }
                } else {
                    MessageKind::Normal(descriptor.name().to_string())
                })
            }
            prost_reflect::Kind::Bytes => Self::Bytes,
            prost_reflect::Kind::Uint32 => Self::Uint32,
            prost_reflect::Kind::Enum(descriptor) => Self::Enum(descriptor.into()),
            prost_reflect::Kind::Sfixed32 => Self::Sfixed32,
            prost_reflect::Kind::Sfixed64 => Self::Sfixed64,
            prost_reflect::Kind::Sint32 => Self::Sint32,
            prost_reflect::Kind::Sint64 => Self::Sint64,
        }
    }
}
