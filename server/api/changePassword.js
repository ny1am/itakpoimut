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
			var errors = [];
			if (user.provider !== 'local') {
				errors.push({
					field: 'password',
					message: 'Неправильний пароль'
				});
			} else {
				if (!user.authenticate(password)) {
					errors.push({
						field: 'password',
						message: 'Неправильний пароль'
					});
				}
				if(newPassword.length < 6) {
					errors.push({
						field: 'newPassword',
						message: 'Введіть пароль, не менше шести символів'
					});
		        }
			}
			if (errors.length) {
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