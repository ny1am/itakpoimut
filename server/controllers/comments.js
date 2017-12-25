var api = require('../api/comments.js');


exports.get = function(request, response, next) {
  api.get({
    companyId: request.params.id,
    currentPage: request.query.currentPage?parseInt(request.query.currentPage):1
  }, function(err, model) {
    if (err) {
      return next(err);
    } else {
      return response.send(model);
    }
  });
};