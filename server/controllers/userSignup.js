var api = require('../api/userSignup.js');
var rememberMe = require('../config/passport-remember-me.js');

exports.post = [
  function create(request, response, next) {
    api.post(request.body, function(err, model) {
      if (err) {
        return next(err);
      } else if (model.result === 'error') {
        return response.send(model);
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

  rememberMe.addCookieMiddleware,

  function result(request, response) {
    return response.send({result: 'success'});
  }
];