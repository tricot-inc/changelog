import dotenv from "dotenv";
import express from "express";
import ClientOAuth2 from "client-oauth2";
import EventEmitter from "events";
import consola from "consola";
import open from "open";

dotenv.config();

const emitter = new EventEmitter();
const auth = new ClientOAuth2({
  clientId: process.env.GITHUB_APP_CLIENT_ID,
  clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
  accessTokenUri: "https://github.com/login/oauth/access_token",
  authorizationUri: "https://github.com/login/oauth/authorize",
  redirectUri: process.env.REDIRECT_URL,
  scopes: ["repo"],
});

const app = express();
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

export function getTokenFromOAuth(): Promise<string> {
  const port = process.env.PORT || 5678;
  const server = app.listen(port);
  const loginURL = `http://localhost:${port}/login`;
  consola.log(`OAuth login with: ${loginURL}`);

  open(loginURL);

  return new Promise((resolve) => {
    emitter.on("done", () => {
      consola.log("Success Authentication!");
      server.close((err) => {
        consola.error(err);
      });

      resolve(token);
    });
  });
}
