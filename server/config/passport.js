var mongoose = require('mongoose');
var _ = require('lodash');
var passport = require('passport');
var LocalStategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = mongoose.model('User');
var VARS = require('./variables.js');
var userService = require('../services/user.js');

module.exports = function(app) {

  passport.use(new LocalStategy(
    function(username, password, done) {
      User.findOne({username:username}).exec(function(err, user) {
        if (user && user.authenticate(password)) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  ));

  passport.use(new FacebookStrategy(
    {
      clientID: VARS.facebook.clientID,
      clientSecret: VARS.facebook.clientSecret,
      callbackURL: VARS.baseUrl + "/auth/facebook/callback",
      profileFields: ['id', 'first_name', 'last_name', 'email', 'picture.type(large)']
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({facebook_id:profile.id}).exec(function(err, user) {
        if (user) {
          return done(null, user);
        } else {
          userService.createFbUser(profile, done);
        }
      });
    }
  ));

  passport.use(new GoogleStrategy({
    clientID: VARS.google.clientID,
    clientSecret: VARS.google.clientSecret,
    callbackURL: VARS.baseUrl + "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({google_id:profile.id}).exec(function(err, user) {
      if (user) {
        return done(null, user);
      } else {
        userService.createGoogleUser(profile, done);
      }
    });
  }
  ));

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

  app.use(passport.initialize());
  app.use(passport.session());
  require('./passport-remember-me.js').setup(app);

  app.use(function(request, response, next) {
    var _render = response.render;
    response.render = function(view, model, callback) {
      var _model = {};
      _.extend(_model, model, {loggedUser: request.user});
      _render.call(this, view, _model, callback);
    }
    next();
  });

}