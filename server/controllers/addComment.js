var api = require('../api/addComment.js');
var companyAPI = require('../api/company.js');
var isomorphic = require('../config/isomorphic.js');

exports.post = function(request, response, next) {
	api.post({
		userId: request.user._id,
		companyId: request.body._company,
		commentText: request.body.text
	}, function(err, model) {
		if (err) {
			return next(err);
		} else {
			var comment = model.comment;
			if (isomorphic.jsRequest(request)) {
				companyAPI.get({
					companyId: comment._company
				}, function(err, companyModel) {
					if (err) {
						return next(err);
					} else {
						return response.render('pages/company', companyModel);
					}
				});
			} else {
				return response.redirect('/company/'+comment._company+'#company-comments');
			}
		}
	});
};