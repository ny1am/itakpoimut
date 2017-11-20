var passport = require('passport');
var url = require('url');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var validation = require('./validation.js');
var VARS = require('./variables.js');

var User = mongoose.model('User');

exports.logout = [
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
    var username = request.body.username;
    var password = request.body.password;
    User.findOne({username:username}).exec(function(err, user) {
      if (user && user.authenticate(password)) {
        const payload = {id: user._id};
        const token = jwt.sign(payload, VARS.sessionSecret);
        const userPublicData = {
          _id: user._id,
          fname: user.fname,
          lname: user.lname,
          picture_url: user.picture_url,
          roles: user.roles,
          provider: user.provider,
        };
        response.send({
          result: 'success', 
          token: token,
          user: userPublicData
        });
      } else {
        response.status(401).send({
          result: 'error',
          errors: {
            username: 'Неправильний пароль'
          }
        });
      }
    });
  },
];

exports.roleUser = function (request, response, next) {
  return passport.authenticate('jwt', { session: false }, function(err, user) {
    if (!user) {
      return response.status(401).send({
        result: 'dialog',
        template: 'pleaseSignup'
      });
    }
    request.login(user, function(err) {
      if (err) { return next(err); }
      next();
    });
  })(request, response, next);
};

exports.roleModerator = function (request, response, next) {
  return passport.authenticate('jwt', { session: false }, function(err, user) {
    if (!user || user.roles.indexOf('moderator') === -1) {
      return response.status(403).send({});
    }
    request.login(user, function(err) {
      if (err) { return next(err); }
      next();
    });
  })(request, response, next);
};

exports.roleAdmin = function (request, response, next) {
  return passport.authenticate('jwt', { session: false }, function(err, user) {
    if (!user || user.roles.indexOf('admin') === -1) {
      return response.status(403).send({});
    }
    request.login(user, function(err) {
      if (err) { return next(err); }
      next();
    });
  })(request, response, next);
};
