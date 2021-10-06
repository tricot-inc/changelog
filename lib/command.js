"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = void 0;
const consola_1 = __importDefault(require("consola"));
const github_1 = require("./github");
const oauth_1 = require("./oauth");
const utils_1 = require("./utils");
async function action(args, options) {
    if (args.length !== 2) {
        consola_1.default.fatal("Specify as <organization/repo> <target branch or tag>\nfor example: tricot-inc/changelog v0.0.0");
        return;
    }
    // auto load from GITHUB_TOKEN
    if (process.env.GITHUB_TOKEN != null) {
        options.token = process.env.GITHUB_TOKEN;
    }
    if ((options === null || options === void 0 ? void 0 : options.token) == null) {
        options.token = await (0, oauth_1.getTokenFromOAuth)();
    }
    const [orgAndRepo, target] = args;
    const [owner, repo] = orgAndRepo.split("/");
    const client = (0, github_1.createGitHubClient)(options.token);
    const result = await (0, github_1.compare)(client, {
        owner,
        repo,
        target,
    });
    const messages = result.data.commits.map((item) => {
        var _a, _b;
        const raw = item.commit.message;
        const message = raw.split("\n")[0];
        const [prefix, body] = message.split(":");
        return {
            prefix: prefix,
            body: body.slice(1, body.length),
            author: (_b = (_a = item.author) === null || _a === void 0 ? void 0 : _a.login) !== null && _b !== void 0 ? _b : "",
        };
    });
    (0, utils_1.generateCHANGELOG)(messages);
    process.exit(0);
}
exports.action = action;
