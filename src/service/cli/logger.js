'use strict';

const chalk = require(`chalk`);

const logger = {
  help: (msg) => console.log(chalk.gray(msg)),
  info: (msg) => console.info(chalk.red(msg)),
  success: (msg) => console.log(chalk.green(msg)),
  error: (msg) => console.error(chalk.red(msg)),
  version: (versionNumber) => console.log(chalk.blue(versionNumber))
};

module.exports = logger;
