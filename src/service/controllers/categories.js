'use strict';

const {HttpCode} = require(`../cli/const`);

exports.main = (req, res, service) => {
  const categories = service.findAll();
  res.status(HttpCode.OK).json(categories);
};
