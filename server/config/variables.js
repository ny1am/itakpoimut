var localVariables = require('./profiles/local.js');
var productionVariables = require('./profiles/production.js');

module.exports = function() {
	if (process.env.NODE_ENV === 'production') {
		return productionVariables;
	} else {
		return localVariables;
	}
}();