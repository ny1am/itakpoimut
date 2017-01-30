var api = require('../api/landing.js');


exports.get = function (request, response, next) {
	api.get({}, function(err, model) {
		if (err) {
			return next(err);
		} else {
			return response.render('pages/Landing', model);
		}
	});
};