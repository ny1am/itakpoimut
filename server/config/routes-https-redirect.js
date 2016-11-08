var VARS = require('./variables.js');

module.exports = function(app) {
	if (VARS.baseUrl.indexOf('https') === 0) {
		app.get('*',function(req, res, next) {
			if(req.headers['x-forwarded-proto'] != 'https') {
				res.redirect(VARS.baseUrl+req.url);
			} else {
				next();
			}
		});
	}
};