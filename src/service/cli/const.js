'use strict';

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const DEFAULT_COMMAND = `--help`;

const MAX_SENTENCES_AMOUNT = 5;
const MAX_ELEMENTS_AMOUNT = 1000;
const USER_ARGV_INDEX = 2;

const ExitCode = {
  ERROR: 1,
  SUCCESS: 0,
};

module.exports = {
  DEFAULT_COUNT,
  FILE_NAME,
  MAX_SENTENCES_AMOUNT,
  MAX_ELEMENTS_AMOUNT,
  USER_ARGV_INDEX,
  ExitCode,
  DEFAULT_COMMAND
};


