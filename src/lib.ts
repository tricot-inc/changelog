#!/usr/bin/env node
import { program } from "commander";
import { action } from "./command";

program
  .argument(
    "<args...>",
    "Repository and target tag or branch.\nex: tricot-inc/changelog <tag>"
  )
  .option("--token <token>", "GitHub Token")
  .action(action);

program.parse(process.argv);
