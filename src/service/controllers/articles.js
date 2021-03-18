'use strict';

const {HttpCode} = require(`../cli/const`);

exports.main = (req, res, articleService) => {
  const posts = articleService.findAll();

  return res.status(HttpCode.OK).json(posts);
};

exports.articleId = (req, res) => {
  const {post} = res.locals;

  return res.status(HttpCode.OK).json(post);
};

exports.update = (req, res, articleService) => {
  const {articleId} = req.params;

  const updatedPost = articleService.update(articleId, req.body);

  return res.status(HttpCode.OK).json(updatedPost);
};

exports.delete = (req, res, articleService) => {
  const {articleId} = req.params;
  const deletedPost = articleService.delete(articleId);

  if (!deletedPost) {
    return res.status(HttpCode.NOT_FOUND).send(`Post with ${articleId} not found`);
  }

  return res.status(HttpCode.OK).json(deletedPost);
};

exports.add = (req, res, articleService) => {
  const post = articleService.add(req.body);

  return res.status(HttpCode.CREATED).json(post);
};

