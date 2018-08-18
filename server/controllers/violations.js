//todo i18n
var violations = require('../../shared/js/violations.js');

exports.get = function (request, response, next) {
  return response.send(violations.list());
};