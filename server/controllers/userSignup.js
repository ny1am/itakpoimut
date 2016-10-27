var api = require('../api/userSignup.js');
var rememberMe = require('../config/passport-remember-me.js');

exports.get = function(request, response, next) {
    return response.render('partials/signup');
};

exports.post = [
    function create(request, response, next) {
        api.post(request.body, function(err, model) {
            if (err) {
                return next(err);
            } else if (model.result === 'error') {
                response.addErrors(model.errors);
                return response.render('partials/signup');
            } else {
                user = model.user;
                request.login(user, function(err) {
                    if (err) {
                        return next(err);
                    } else {
                        next();
                    }
                });
            }
        });
    },

    rememberMe.addCookieMiddleware,

    function result(request, response) {
        return response.redirect('/');
    }
];