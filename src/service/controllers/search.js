'use strict';

const {HttpCode} = require(`../cli/const`);

exports.main = (req, res, service) => {
  const {query = ``} = req.query;

  if (!query) {
    res.status(HttpCode.BAD_REQUEST).json([]);
    return;
  }

  res.status(HttpCode.OK).json(service.findAll(query));
};
