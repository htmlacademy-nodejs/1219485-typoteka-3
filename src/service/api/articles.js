'use strict';

const {Router} = require(`express`);
const articleExists = require(`../middlewares/article-exists`);
const articleValidator = require(`../middlewares/article-validator`);
const articleController = require(`../controllers/articles`);

const route = new Router();

module.exports = (app, articleService, commentsRouter) => {
  app.use(`/articles`, route);

  route.get(`/`, articleController.main);

  route.get(`/:articleId`, articleExists(articleService), articleController.articleId);

  route.post(`/`, articleValidator, articleController.add);

  route.put(`/:articleId`, [articleExists(articleService), articleValidator], articleController.update);

  route.delete(`/:articleId`, articleController.delete);

  route.use(`/:articleId/comments`, articleExists(articleService), commentsRouter);
};
