var api = require('../api/resetPassword.js');

exports.get = function(req, res, next) {
	return res.render('partials/reset', {token: req.params.token});
};

exports.post = [
	function exec(req, res, next) {
        api.post({
        	password: req.body.password,
        	tokenString: req.body.token
        }, function(err, model) {
        	if (err) {
        		return next(err);
        	} else if (model.result === 'error') {
        		res.addErrors(model.errors);
            	return res.render('partials/reset');
        	} else {
        		next();
        	}
        })
    },

	function result(req, res) {
		req.flash('message', 'Пароль успішно змінено!');
		return res.redirect('/login');
	}
];