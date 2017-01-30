var User = require('mongoose').model('User');
var asyncjs = require('async');
var _ = require('lodash');

var recordsPerPage = 20;

exports.show = function(req, res, next) {
	var currentPage = 1;
	if (req.query.currentPage) {
		currentPage = parseInt(req.query.currentPage);
	}
	asyncjs.parallel({
		users: function(callback) {
			User
			.find({})
			.skip((currentPage - 1) * recordsPerPage)
			.limit(recordsPerPage)
			.sort({
				email: 'asc'
			})
			.exec(function (err, docs) {
				callback(err, docs);
			});
		},
		usersCount: function(callback) {
			User.count({}).exec(function (err, doc) {
				callback(err, doc);
			});
		}
	}, function(err, results) {
		results.totalPages = Math.ceil(results.usersCount / recordsPerPage);
		results.currentPage = currentPage;
		var model = {
			layout: 'admin',
			recordsPerPage: recordsPerPage
		};
		_.extend(model, results);
		res.render('pages/AdminUsers', model);
	}); 
};

exports.addModeratorRole = function(req, res, next) {
	var id = parseInt(req.query.id);
	User.findOne({_id: id}).exec(function(err, user) {
		user.addRole('moderator');
		user.save(function() {
			return res.redirect('/admin/users');
		});
	});
};

exports.removeModeratorRole = function(req, res, next) {
	var id = parseInt(req.query.id);
	User.findOne({_id: id}).exec(function(err, user) {
		if (user.isAdmin()) {
			return res.redirect('/admin/users');
		} else {
			user.removeRole('moderator');
			user.save(function() {
				return res.redirect('/admin/users');
			});
		}
	});
};