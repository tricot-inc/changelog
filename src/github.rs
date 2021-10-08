use octocrab::Octocrab;
use serde::Deserialize;

pub struct GitHub {
    client: Octocrab,
}

#[derive(Deserialize)]
pub struct Author {
    name: String
}


#[derive(Deserialize)]
pub struct Commit {
    author: Author,
    message: String,
}

impl GitHub {
    pub fn new(token: String) -> GitHub {
        match Octocrab::builder().personal_token(token).build() {
            Ok(client) => GitHub { client },
            Err(e) => panic!(e),
        }
    }
}

pub struct ComparePayload {
    pub owner: String,
    pub repo: String,
    pub target: String,
}

#[derive(Deserialize)]
struct CompareResponseCommit {
    commit: Commit
}

#[derive(Deserialize)]
struct CompareResponse {
    commits: Vec<CompareResponseCommit>,
}
pub async fn compare(github: GitHub, payload: ComparePayload) {
    let request_url = format!("https://api.github.com/repos/{}/{}/compare/main...v2.2.0", payload.owner, payload.repo);

    if let Ok(result) = github.client._get(request_url, None::<&()>).await {
        if let Ok(response) = result.json::<CompareResponse>().await {
            for commit in response.commits {
                println!("{}", commit.commit.message);
            }
        }
    }
}
