var api = require('../api/forgotPassword.js');

exports.post = function(req, res, next) {
  api.post({
    email: req.body.email
  }, function(err, model) {
    if (err) {
      return next(err);
    } else if (model.result === 'error') {
      return res.status(400).send(model);
    } else {
      return res.send({});
    }
  });
};