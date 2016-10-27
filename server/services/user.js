var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.createFbUser = function(profile, cb) {
	var userData = {
		username: 'fb_'+profile.id,
		roles: ['user'],
		fname: profile._json.first_name,
		lname: profile._json.last_name,
		email: profile._json.email,
		provider: 'facebook',
		facebook_id: profile.id
	};
	if (profile.photos && profile.photos.length) {
		userData.picture=profile.photos[0].value;
	}
	User.create(userData, function(err, user) {
		if (user) {
			return cb(null, user);
		} else {
			return cb(null, false);
		}
	});
};

exports.createGoogleUser = function(profile, cb) {
	var userData = {
		username: 'google_'+profile.id,
		roles: ['user'],
		fname: profile.name.givenName,
		lname: profile.name.familyName,
		email: profile.emails[0].value,
		provider: 'google',
		google_id: profile.id
	};
	if (profile.photos && profile.photos.length) {
		userData.picture=profile.photos[0].value;
	}
	User.create(userData, function(err, user) {
		if (user) {
			return cb(null, user);
		} else {
			return cb(null, false);
		}
	});
};