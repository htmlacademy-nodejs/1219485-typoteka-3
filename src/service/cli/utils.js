'use strict';

const MAX_SENTENCES_AMOUNT = require(`./const`);

const logger = require(`./logger`);
const fs = require(`fs`).promises;
const {nanoid} = require(`nanoid`);

const MAX_MONTHS_AMOUNT = 3;
const DAYS_PER_MONTH = 30;
const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;
const MILLISECONDS_PER_SECOND = 1000;
const MAX_ID_LENGTH = 6;
const MAX_COMMENTS = 4;

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, `0`);
  const month = date.getMonth().toString().padStart(2, `0`);
  const year = date.getFullYear().toString();
  const hour = date.getHours().toString().padStart(2, `0`);
  const minutes = date.getMinutes().toString().padStart(2, `0`);
  const seconds = date.getSeconds().toString().padStart(2, `0`);

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
};

const getPublicationDate = () => {
  const currentDate = new Date();
  const startDate = currentDate - (MAX_MONTHS_AMOUNT * DAYS_PER_MONTH * HOURS_PER_DAY *
    MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND);

  const publicationDate = new Date(startDate + Math.random() * (currentDate - startDate));

  return publicationDate;
};

const shuffleCollection = (items) => {
  for (let i = items.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [items[i], items[randomPosition]] = [items[randomPosition], items[i]];
  }

  return items;
};

const createCollection = (min, max, items) => {
  const arraySize = getRandomInteger(min, max);
  const chosenItems = [];

  chosenItems.push(items[getRandomInteger(min - 1, items.length - 1)]);

  for (let i = 0; i < (arraySize - 1); i++) {
    let choice = items[getRandomInteger(0, items.length - 1)];

    if (chosenItems.includes(choice)) {
      i--;
    } else {
      chosenItems.push(choice);
    }
  }

  return chosenItems;
};

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffleCollection(comments)
      .slice(0, getRandomInteger(1, 3))
      .join(` `),
  }))
);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    logger.error(err);
    return [];
  }
};

const generateOffers = (count, titles, categories, sentences, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    title: titles[getRandomInteger(0, titles.length - 1)],
    createdDate: formatDate(getPublicationDate()),
    announce: shuffleCollection(sentences).slice(1, getRandomInteger(1, MAX_SENTENCES_AMOUNT)).join(` `),
    fullText: shuffleCollection(sentences).slice(1, getRandomInteger(1, sentences.length - 1)).join(` `),
    category: createCollection(1, categories.length - 1, categories),
    comments: generateComments(getRandomInteger(1, MAX_COMMENTS), comments)
  }))
);

module.exports = {
  readContent,
  generateOffers,
};
