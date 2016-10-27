var Company = require('mongoose').model('Company');
var Proposed = require('mongoose').model('Proposed');
var categories = require('../../shared/js/categories.js');
var async = require('async');
var _ = require('lodash');

exports.get = function(params, callback) {
	var company_id = params.company_id;
	Company.findOne({_id: company_id, published: true}).select('categories').exec(function(err, doc) {
		if (err) {
			return callback(err);
		} else {
			return callback(null, {
				company_id: company_id,
				companyCategories: doc.categories,
				categoriesList: _.difference(categories.names(), doc.categories)
			});
		}
	});
};

exports.post = function(params, callback) {
	var selectedCategories = params.selectedCategories;
	var company_id = params.company_id;
	var user_id = params.user_id
	if (selectedCategories) {
		var proposedModel = {
			type: 'category',
            company_id: company_id,
            values: selectedCategories,
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