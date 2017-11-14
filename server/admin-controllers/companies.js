var Company = require('mongoose').model('Company');
var asyncjs = require('async');
var _ = require('lodash');

var recordsPerPage = 20;

exports.show = function(req, res, next) {
	var params = req.query;
	find(req, res, req.query);
};

exports.search = function(req, res, next) {
	var params = req.query;
	find(req, res, req.body);
};

function find(req, res, params) {
	var currentPage = 1;
	if (req.query.currentPage) {
		currentPage = parseInt(req.query.currentPage);
	}
	var query = {};
	if (params.title) {
		query = _.extend(query, {
			'title': new RegExp('^'+params.title, "i")
		});
	}
	asyncjs.parallel({
		companies: function(callback) {
			Company
			.find(query)
			.skip((currentPage - 1) * recordsPerPage)
			.limit(recordsPerPage)
			.sort({
				published: 'asc',
				proposals: 'desc',
				_id: 'desc'
			})
			.exec(function (err, docs) {
				callback(err, docs);
			});
		},
		companiesCount: function(callback) {
			Company.count(query).exec(function (err, doc) {
				callback(err, doc);
			});
		}
	}, function(err, results) {
		results.totalPages = Math.ceil(results.companiesCount / recordsPerPage);
		results.currentPage = currentPage;
		var model = {
			recordsPerPage: recordsPerPage,
			title: req.query.title
		};
		_.extend(model, results);
		res.send(model);
	}); 
} 