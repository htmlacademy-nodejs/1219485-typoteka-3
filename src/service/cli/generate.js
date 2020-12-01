'use strict';

const fs = require(`fs`);

const {
  DEFAULT_COUNT,
  FILE_NAME
} = require(`./const`);

const {
  generateOffers
} = require(`./utils`);

module.exports = {
  name: `--generate`,
  // eslint-disable-next-line consistent-return
  run(argv) {
    const [count] = argv;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer < 1000) {
      const content = JSON.stringify(generateOffers(countOffer));

      fs.writeFile(FILE_NAME, content, (err) => {
        if (err) {
          return console.error(`Can't write data to file...`);
        }
        return console.log(`Operation success. File created.`);
      });
    } else {
      return console.info(`Не больше 1000 публикаций`);
    }
  }
};
