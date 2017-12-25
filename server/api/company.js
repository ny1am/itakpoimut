var Company = require('mongoose').model('Company');
var asyncjs = require('async');

exports.get = function(params, callback) {
	var companyId = params.companyId;
	asyncjs.parallel({
		company: function(next) {
			Company.findOne({_id: companyId, published: true}).exec(next);
		},
	}, function(err, model) {
		if(err) {
			return callback(err);
		} else {
			return callback(null, model);
		}
	});
};