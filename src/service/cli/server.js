'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;
const logger = require(`./logger`);
const {
  DEFAULT_PORT,
  HttpCode,
  FILE_NAME,
  ExitCode
} = require(`./const`);

const app = express();
app.use(express.json());
app.get(`/posts`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_NAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
    res.json([]);
  }
});

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = parseFloat(customPort, 10) || DEFAULT_PORT;

    app.listen(port, (err) => {
      if (err) {
        logger.error(`Ошибка при создании сервера`, err);
        process.exit(ExitCode.ERROR);
      }

      logger.success(`Ожидаю соединений на ${port}`);
    });
  }
};
