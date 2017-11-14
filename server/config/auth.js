var passport = require('passport');
var validation = require('./validation.js');
var rememberMe = require('./passport-remember-me.js');
var url = require('url');

function success(request, response) {
  return response.send({result: 'success'});
}

exports.logout = [
  rememberMe.clearCookieMiddleware,
  function out(req, res) {
    req.logout();
  }
];

exports.authenticate = [
  function validate(request, response, next) {
    var userData = request.body;
    if (!validation.validateEmail(userData.username)) {
      return response.send({
        result: 'error',
        errors: {
          username: 'Неправильний логін'
        }
      });
    } else {
      next();
    }
  },

  function auth(request, response, next) {
    passport.authenticate('local', function(err, user) {
      if (err) {
        return next(err);
      } else if (!user) {
        return response.send({
          result: 'error',
          errors: {
            password: 'Неправильний пароль'
          }
        });
      } else {
        request.login(user, function(err) {
          if (err) {
            return next(err);
          } else {
            next();
          }
        });
      }
    })(request, response, next);
  },
  rememberMe.addCookieMiddleware,
  success
];

exports.fbAuthenticate = passport.authenticate('facebook', { scope: 'email'});

exports.fbAuthenticateCb = [
  passport.authenticate('facebook', {failureRedirect: '/login' }),
  success
];

exports.googleAuthenticate = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleAuthenticateCb = [
  passport.authenticate('google', {failureRedirect: '/login' }),
  success
];

exports.roleUser = function (request, response, next) {
  if (!request.user) {
    return response.send({result: 'dialog', template: 'pleaseSignup'});
  } else {
    next();
  }
};

exports.roleModerator = function (request, response, next) {
  if (!request.user || request.user.roles.indexOf('moderator') === -1) {
    return response.status(401).send({});
  } else {
    next();
  }
};

exports.roleAdmin = function (request, response, next) {
  if (!request.user || request.user.roles.indexOf('admin') === -1) {
    return response.status(401).send({});
  } else {
    next();
  }
};