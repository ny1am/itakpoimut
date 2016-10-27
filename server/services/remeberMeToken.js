var mongoose = require('mongoose');
var Token = mongoose.model('RememberMeToken');
var User = mongoose.model('User');
var crypto = require('crypto');

exports.consume = function(token, callback) {
	Token.findOne({token: token}).exec(function(err, doc) {
		if (err) {
			callback(err, null);
		} else if (!doc || !doc.user_id) {
			callback(null, null);
		} else {
			User.findOne({_id: doc.user_id}).exec(function(err, user) {
				callback(err, user);
			});
		}
	});
};

exports.save = function(user_id, callback) {
	var token = crypto.randomBytes(32).toString('hex');
	Token.findOneAndUpdate({user_id: user_id}, {user_id: user_id, token: token}, {upsert: true, new: true}, function(err, doc) {
		callback(err, doc);
	});
};