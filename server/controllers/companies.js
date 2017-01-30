var api = require('../api/companies.js');
var _ = require('lodash');

exports.get = function(request, response, next) {
    renderFilter(request.query, request, response, next);
};

exports.post = function(request, response, next) {
    renderFilter(request.body, request, response, next);
};

function renderFilter(params, request, response, next) {
    api.get({
        currentPage: request.query.currentPage?parseInt(request.query.currentPage):1,
        sortOrder: request.query.sortOrder,
        title: params.title,
        selectedLoyalty: params.selectedLoyalty,
        selectedCategory: params.selectedCategory,
        selectedViolations: params.selectedViolations
    }, function(err, model) {
        if (err) {
            return next(err);
        } else {
            return response.render('pages/Companies', _.extend(model, params));
        }
    });
};