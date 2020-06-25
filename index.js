#!/usr/bin/env node

const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const { file } = require("vfile-message");

const { lstat } = fs.promises;

fs.readdir(process.cwd(), async (err, filenames) => {
  // EITHER
  // err === an error object, which means something went wronge
  // OR
  // err === null, which means everything is OK

  if (err) {
    // error handling code here
    console.log(err);
  }

  const statPromises = filenames.map((filename) => {
    return lstat(filename);
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(filenames[index]);
    } else {
      console.log(chalk.bold(filenames[index]));
    }
  }
});
