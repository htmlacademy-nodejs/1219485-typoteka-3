'use strict';

const {HttpCode} = require(`../cli/const`);


exports.main = (req, res, commentService) => {
  const {post} = res.locals;
  const comments = commentService.findAll(post);

  return res.status(HttpCode.OK).json(comments);
};

exports.delete = (req, res, commentService) => {
  const {post} = res.locals;
  const {commentId} = req.params;
  const deletedComment = commentService.delete(post, commentId);

  if (!deletedComment) {
    return res.status(HttpCode.NOT_FOUND).send(`Comment with ${commentId} not found`);
  }

  return res.status(HttpCode.OK).json(deletedComment);
};

exports.create = (req, res, commentService) => {
  const {post} = res.locals;
  const comment = commentService.create(post, req.body);

  return res.status(HttpCode.CREATED).json(comment);
};

