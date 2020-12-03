'use strict';

const fs = require(`fs`);

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
  run(argv) {
    const [count] = argv;
    const countOffer = parseFloat(count) || DEFAULT_COUNT;

    if (!(countOffer < MAX_ELEMENTS_AMOUNT)) {
      console.info(`Не больше 1000 публикаций`);
      process.exit(ExitCode.ERROR);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.log(`Operation success. File created.`);
    });
  }
};

