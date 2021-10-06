import consola from "consola";
import { compare, createGitHubClient } from "./github";
import { generateCHANGELOG, PREFIX } from "./utils";

type Args = [string, string];

interface Options {
  token?: string;
}

export async function action(args: Args, options: Options) {
  if (args.length !== 2) {
    consola.fatal(
      "Specify as <organization/repo> <target branch or tag>\nfor example: tricot-inc/changelog v0.0.0"
    );
    return;
  }

  // auto load from GITHUB_TOKEN
  if (process.env.GITHUB_TOKEN != null) {
    options.token = process.env.GITHUB_TOKEN;
  }

  if (options?.token == null) {
    consola.error("Can not find GitHub token");
    return;
  }

  const [orgAndRepo, target] = args;
  const [owner, repo] = orgAndRepo.split("/");

  const client = createGitHubClient(options.token);
  const result = await compare(client, {
    owner,
    repo,
    target,
  });

  const messages = result.data.commits.map((item) => {
    const raw = item.commit.message;
    const message = raw.split("\n")[0];
    const [prefix, body] = message.split(":");

    return {
      prefix: prefix as PREFIX,
      body: body.slice(1, body.length),
      author: item.author?.login ?? "",
    };
  });

  generateCHANGELOG(messages);
}
