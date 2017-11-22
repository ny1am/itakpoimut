var api = require('../api/addCompany.js');
var upload = require('../config/upload.js');


exports.get = function (request, response) {
  api.get({}, function(err, model) {
    return response.send(model);
  });
};

exports.post = function (request, response, next) {
  upload.company(request, response, function(err) {
    api.post({
      userId: request.user._id,
      title: request.body.title,
      company_site: request.body.company_site,
      description: request.body.description,
      selectedViolations: request.body.selectedViolations,
      selectedCategories: request.body.selectedCategories,
      logoFile: request.file
    }, function(err, model) {
      if (err) {
        return next(err);
      } else if (model.result === 'error') {
        return response.send(model);
      } else {
        return response.send({ result: 'success' });
      }
    });
  });
};