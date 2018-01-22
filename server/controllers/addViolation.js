var api = require('../api/addViolation.js');

exports.post = function (request, response, next) {
  var data = request.body;
  var proposedValues = data.selectedViolations;
  api.post({
    selectedViolations: data.selectedViolations,
    company_id: data.company_id,
    user_id: request.user_id
  }, function(err, model) {
    if (err) {
      return next(err);
    } else if (model.result === 'error') {
      return response.status(400).send(model);
    } else {
      return response.send({result: 'success'});
    }
  });
};