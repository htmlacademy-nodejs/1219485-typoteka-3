'use strict';

const {
  TITLES,
  SENTENCES,
  CATEGORIES,
  MAX_SENTENCES_AMOUNT,
} = require(`./const`);

const MAX_MONTHS_AMOUNT = 3;
const DAYS_PER_MONTH = 30;
const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;
const MILLISECONDS_PER_SECOND = 1000;

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

const shuffleCollection = (collection) => {
  for (let i = collection.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [collection[i], collection[randomPosition]] = [collection[randomPosition], collection[i]];
  }

  return collection;
};

const createCollection = (min, max, collection) => {
  const arraySize = getRandomInteger(min, max);
  const collectionItems = [];

  collectionItems.push(collection[getRandomInteger(min - 1, collection.length - 1)]);

  for (let i = 0; i < (arraySize - 1); i++) {
    let choice = collection[getRandomInteger(0, collection.length - 1)];

    if (collectionItems.includes(choice)) {
      i--;
    } else {
      collectionItems.push(choice);
    }
  }

  return collectionItems;
};

module.exports.generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInteger(0, TITLES.length - 1)],
    createdDate: formatDate(getPublicationDate()),
    announce: shuffleCollection(SENTENCES).slice(1, getRandomInteger(1, MAX_SENTENCES_AMOUNT)).join(` `),
    fullText: shuffleCollection(SENTENCES).slice(1, getRandomInteger(1, SENTENCES.length - 1)).join(` `),
    category: createCollection(1, CATEGORIES.length - 1, CATEGORIES),
  }))
);
