var async = require('async');
var _ = require('lodash');
var validation = require('../config/validation');
var encryption = require('../utils/encryption');
var User = require('mongoose').model('User');
var sparkpost = require('../config/sparkpost');

exports.post = function(params, callback) {
  var userData = {
    fname: params.fname,
    lname: params.lname,
    email: params.email,
    password: params.password,
    username: params.email,
    provider: 'local'
  }
  async.waterfall([
    function prepare(next) {
      userData.fname = _.trim(userData.fname);
      userData.lname = _.trim(userData.lname);
      userData.email = _.trim(userData.email);
      userData.password = _.trim(userData.password);
      next();
    },
    function validate(next) {
      var errors = {};
      var hasErrors = false;
      if(userData.fname === '') {
        errors.fname = 'Введіть ім\'я';
        hasErrors = true;
      }
      if(userData.lname === '') {
        errors.lname = 'Введіть прізвище';
        hasErrors = true;
      }
      if(!validation.validateEmail(userData.email)) {
        errors.email = 'Неправильний e-mail';
        hasErrors = true;
      }
      if(userData.password.length < 6) {
        errors.password = 'Введіть пароль, не менше шести символів';
        hasErrors = true;
      }
      if (hasErrors) {
        return callback(null, {result: 'error', errors: errors});
      } else {
        next();
      }
    },
    function create(next) {
      userData.salt = encryption.createSalt();
      userData.hashed_pwd = encryption.hashPwd(userData.salt, userData.password);
      User.create(userData, function (err, user) {
        if (err && err.toString().indexOf('E11000') > -1) {
          return callback(null, {
            result: 'error',
            errors: {
              email: 'Користувач з таким e-mail уже зареєстрований в системі'
            }
          });
        } else if (err) {
          return next(err);
        } else {
          sparkpost.sendRegistrationEmail(user);
          next(null, {result: 'success', user: user});
        }
      });
    }
  ], callback);
};