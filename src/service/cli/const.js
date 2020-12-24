'use strict';

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const DEFAULT_COMMAND = `--help`;
const DEFAULT_PORT = 3000;

const MAX_SENTENCES_AMOUNT = 5;
const MAX_ELEMENTS_AMOUNT = 1000;
const USER_ARGV_INDEX = 2;

const ExitCode = {
  ERROR: 1,
  SUCCESS: 0,
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

module.exports = {
  DEFAULT_COUNT,
  FILE_NAME,
  MAX_SENTENCES_AMOUNT,
  MAX_ELEMENTS_AMOUNT,
  USER_ARGV_INDEX,
  ExitCode,
  DEFAULT_COMMAND,
  DEFAULT_PORT,
  HttpCode
};


