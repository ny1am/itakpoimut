var api = require('../api/userSignup.js');

exports.post = [
  function create(request, response, next) {
    api.post(request.body, function(err, model) {
      if (err) {
        return next(err);
      } else if (model.result === 'error') {
        return response.status(400).send(model);
      } else {
        user = model.user;
        request.login(user, function(err) {
          if (err) {
            return next(err);
          } else {
            next();
          }
        });
      }
    });
  },

  function result(request, response) {
    return response.send({result: 'success'});
  }
];