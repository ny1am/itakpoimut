var api = require('../api/addComment.js');
var companyAPI = require('../api/company.js');

exports.post = function(request, response, next) {
  api.post({
    userId: request.user._id,
    companyId: request.body._company,
    commentText: request.body.text
  }, function(err, model) {
    if (err) {
      return next(err);
    } else {
      var comment = model.comment;
      companyAPI.get({
        companyId: comment._company
      }, function(err, companyModel) {
        if (err) {
          return next(err);
        } else {
          return response.send(companyModel);
        }
      });
    }
  });
};