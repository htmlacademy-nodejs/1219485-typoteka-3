'use strict';

const fs = require(`fs`).promises;
const logger = require(`./logger`);

const {
  DEFAULT_COUNT,
  FILE_NAME,
  MAX_ELEMENTS_AMOUNT,
  ExitCode
} = require(`./const`);

const {
  generateOffers,
  readContent
} = require(`./utils`);

const FILE_SENTENCES_PATH = `./src/data/sentences.txt`;
const FILE_CATEGORIES_PATH = `./src/data/categories.txt`;
const FILE_TITLES_PATH = `./src/data/titles.txt`;
const FILE_COMMENTS_PATH = `./src/data/comments.txt`;

module.exports = {
  name: `--generate`,
  async run(argv) {
    const [count] = argv;
    const countOffer = parseFloat(count) || DEFAULT_COUNT;

    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);

    if (!(countOffer < MAX_ELEMENTS_AMOUNT)) {
      logger.info(`Не больше 1000 публикаций`);
      process.exit(ExitCode.ERROR);
    }

    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences, comments));

    try {
      await fs.writeFile(FILE_NAME, content);
      logger.success(`Operation success. File created.`);
    } catch (err) {
      logger.error(`Can't write data to file...`);
    }
  },
};
