'use strict';

const {Router} = require(`express`);
const commentValidator = require(`../middlewares/comment-validator`);
const commentsController = require(`../controllers/comments`);

module.exports = () => {
  const route = new Router({mergeParams: true});

  route.get(`/`, commentsController.main);

  route.delete(`/:commentId`, commentsController.delete);

  route.post(`/`, commentValidator, commentsController.create);

  return route;
};
