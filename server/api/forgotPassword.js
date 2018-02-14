var crypto = require('crypto');
var mongoose = require('mongoose');
var Token = mongoose.model('ResetPasswordToken');
var User = mongoose.model('User');
var validation = require('../config/validation');
var sparkpost = require('../config/sparkpost');
var async = require('async');

exports.post = function(params, callback) {
	var email = params.email;
	async.waterfall([
		function prevalidate(next) {
			var errors = {};
			if(!validation.validateEmail(email)) {
				errors.email = 'Неправильний e-mail';
				next(null, errors);
      } else {
      	User.find({email: email, provider: 'local'}).exec(function(err, users) {
      		if (err) {
      			errors.email = 'Даний e-mail не зареєстрований в системі';
						next(null, errors);
      		} else if (users.length === 0) {
      			errors.email = 'Даний e-mail не зареєстрований в системі';
						next(null, errors);
      		} else {
      			next(null, {});
      		}
      	});
      }
			
		},
		function validate(errors, next) {
			if (!(Object.keys(errors).length === 0 && errors.constructor === Object)) {
				return callback(null, {result: 'error', errors: errors});
			} else {
				next();
			}
		},
		///todo: revise connect token with email instead of id
		function findUser(next) {
			User.findOne({email: email, provider: 'local'}).exec(next);
		},
		function createToken(user, next) {
			var token = crypto.randomBytes(32).toString('hex');
            var expires = Date.now() + 24*3600000; // 24 hours
        	Token.findOneAndUpdate({user_id: user._id}, {user_id: user._id, token: token, expires: expires}, {upsert: true, new: true}, function(err, doc) {
				if (err) {
					return next(err);
				} else {
					//todo: result on success??
					sparkpost.sendForgotPasswordEmail(user.email, doc.token);
					next(null, {result: 'success'});
				}
			});
		}
	], callback);
};