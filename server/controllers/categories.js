var categories = require('../../shared/js/categories.js');

exports.get = function (request, response, next) {
  return response.send(categories.list());
};