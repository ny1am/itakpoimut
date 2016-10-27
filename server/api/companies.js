var Company = require('mongoose').model('Company');
var violations = require('../../shared/js/violations.js');
var loyalties = require('../../shared/js/loyalties.js');
var categories = require('../../shared/js/categories.js');
var asyncjs = require('async');
var _ = require('lodash');

var recordsPerPage = 10;

exports.get = function(params, callback) {
	var currentPage = params.currentPage || 1;
	var sortOrder = params.sortOrder==='desc'?'desc':'asc';
	var filters = {
		title: params.title,
		selectedLoyalty: params.selectedLoyalty,
		selectedCategory: params.selectedCategory,
		selectedViolations: params.selectedViolations
	};
	var query = buildFilterQuery(filters);
	asyncjs.parallel({
        companies: function(next) {
            Company
            .find(query)
            .select('_id title description img loyalty')
            .skip((currentPage - 1) * recordsPerPage)
            .limit(recordsPerPage)
            .sort({sort_title: sortOrder})
            .exec(next);
        },
        companiesCount: function(next) {
            Company.count(query).exec(next);
        },
        allCompaniesCount: function(next) {
            Company.count({published: true}).exec(next);
        }
    }, function(err, model) {
    	if (err) {
    		return callback(err);
    	} else {
    		model.currentPage = currentPage;
			model.recordsPerPage = recordsPerPage;
			model.totalPages = Math.ceil(model.companiesCount / model.recordsPerPage);
            model.sortOrder = sortOrder;
			// todo: separate function should not be in the api
			model.violationsList = violations.list();
        	model.loyaltiesList = loyalties.list();
        	model.categoriesList = categories.list();
        	model.selectedFilters = prepareSelectedFilters(filters);
			callback(null, model);	
    	}
    });
};

function buildFilterQuery(filters) {
	var query = {published: true};
	if (filters.title) {
        query = _.extend(query, {
            'title': new RegExp('^'+filters.title, "i")
        });
    }
    if (filters.selectedLoyalty) {
        query = _.extend(query, loyalties.selectedRule(filters.selectedLoyalty));
    }
    //todo: revise this
    if (filters.selectedCategory) {
        query = _.extend(query, {
            'categories': {
                $all: [filters.selectedCategory]
            }
        });
    }
    if (filters.selectedViolations) {
        query = _.extend(query, {
            'violations.name': {
                $all: filters.selectedViolations
            }
        });
    }
    return query;
};

function prepareSelectedFilters(params) {
    var result = [];
    if (params.selectedLoyalty) {
        var loyalty = loyalties.getByName(params.selectedLoyalty);
        if (loyalty) {
            result = result.concat([{
                name: loyalty.name,
                text: loyalty.text
            }]);
        }
    }
    if (params.selectedCategory) {
        var category = categories.getByName(params.selectedCategory);
        if (category) {
            result = result.concat([{
                name: category.name,
                text: category.text
            }]);
        }
    }
    if (params.selectedViolations) {
        result = result.concat(violations.getByNames(params.selectedViolations).map(function(obj) {
            return {
                name: obj.name,
                text: obj.text
            };
        }));
    }
    return result;
};