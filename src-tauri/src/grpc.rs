use prost_reflect::{DeserializeOptions, DynamicMessage, MessageDescriptor, SerializeOptions};
use std::time::Instant;
use tonic::{client::Grpc, transport::Channel, IntoRequest};

#[derive(Debug, Clone)]
pub struct Request {
    pub message: DynamicMessage,
}

#[derive(Debug, Clone)]
pub struct Response {
    pub message: DynamicMessage,
    pub metadata: Vec<(String, String)>,
    pub timestamp: Instant,
}

impl Response {
    pub fn new(message: DynamicMessage) -> Self {
        Response {
            message,
            metadata: Vec::new(),
            timestamp: Instant::now(),
        }
    }
}

#[derive(Debug, Copy, Clone, PartialEq, Eq)]
pub enum MethodKind {
    Unary,
    ClientStreaming,
    ServerStreaming,
    BidiStreaming,
}

impl MethodKind {
    pub(crate) fn for_method(method: &prost_reflect::MethodDescriptor) -> MethodKind {
        match (method.is_client_streaming(), method.is_server_streaming()) {
            (false, false) => MethodKind::Unary,
            (true, false) => MethodKind::ClientStreaming,
            (false, true) => MethodKind::ServerStreaming,
            (true, true) => MethodKind::BidiStreaming,
        }
    }
}
