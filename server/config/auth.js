var passport = require('passport');
var validation = require('./validation.js');
var rememberMe = require('./passport-remember-me.js');
var VARS = require('./variables');
var url = require('url');

(function() {

    function redirect(request, response) {
        var redirectUrl = '/';
        var referer = request.headers['referer'];
        //todo: its google auth redirect hook, revise if possible
        if (referer && referer.indexOf(VARS.baseUrl) > -1 && referer.indexOf(VARS.baseUrl+'/AccountChooser') === -1) {
            redirectUrl = url.parse(referer).path;
        }
        if (redirectUrl === '/login') {
            redirectUrl = '/';
        }
        response.redirect(redirectUrl);
    };

    exports.authenticate = [
        function validate(request, response, next) {
            var userData = request.body;
            if (!validation.validateEmail(userData.username)) {
                response.addError('username', 'Неправильний логін');
                return response.render('partials/login');
            } else {
                next();
            }
        },

        function auth(request, response, next) {
            passport.authenticate('local', function(err, user) {
                if (err) {
                    return next(err);
                } else if (!user) {
                    response.addError('password', 'Неправильний пароль');
                    return response.render('partials/login');
                } else {
                    request.login(user, function(err) {
                        if (err) {
                            return next(err);
                        } else {
                            next();
                        }
                    });
                }
            })(request, response, next);
        },
        rememberMe.addCookieMiddleware,
        redirect
    ];

    exports.fbAuthenticate = passport.authenticate('facebook', { scope: 'email'});

    exports.fbAuthenticateCb = [
        passport.authenticate('facebook', {failureRedirect: '/login' }),
        redirect
    ];

    exports.googleAuthenticate = passport.authenticate('google', { scope: ['profile', 'email'] });

    exports.googleAuthenticateCb = [
        passport.authenticate('google', {failureRedirect: '/login' }),
        redirect
    ];

    exports.roleUser = function (request, response, next) {
        if (!request.user) {
            return response.render('partials/pleaseSignup', {result: 'dialog', template: 'pleaseSignup'});
        } else {
            next();
        }
    };

    exports.roleModerator = function (request, response, next) {
        if (!request.user || request.user.roles.indexOf('moderator') === -1) {
            return response.redirect('/403');
        } else {
            next();
        }
    };

    exports.roleAdmin = function (request, response, next) {
        if (!request.user || request.user.roles.indexOf('admin') === -1) {
            return response.redirect('/403');
        } else {
            next();
        }
    };

}());