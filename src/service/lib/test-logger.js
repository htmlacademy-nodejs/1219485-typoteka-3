'use strict';

const pino = require(`pino`);
const path = require(`path`);

const LOG_FILE = path.join(__dirname, `logs`, `test.log`);

const logger = pino({
  name: `test-logger`,
  level: `debug`,
}, pino.destination(LOG_FILE));

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
