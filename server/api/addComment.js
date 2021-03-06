var Comment = require('mongoose').model('Comment');

exports.post = function(params, callback) {
	var commentData = {
		_user: params.userId,
		_company: params.companyId,
		text: params.commentText,
		created: Date.now()
	};
	Comment.create(commentData, function(err, doc) {
		if (err) {
			return callback(err);
		} else {
			return callback(null, {
				result: 'success',
				comment: doc
			});
		}
	});
};