var cloudinary = require('cloudinary');
var VARS = require('./variables.js');

module.exports = function () {

	cloudinary.config(VARS.cloudinary);

	cloudinary.opts = {
		company: {
			width: 135,
			height: 135,
			background: 'white',
			crop: 'pad'
		},
		user: {
			width: 100,
			height: 100,
			background: 'white',
			crop: 'pad'
		}
	};
};