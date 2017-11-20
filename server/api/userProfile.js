var User = require('mongoose').model('User');
var async = require('async');
var cloudinary = require('cloudinary');
var _ = require('lodash');

exports.get = function(params, callback) {
  var userId = params.userId;
  User.findOne({_id: userId}).select('fname lname provider picture_url email provider').exec(callback);
};

exports.post = function(params, callback) {
  var userId = params.userId;
  var userData = {
    fname: params.fname,
    lname: params.lname,
    userpicFile: params.userpicFile
  }
  async.waterfall([
    function prepare(next) {
      userData.fname = _.trim(userData.fname);
      userData.lname = _.trim(userData.lname);
      next();
    },
    function validate(next) {
      var errors = {};
      var hasError = false;
      if(userData.fname === '') {
        errors.fname = 'Введіть ім\'я';
        hasError = true;
      }
      if(userData.lname === '') {
        errors.lname = 'Введіть прізвище';
        hasError = true;
      }
      if (hasError) {
        return callback(null, {result: 'error', errors: errors});
      } else {
        next();
      }
    },
    function findUser(next) {
      User.findOne({_id: userId}).exec(next);
    },
    function uploadUserpic(dbUser, next) {
      if (userData.userpicFile) {
        //todo: error handling
        cloudinary.uploader.upload(userData.userpicFile.path, function (result) {
          if (dbUser.cloudinary_public_id) {
            cloudinary.uploader.destroy(dbUser.cloudinary_public_id);
          }
          dbUser.picture_url = result.secure_url;
          dbUser.cloudinary_public_id = result.public_id;
          next(null, dbUser);
        }, cloudinary.opts.user);
      } else {
        next(null, dbUser);
      }
    },
    function update(dbUser, next) {
      dbUser.fname = userData.fname;
      dbUser.lname = userData.lname;
      dbUser.save(function(err) {
        if (err) {
          return next(err);
        } else {
          next(null, {
            result: 'success',
            user: dbUser
          });
        }
      })
    }
  ], callback);
};