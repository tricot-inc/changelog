import dayjs from "dayjs";

// ref: prefix: https://github.com/tricot-inc/kamui/blob/main/CONTRIBUTING.md#type
const PREFIX_TITLE = {
  feat: "Features",
  update: "Updates",
  fix: "Bug Fixed",
  docs: "Documents",
  refactor: "Refactorings",
  test: "Tests",
  clean: "Clean up",
  chore: "Other",
};

export type PREFIX = keyof typeof PREFIX_TITLE;

const PREFIX_ORDER: PREFIX[] = [
  "feat",
  "update",
  "fix",
  "refactor",
  "docs",
  "test",
  "clean",
  "chore",
];

interface Commit {
  author: string;
  prefix: PREFIX;
  body: string;
}
export function generateCHANGELOG(commits: Commit[]) {
  const result: { [key in PREFIX]: string[] } = {
    feat: [],
    update: [],
    fix: [],
    docs: [],
    refactor: [],
    test: [],
    clean: [],
    chore: [],
  };

  for (const commit of commits) {
    result[commit.prefix].push(`${commit.body} - [@${commit.author}](https://github.com/${commit.author})`);
  }

  let md = `# <please insert tag version>(${dayjs().format("YYYY-MM-DD")})`;

  for (const prefix of PREFIX_ORDER) {
    if (result[prefix].length === 0) {
      continue;
    }

    md += "\n\n";
    md += "## " + PREFIX_TITLE[prefix] + "\n\n";
    md += "- " + result[prefix].join("\n- ");
  }

  console.log(md);
}
