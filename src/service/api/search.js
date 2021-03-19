'use strict';

const {Router} = require(`express`);
const searchController = require(`../controllers/search`);

const route = new Router();

module.exports = (app) => {
  app.use(`/search`, route);

  route.get(`/`, searchController.main);
};
