var mongoose = require('mongoose');
var Token = mongoose.model('ResetPasswordToken');
var User = mongoose.model('User');
var encryption = require('../utils/encryption');
var _ = require('lodash');
var async = require('async');

exports.post = function(params, callback) {
	var password = params.password;
	var tokenString = params.tokenString;
	async.waterfall([
		function prepare(next) {
			password = _.trim(password);
			next();
		},
		function findToken(next) {
			Token.findOne({token: tokenString, expires: { $gt: Date.now() }}).exec(next);
		},
		function validate(token, next) {
			var errors = [];
			if(password.length < 6) {
				errors.push({
					field: 'password',
					message: 'Введіть пароль, не менше шести символів'
				});
	        }
	        if (!token) {
	        	errors.push({
					field: 'dialog',
					message: 'Термін дії посилання закінчився. Подайте ще один запит на зміну пароля.'
				});
	        }
	        if (errors.length) {
				return callback(null, {result: 'error', errors: errors});
			} else {
				next(null, token);
			}
		},
		function findUser(token, next) {
			User.findOne({_id: token.user_id}).exec(function(err, user) {
				if (err) {
					return next(err);
				} else {
					next(null, token, user);
				}
			});
		},
		function updatePassword(token, user, next) {
			token.remove();
			user.salt = encryption.createSalt();
	        user.hashed_pwd = encryption.hashPwd(user.salt, password);
	        user.save(function(err) {
				if (err) {
					return next(err);
				} else {
					next(null, {result: 'success'});
				}
			});
		}
	], callback);
};