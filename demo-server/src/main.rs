use foobar::{
    foobar_server::{Foobar, FoobarServer},
    AFooRequest, AFooResponse, BarRequest, BarResponse, BazRequest, BazResponse, EmptyRequest,
    EmptyResponse, FooRequest, FooResponse, SingleOneofRequest, SingleOneofResponse,
    WellKnownRequest, WellKnownResponse,
};
use tonic::{transport::Server, Request, Response, Status};

pub mod foobar {
    tonic::include_proto!("foobar");

    pub(crate) const FILE_DESCRIPTOR_SET: &[u8] =
        tonic::include_file_descriptor_set!("rpc_descriptor");
}

#[derive(Default)]
pub struct FoobarService {}

#[tonic::async_trait]
impl Foobar for FoobarService {
    async fn foo(&self, request: Request<FooRequest>) -> Result<Response<FooResponse>, Status> {
        todo!()
    }

    async fn a_foo(&self, request: Request<AFooRequest>) -> Result<Response<AFooResponse>, Status> {
        todo!()
    }

    async fn bar(&self, request: Request<BarRequest>) -> Result<Response<BarResponse>, Status> {
        todo!()
    }

    async fn baz(&self, request: Request<BazRequest>) -> Result<Response<BazResponse>, Status> {
        todo!()
    }

    async fn empty(
        &self,
        request: Request<EmptyRequest>,
    ) -> Result<Response<EmptyResponse>, Status> {
        todo!()
    }

    async fn well_known(
        &self,
        request: Request<WellKnownRequest>,
    ) -> Result<Response<WellKnownResponse>, Status> {
        todo!()
    }

    async fn single_oneof(
        &self,
        request: Request<SingleOneofRequest>,
    ) -> Result<Response<SingleOneofResponse>, Status> {
        todo!()
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let reflect_service = tonic_reflection::server::Builder::configure()
        .register_encoded_file_descriptor_set(foobar::FILE_DESCRIPTOR_SET)
        .build()
        .unwrap();

    let addr = "0.0.0.0:5051".parse().unwrap();
    let service = FoobarService::default();

    Server::builder()
        .add_service(reflect_service)
        .add_service(FoobarServer::new(service))
        .serve(addr)
        .await?;

    Ok(())
}
