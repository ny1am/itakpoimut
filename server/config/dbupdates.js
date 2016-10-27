module.exports = function() {

	//add sort_title field
	// var Company = require('mongoose').model('Company');
	// Company.find({}).exec(function(err, docs) {
	// 	docs.forEach(function(doc) {
	// 		doc.save();
	// 	});
	// });

	//update user.provider when its undefined
	// var User = require('mongoose').model('User');
	// User.find({provider: {$exists: false}}).exec(function(err, docs) {
	// 	docs.forEach(function(doc) {
	// 		doc.provider = 'local';
	// 		doc.save();
	// 	});
	// });

	//introduce loyalties
	// var Company = require('mongoose').model('Company');
	// Company.find({loyalty: {$exists: false}}).exec(function(err, docs) {
	// 	docs.forEach(function(doc) {
	// 		if (doc.violations.length > 0) {
	// 			doc.loyalty = 'disloyal';
	// 		} else {
	// 			doc.loyalty = 'loyal';
	// 		}
	// 		doc.save();
	// 	});
	// });

	//set role to all users
	// var User = require('mongoose').model('User');
	// User.find({roles: {$exists: false}}).exec(function(err, docs) {
	// 	docs.forEach(function(doc) {
	// 		doc.roles = ['user'];
	// 		doc.save();
	// 	});
	// });

	//introduce published flag
	// var Company = require('mongoose').model('Company');
	// Company.find({published: {$exists: false}}).exec(function(err, docs) {
	// 	docs.forEach(function(doc) {
	// 		doc.published = true;
	// 		doc.save();
	// 	});
	// });

	//remove all 'site' violations because it was split by two 
	// var Company = require('mongoose').model('Company');
	// Company.find({'violations.name': {$all: ['site']}}).exec(function(err, docs) {
	// 	docs.forEach(function(doc) {
	// 		var index = -1;
	// 		doc.violations.forEach(function(violation, i) {
	// 			if (violation.name === 'site') {
	// 				index = i;
	// 			}
	// 		});
	// 		if (index >= 0) {
	// 			doc.violations.splice(index, 1);
	// 			doc.save();
	// 		}
	// 	});
	// });

	//add random field
	// var Company = require('mongoose').model('Company');
	// Company.find({}).exec(function(err, docs) {
	// 	docs.forEach(function(doc) {
	// 		doc.save();
	// 	});
	// });

	//update cloudinary_public_id for old records
	// var Company = require('mongoose').model('Company');
	// var path = require('path');
	// Company.find({cloudinary_public_id: {$exists: false}}).exec(function(err, docs) {
	// 	docs.forEach(function(doc) {
	// 		doc.cloudinary_public_id = path.parse(doc.img).name;
	// 		doc.save();
	// 	});
	// });

}();