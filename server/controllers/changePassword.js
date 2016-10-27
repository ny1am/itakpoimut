var api = require('../api/changePassword.js');

exports.get = function(request, response) {
	return response.render('partials/changePassword');
};

exports.post = function(request, response, next) {
	api.post({
		user: request.user,
		password: request.body.password,
		newPassword: request.body.newPassword
	}, function(err, model) {
		if (err) {
			return next(err);
		} else if (model.result === 'error') {
			response.addErrors(model.errors);
			return response.render('partials/changePassword');
		} else {
			request.user = model.user;
        	return response.render('partials/success', {result: 'dialog', template: 'success', 
				dialog_title: 'Вітаємо!',
				dialog_body: 'Ваш пароль успішно змінено.'
			});
		}
	})
};