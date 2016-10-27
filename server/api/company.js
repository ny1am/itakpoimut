var Company = require('mongoose').model('Company');
var Comment = require('mongoose').model('Comment');
var asyncjs = require('async');

var recordsPerPage = 5;

exports.get = function(params, callback) {
	var currentPage = params.currentPage || 1;
	var companyId = params.companyId;
	asyncjs.parallel({
		company: function(next) {
			Company.findOne({_id: companyId, published: true}).exec(next);
		},
		comments: function(next) {
			Comment
			.find({_company: companyId})
			.skip((currentPage - 1) * recordsPerPage)
			.limit(recordsPerPage)
			.sort({_id: 'desc'})
            .populate('_user', 'fname lname picture_url')
			.exec(next);
		},
		commentsCount: function(next) {
			Comment.count({_company: companyId}).exec(next);
		}
	}, function(err, model) {
		if(err) {
			return callback(err);
		} else {
			model.currentPage = currentPage;
			model.recordsPerPage = recordsPerPage;
			model.totalPages = Math.ceil(model.commentsCount / model.recordsPerPage);
			return callback(null, model);
		}
	});
};