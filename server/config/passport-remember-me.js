var passport = require('passport');
var RememberMeStrategy = require('passport-remember-me').Strategy;
var tokenSevice = require('../services/remeberMeToken.js');
var cookieName = 'token';

exports.setup = function(app) {
	passport.use(new RememberMeStrategy(
		{key: cookieName},
		function(token, done) {
			tokenSevice.consume(token, function (err, user) {
				if (err) { return done(err); }
				if (!user) { return done(null, false); }
				return done(null, user);
			});
		},
		function(user, done) {
			tokenSevice.save(user._id, function(err, doc) {
				if (err) { return done(err); }
				return done(null, doc.token);
			});
		}
	));
	app.use(passport.authenticate('remember-me'));
};

exports.addCookieMiddleware = function(request, response, next) {
	if (request.body.rememberme) {
		tokenSevice.save(request.user._id, function(err, doc) {
			if (err) {
				return next(err);
			}
			response.cookie(cookieName, doc.token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
			next();
		});
	} else {
		next();
	}
};

exports.clearCookieMiddleware = function(request, response, next) {
	response.clearCookie(cookieName);
	next();
}