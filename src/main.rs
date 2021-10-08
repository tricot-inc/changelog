#[macro_use]
extern crate clap;
extern crate chrono;
extern crate octocrab;
extern crate serde;
extern crate serde_json;

use std::env;

mod github;
mod cli;

#[tokio::main]
async fn main() {
    let matches = cli::build_cli();

    let mut values = matches.values_of("args").unwrap();
    let input_token = matches.value_of("token");

    let (length, _) = values.size_hint();
    if length > 3 {
        eprintln!("Specify as <organization/repo> <target branch or tag>\nfor example: tricot-inc/changelog v0.0.0")
    }

    let org_and_repo = values.next().unwrap();
    let target = values.next();
    let mut token: Option<String> = None;

    // 引数に受けた token があればいれる
    if let Some(t) = input_token {
        token = Some(t.to_string());
    }

    // token を指定していない場合、GITHUB_TOKEN を参照する
    if input_token.is_none() {
        token = Some(env::var("GITHUB_TOKEN").expect("GITHUB_TOKEN env variable is required"));
    }

    let mut v = org_and_repo.split("/");
    let owner = v.next().unwrap();
    let repo = v.next().unwrap();
    let client = github::GitHub::new(token.unwrap());
    let compare_payload: github::ComparePayload = github::ComparePayload {
        owner: owner.to_string(),
        repo: repo.to_string(),
        target: target.unwrap().to_string(),
    };

    github::compare(client, compare_payload).await;
}
