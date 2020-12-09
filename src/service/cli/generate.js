'use strict';

const fs = require(`fs`).promises;
const {logger} = require(`./logger`);

const {
  DEFAULT_COUNT,
  FILE_NAME,
  MAX_ELEMENTS_AMOUNT,
  ExitCode
} = require(`./const`);

const {
  generateOffers
} = require(`./utils`);

module.exports = {
  name: `--generate`,
  async run(argv) {
    const [count] = argv;
    const countOffer = parseFloat(count) || DEFAULT_COUNT;

    if (!(countOffer < MAX_ELEMENTS_AMOUNT)) {
      logger.info(`Не больше 1000 публикаций`);
      process.exit(ExitCode.ERROR);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    try {
      await fs.writeFile(FILE_NAME, content);
      logger.success(`Operation success. File created.`);
    } catch (err) {
      logger.error(`Can't write data to file...`);
    }
  },
};
