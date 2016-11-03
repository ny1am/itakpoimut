var Comment = require('mongoose').model('Comment');
var Company = require('mongoose').model('Company');
var asyncjs = require('async');

var categories = require('../../shared/js/categories.js');

exports.get = function(params, callback) {
	asyncjs.parallel({
		newCompanies: function(next) {
			Company.find({published: true}).select('_id title img').limit(5).sort({_id: 'desc'}).exec(function (err, docs) {
				next(err, docs);
			});
		},
		comments: function(next) {
			Comment
			.find({})
			.limit(5)
			.sort({_id: 'desc'})
			.populate('_company', 'title')
			.populate('_user', 'fname lname picture_url')
			.exec(function (err, doc) {
				next(err, doc);
			});
		},
		categoriesList: function(next) {
			next(null, categories.list());
		}
	},
	callback);
};