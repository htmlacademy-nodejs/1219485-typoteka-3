'use strict';

const {Router} = require(`express`);
const categoryController = require(`../controllers/categories`);

const route = new Router();

module.exports = (app) => {
  app.use(`/categories`, route);

  route.get(`/`, categoryController.main);
};
