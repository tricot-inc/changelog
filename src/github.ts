import { Octokit } from "@octokit/rest";

export function createGitHubClient(token: string): Octokit {
  const client = new Octokit({
    auth: token,
  });

  return client;
}

interface ComparePayload {
  owner: string;
  repo: string;
  target: string;
}
export async function compare(client: Octokit, payload: ComparePayload) {
  const result = await client.rest.repos.compareCommits({
    owner: payload.owner,
    repo: payload.repo,
    base: payload.target,
    head: "main",
  });

  return result;
}
