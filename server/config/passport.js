var _ = require('lodash');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require('passport-jwt');
var mongoose = require('mongoose');
var VARS = require('./variables.js');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var User = mongoose.model('User');

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = VARS.sessionSecret;

module.exports = function(app) {

  var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    User.findOne({_id: jwt_payload.id}).exec(function(err, user) {
      if (user) {
        return next(null, user);
      } else {
        return next(null, false);
      }
    });
  });

  passport.serializeUser(function(user, done) {
    if (user) {
      done(null, user._id);
    }
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({_id: id}).exec(function(err, user) {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });


  passport.use(strategy);

  app.use(passport.initialize());

}
