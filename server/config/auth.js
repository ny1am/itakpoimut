var passport = require('passport');
var url = require('url');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var request = require('request');
var validation = require('./validation.js');
var VARS = require('./variables.js');
var userPublicData = require('../utils/userPublicData');
var userService = require('../services/user.js');

var User = mongoose.model('User');

exports.logout = [
  function out(req, res) {
    req.logout();
  }
];

const tokenModel = (user) => {
  const payload = {id: user._id};
  const token = jwt.sign(payload, VARS.sessionSecret);
  return {
    result: 'success', 
    token: token,
    user: userPublicData(user)
  };
}

exports.authenticate = [
  function validate(request, response, next) {
    var userData = request.body;
    if (!validation.validateEmail(userData.username)) {
      return response.status(401).send({
        result: 'error',
        errors: {
          username: 'LOGIN_USERNAME'
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
        response.send(tokenModel(user));
      } else {
        response.status(401).send({
          result: 'error',
          errors: {
            username: 'LOGIN_PASSWORD'
          }
        });
      }
    });
  },
];

exports.facebookAuth = function(request, response, next) {
  var socialToken = request.body.socialToken;
  const done = (user) => {
    if (user) {
      return response.send(tokenModel(user));
    } else {
      return response.status(401).send({
        result: 'error',
        errors: {
          global: 'LOGIN_COULDNT_CREATE'
        }
      });
    }
  }
  validateWithProvider(socialToken).then(function (profile) {
    User.findOne({facebook_id:profile.id}).exec(function(err, user) {
        if (user) {
          return done(user);
        } else {
          userService.createFbUser(profile, done);
        }
      });
  }).catch(function (err) {
    response.status(401).send({
      result: 'error',
      errors: {
        global: 'LOGIN_COULDNT_CREATE'
      }
    });
  });

}

function validateWithProvider(socialToken) {
  return new Promise(function (resolve, reject) {
    // Send a GET request to Facebook with the token as query string
    request({
        url: 'https://graph.facebook.com/me',
        qs: {access_token: socialToken, fields: 'id,first_name,last_name,email,picture.type(large)'}
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(JSON.parse(body));
        } else {
          reject(error);
        }
      }
    );
  });
}

exports.googleAuth = function(request, response, next) {
  var socialToken = request.body.socialToken;
  const done = (user) => {
    if (user) {
      return response.send(tokenModel(user));
    } else {
      return response.status(401).send({
        result: 'error',
        errors: {
          global: 'LOGIN_COULDNT_CREATE'
        }
      });
    }
  }
  validateWithGoogleProvider(socialToken).then(function (profile) {
    User.findOne({google_id:profile.id}).exec(function(err, user) {
        if (user) {
          return done(user);
        } else {
          userService.createGoogleUser(profile, done);
        }
      });
  }).catch(function (err) {
    response.status(401).send({
      result: 'error',
      errors: {
        global: 'LOGIN_COULDNT_CREATE'
      }
    });
  });

}

function validateWithGoogleProvider(socialToken) {
  return new Promise(function (resolve, reject) {
    request({
        url: 'https://www.googleapis.com/plus/v1/people/me',
        qs: {access_token: socialToken}
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(JSON.parse(body));
        } else {
          reject(error);
        }
      }
    );
  });
}

exports.roleUser = function (request, response, next) {
  return passport.authenticate('jwt', { session: false }, function(err, user) {
    if (!user) {
      return response.status(401).send({});
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
