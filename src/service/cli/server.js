'use strict';

const express = require(`express`);
const routes = require(`../api`);
const logger = require(`./logger`);
const {
  DEFAULT_PORT,
  HttpCode,
  ExitCode,
  API_PREFIX
} = require(`./const`);

const app = express();
app.use(express.json());

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = parseFloat(customPort, 10) || DEFAULT_PORT;

    try {
      const router = await routes();
      app.use(API_PREFIX, router);
      app.use((req, res) => res.status(HttpCode.NOT_FOUND).send(`Not found`));

      app.listen(port, (err) => {
        if (err) {
          logger.error((`Ошибка при создании сервера`), err);
          process.exit(ExitCode.ERROR);
        }
        return logger.info(`Ожидаю соединений на ${port}`);
      });

    } catch (err) {
      logger.error(`Произошла ошибка: ${err.message}`);
      process.exit(ExitCode.ERROR);
    }
  }
};
