"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const command_1 = require("./command");
commander_1.program
    .argument("<args...>", "Repository and target tag or branch.\nex: tricot-inc/changelog <tag>")
    .option("--token <token>", "GitHub Token")
    .action(command_1.action);
commander_1.program.parse(process.argv);
