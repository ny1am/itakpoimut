var api = require('../api/addComment.js');

exports.post = function(request, response, next) {
  api.post({
    userId: request.user._id,
    companyId: request.body._company,
    commentText: request.body.text
  }, function(err, model) {
    if (err) {
      return next(err);
    } else {
      return response.send(model.comment);
    }
  });
};