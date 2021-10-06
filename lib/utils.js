"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCHANGELOG = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
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
const PREFIX_ORDER = [
    "feat",
    "update",
    "fix",
    "refactor",
    "docs",
    "test",
    "clean",
    "chore",
];
function generateCHANGELOG(commits) {
    const result = {
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
    let md = `# <please insert tag version>(${(0, dayjs_1.default)().format("YYYY-MM-DD")})`;
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
exports.generateCHANGELOG = generateCHANGELOG;
