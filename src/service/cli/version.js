'use strict';

const {blue} = require(`chalk`);
const packageJsonFile = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    const version = packageJsonFile.version;
    version.showInfo(version, blue);
  }
};
