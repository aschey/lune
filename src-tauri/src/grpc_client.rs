use std::{str::FromStr, sync::Arc, time::SystemTime};

use http::{
    uri::{PathAndQuery, Scheme},
    Uri,
};
use hyper::client::HttpConnector;
use hyper_rustls::{HttpsConnector, HttpsConnectorBuilder};
use once_cell::sync::Lazy;
use prost_reflect::{
    prost::Message, prost_types::FileDescriptorProto, DescriptorPool, DynamicMessage,
    MessageDescriptor, ReflectMessage,
};
use tokio::{stream, sync::mpsc};
use tokio_stream::{wrappers::ReceiverStream, StreamExt};
use tonic::{client::Grpc, transport::Channel, IntoRequest};
use tonic_reflection::pb::{
    server_reflection_client::ServerReflectionClient, server_reflection_request::MessageRequest,
    server_reflection_response::MessageResponse, FileDescriptorResponse, ServerReflectionRequest,
};

use crate::{
    codec::DynamicCodec,
    grpc::{MethodKind, Request, Response},
};
#[derive(Clone, Debug)]
pub struct Client {
    grpc: Grpc<Channel>,
    uri: Uri,
    verify_certs: bool,
}

impl Client {
    pub async fn new(uri: Uri, verify_certs: bool) -> Self {
        let channel = Self::connect(uri.clone(), verify_certs).await;
        Self {
            uri,
            verify_certs,
            grpc: Grpc::new(channel),
        }
    }

    pub async fn reflect(&self) {
        let channel = Self::connect(self.uri.clone(), self.verify_certs).await;
        let mut reflect_client = ServerReflectionClient::new(channel);
        let (tx, rx) = mpsc::channel(32);
        let rx_stream = ReceiverStream::new(rx);

        let reflect_stream = reflect_client
            .server_reflection_info(rx_stream)
            .await
            .unwrap();
        tx.send(ServerReflectionRequest {
            host: String::default(),
            message_request: Some(MessageRequest::ListServices("*".to_owned())),
        })
        .await
        .unwrap();
        let mut reflect_stream = reflect_stream.into_inner();
        let reflect_data = reflect_stream.next().await.unwrap().unwrap();
        let response = reflect_data.message_response.unwrap();
        if let MessageResponse::ListServicesResponse(services) = response {
            for service in services.service {
                tx.send(ServerReflectionRequest {
                    host: String::default(),
                    message_request: Some(MessageRequest::FileContainingSymbol(service.name)),
                })
                .await
                .unwrap();
                let reflect_data = reflect_stream.next().await.unwrap().unwrap();
                let response = reflect_data.message_response.unwrap();
                let mut pool = DescriptorPool::global();

                if let MessageResponse::FileDescriptorResponse(descriptors) = response {
                    for descriptor in descriptors.file_descriptor_proto {
                        let decoded = FileDescriptorProto::decode(&*descriptor).unwrap();

                        pool.add_file_descriptor_proto(decoded.clone()).unwrap();

                        println!("Name: {}", decoded.name());
                        println!("Options: {:?}", decoded.options);
                        println!("Package: {}", decoded.package());
                        println!("Enum types: {:#?}", decoded.enum_type);

                        println!("Message types");
                        for message_type in decoded.message_type {
                            println!("Message {:?}", message_type.name());
                            for field in message_type.field {
                                println!("{field:#?}");
                            }
                        }

                        println!("Dependencies");
                        for d in decoded.dependency {
                            println!("    {d}")
                        }
                        println!("Services");

                        for service in decoded.service {
                            for method in service.method {
                                println!("    {method:#?}");
                            }
                        }
                    }
                }

                for service in pool.services() {
                    for method in service.methods() {
                        make_template_message(method.input());
                    }
                }
            }
        }
    }

    pub async fn call(self, method: prost_reflect::MethodDescriptor, request: Request) -> Response {
        let path = PathAndQuery::from_str(&format!(
            "/{}/{}",
            method.parent_service().full_name(),
            method.name()
        ))
        .unwrap();

        match MethodKind::for_method(&method) {
            MethodKind::Unary => self.unary(&method, request, path).await,
            MethodKind::ClientStreaming => todo!(),
            MethodKind::ServerStreaming => todo!(),
            MethodKind::BidiStreaming => todo!(),
        }
    }

