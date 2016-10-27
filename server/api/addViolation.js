var Company = require('mongoose').model('Company');
var Proposed = require('mongoose').model('Proposed');
var violations = require('../../shared/js/violations.js');
var async = require('async');
var _ = require('lodash');

exports.get = function(params, callback) {
	var company_id = params.company_id;
	Company.findOne({_id: company_id, published: true}).select('violations').exec(function(err, doc) {
		if (err) {
			return callback(err);
		} else {
			var companyViolations = doc.violations.map(function(el) {
				return el.name;
			});
			return callback(null, {
				company_id: company_id,
				violationsList: _.difference(violations.names(), companyViolations)
			});
		}
	});
};

exports.post = function(params, callback) {
	var selectedViolations = params.selectedViolations;
	var company_id = params.company_id;
	var user_id = params.user_id
	if (selectedViolations) {
		var proposedModel = {
			type: 'violation',
            company_id: company_id,
            values: selectedViolations,
            user_id: user_id
		};
		async.waterfall([
			function(next) {
				Proposed.create(proposedModel, next);
			},
			function(proposed, next) {
				Company.findOne({_id: proposed.company_id}).exec(next);
			},
			function(company, next) {
				company.proposals = true;
				company.save(function(err) {
					if (err) {
						return next(err);
					} else {
						next();
					}
				});
			},
			function(next) {
				next(null, {result: 'success'});
			}
		], callback);
	} else {
		return callback(null, {result: 'error'});
	}
};