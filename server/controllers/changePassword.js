var api = require('../api/changePassword.js');

exports.post = function(request, response, next) {
  api.post({
    user: request.user,
    password: request.body.password,
    newPassword: request.body.newPassword
  }, function(err, model) {
    if (err) {
      return next(err);
    } else if (model.result === 'error') {
      return response.status(400).send(model);
    } else {
      request.user = model.user;
      return response.send({});
    }
  })
};