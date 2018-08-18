var User = require('mongoose').model('User');
var _ = require('lodash');
var encryption = require('../utils/encryption');
var async = require('async');

exports.post = function(params, callback) {
	var user = params.user;
	var newPassword = params.newPassword;
	var password = params.password;
	async.waterfall([
		function prepare(next) {
			password = _.trim(password);
			newPassword = _.trim(newPassword);
			next();
		},
		function validate(next) {
			var errors = {};
			var hasErrors = false;
			if (user.provider !== 'local') {
				errors.password = 'CHANGE_PASSWORD_WRONG';
				hasErrors = true;
			} else {
				if (!user.authenticate(password)) {
					errors.password = 'CHANGE_PASSWORD_WRONG';
					hasErrors = true;
				}
				if(newPassword.length < 6) {
					errors.newPassword = 'CHANGE_PASSWORD_SHORT';
					hasErrors = true;
		    }
			}
			if (hasErrors) {
				return callback(null, {result: 'error', errors: errors});
			} else {
				next();
			}
		},
		function findUser(next) {
			User.findOne({_id: user._id}).exec(next);
		},
		function saveUser(dbUser, next) {
			dbUser.salt = encryption.createSalt();
			dbUser.hashed_pwd = encryption.hashPwd(dbUser.salt, newPassword);
			dbUser.save(function(err) {
				if (err) {
					return next(err);
				} else {
					next(null, dbUser);
				}
			});
		},
		function final(dbUser, next) {
			next(null, {
				result: 'success',
				user: dbUser
			});
		}
	], callback);
};