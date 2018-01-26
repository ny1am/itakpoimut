var api = require('../api/newCompanies.js');

exports.get = function (request, response, next) {
  api.get(function(err, model) {
    if (err) {
      return next(err);
    } else {
      return response.send(model);
    }
  });
};