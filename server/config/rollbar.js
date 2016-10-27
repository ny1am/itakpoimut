var rollbar = require("rollbar");
var VARS = require('./variables.js');

module.exports = function(app) {
	if (process.env.NODE_ENV === 'production') {
		app.use(rollbar.errorHandler(VARS.rollbar));
	}
	app.use(function(error, request, response, next) {
		console.log(error.stack);
		response.status(404);
		return response.render('misc/404', {layout: 'main--fullpage'});
	});
};