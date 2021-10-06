"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.createGitHubClient = void 0;
const rest_1 = require("@octokit/rest");
function createGitHubClient(token) {
    const client = new rest_1.Octokit({
        auth: token,
    });
    return client;
}
exports.createGitHubClient = createGitHubClient;
async function compare(client, payload) {
    const result = await client.rest.repos.compareCommits({
        owner: payload.owner,
        repo: payload.repo,
        base: payload.target,
        head: "main",
    });
    return result;
}
exports.compare = compare;