    async fn connect(uri: Uri, verify_certs: bool) -> Channel {
        let is_https = uri.scheme() == Some(&Scheme::HTTPS);
        let builder = Channel::builder(uri);

        if is_https && !verify_certs {
            static HTTPS_NO_VERIFY_CONNECTOR: Lazy<HttpsConnector<HttpConnector>> =
                Lazy::new(|| {
                    let mut http = HttpConnector::new();
                    http.enforce_http(false);
                    http.set_nodelay(true);

                    let rustls_config = rustls::ClientConfig::builder()
                        .with_safe_default_cipher_suites()
                        .with_safe_default_kx_groups()
                        .with_safe_default_protocol_versions()
                        .unwrap()
                        .with_custom_certificate_verifier(Arc::new(DangerousCertificateVerifier))
                        .with_no_client_auth();

                    HttpsConnectorBuilder::new()
                        .with_tls_config(rustls_config)
                        .https_only()
                        .enable_http2()
                        .wrap_connector(http)
                });

            builder
                .connect_with_connector(HTTPS_NO_VERIFY_CONNECTOR.clone())
                .await
                .unwrap()
        } else {
            builder.connect().await.unwrap()
        }
    }

    async fn unary(
        mut self,
        method: &prost_reflect::MethodDescriptor,
        request: Request,
        path: PathAndQuery,
    ) -> Response {
        self.grpc.ready().await.unwrap();
        self.grpc
            .unary(
                request.into_request(),
                path,
                DynamicCodec::new(method.clone()),
            )
            .await
            .unwrap()
            .into_inner()
    }
}

fn make_template_message(desc: MessageDescriptor) -> DynamicMessage {
    let mut message = DynamicMessage::new(desc);

    for field in message.descriptor().fields() {
        match message.get_field_mut(&field) {
            prost_reflect::Value::List(ref mut list) => {
                println!("list entry {:?}", field.kind());
                list.push(make_template_field(field.kind()));
            }
            prost_reflect::Value::Map(ref mut map) => {
                let kind = field.kind();
                let entry = kind.as_message().unwrap();
                println!(
                    "map entry {:?} {:?} {:?}",
                    field.kind(),
                    entry.map_entry_key_field().kind(),
                    entry.map_entry_value_field().kind()
                );

                let key = prost_reflect::MapKey::default_value(&entry.map_entry_key_field().kind());
                let value = make_template_field(entry.map_entry_value_field().kind());
                map.insert(key, value);
            }
            _ => (),
        }
    }

    message
}

fn make_template_field(kind: prost_reflect::Kind) -> prost_reflect::Value {
    match kind {
        prost_reflect::Kind::Message(message) => {
            prost_reflect::Value::Message(make_template_message(message))
        }
        kind => prost_reflect::Value::default_value(&kind),
    }
}

struct DangerousCertificateVerifier;

impl rustls::client::ServerCertVerifier for DangerousCertificateVerifier {
    fn verify_server_cert(
        &self,
        end_entity: &rustls::Certificate,
        intermediates: &[rustls::Certificate],
        server_name: &rustls::ServerName,
        scts: &mut dyn Iterator<Item = &[u8]>,
        ocsp_response: &[u8],
        now: SystemTime,
    ) -> Result<rustls::client::ServerCertVerified, rustls::Error> {
        Ok(rustls::client::ServerCertVerified::assertion())
    }

    fn verify_tls12_signature(
        &self,
        message: &[u8],
        cert: &rustls::Certificate,
        dss: &rustls::DigitallySignedStruct,
    ) -> Result<rustls::client::HandshakeSignatureValid, rustls::Error> {
        Ok(rustls::client::HandshakeSignatureValid::assertion())
    }

    fn verify_tls13_signature(
        &self,
        message: &[u8],
        cert: &rustls::Certificate,
        dss: &rustls::DigitallySignedStruct,
    ) -> Result<rustls::client::HandshakeSignatureValid, rustls::Error> {
        Ok(rustls::client::HandshakeSignatureValid::assertion())
    }
}
