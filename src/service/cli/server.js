'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;
const logger = require(`./logger`);
const {
  DEFAULT_PORT,
  HttpCode,
  FILE_NAME,
} = require(`./const`);

const app = express();
app.use(express.json());
app.get(`/posts`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_NAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    console.log(`We've got an error here, probably file is nonexistent or empty: ${err}`);
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

    app.listen(DEFAULT_PORT, () =>
      logger.success(`Ожидаю соединений на ${port}`)
    );
  }
};
