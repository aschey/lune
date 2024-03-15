// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use grpc_client::Client;

mod codec;
mod grpc;
mod grpc_client;
mod metadata;

#[tokio::main]
async fn main() {
    // specta::export::ts("../src/bindings.ts").unwrap();
    // let client = Client::new("http://localhost:5051".parse().unwrap(), false).await;
    // client.reflect().await;

    tauri::Builder::default()
        //.invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
