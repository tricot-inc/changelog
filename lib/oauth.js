"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenFromOAuth = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const client_oauth2_1 = __importDefault(require("client-oauth2"));
const events_1 = __importDefault(require("events"));
const consola_1 = __importDefault(require("consola"));
const open_1 = __importDefault(require("open"));
dotenv_1.default.config();
const emitter = new events_1.default();
const auth = new client_oauth2_1.default({
    clientId: process.env.GITHUB_APP_CLIENT_ID,
    clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
    accessTokenUri: "https://github.com/login/oauth/access_token",
    authorizationUri: "https://github.com/login/oauth/authorize",
    redirectUri: process.env.REDIRECT_URL,
    scopes: ["repo"],
});
const app = (0, express_1.default)();
let token = "";
app.get("/login", (_, res) => {
    const uri = auth.code.getUri();
    res.redirect(uri);
});
app.get("/oauth", async (req, res) => {
    const user = await auth.code.getToken(req.originalUrl);
    token = user.accessToken;
    emitter.emit("done");
    res.send("<h1>Success Authentication! Please close this window 🎉</h1>");
});
function getTokenFromOAuth() {
    const port = process.env.PORT || 5678;
    const server = app.listen(port);
    const loginURL = `http://localhost:${port}/login`;
    (0, open_1.default)(loginURL);
    return new Promise((resolve) => {
        emitter.on("done", () => {
            server.close((err) => {
                consola_1.default.error(err);
            });
            resolve(token);
        });
    });
}
exports.getTokenFromOAuth = getTokenFromOAuth;
