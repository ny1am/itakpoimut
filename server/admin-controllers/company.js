var Company = require('mongoose').model('Company');
var Proposed = require('mongoose').model('Proposed');
var Comment = require('mongoose').model('Comment');
var fs = require('fs');
var cloudinary = require('cloudinary');
var _ = require('lodash');
var violations = require('../../shared/js/violations.js');
var categories = require('../../shared/js/categories.js');
var loyalties = require('../../shared/js/loyalties.js');
var elasticsearch = require('elasticsearch');
var rollbar = require('rollbar');
var upload = require('../config/upload.js');
var dropbox = require('../config/dropbox.js');
var path = require('path');
var validation = require('../config/validation.js');


exports.delete = function(req, res) {
    var _id = parseInt(req.query._id);
    Company.findOne({_id: _id}).exec(function(err, doc) {
        if (doc.cloudinary_public_id) {
            cloudinary.uploader.destroy(doc.cloudinary_public_id);
        }
        elasticsearch.deleteCompany(doc._id, function(err) {
            if (err) {
                rollbar.handleError(err);
            }
        });
        Proposed.find({company_id: doc._id}).remove().exec();
        Comment.find({_company: doc._id}).remove().exec();
        doc.remove(function() {
            res.redirect('/admin/companies');
        });
    });
};

exports.show = function (req, res) {
	var _id;
	if (req.query._id) {
        _id = parseInt(req.query._id);
    }
    if (_id) {
    	Company.findOne({_id: _id}).exec(function(err, doc) {
    		var selectedViolations = [];
    		if (doc.violations) {
    			selectedViolations = doc.violations.map(function(obj) {
    				return obj.name;
    			});
    		};
            findProposals(doc, function(proposals) {
                var result = _.extend({
                    layout: 'admin',
                    violationsList: violations.list(),
                    categoriesList: categories.list(),
                    loyaltiesList: loyalties.list(),
                    selectedCategories: doc.categories,
                    selectedViolations: selectedViolations
                }, doc, proposals);
                return res.render('pages/admin-company', result);
            });
    	});
    } else {
    	return res.render('pages/admin-company', {
    		layout: 'admin',
	        violationsList: violations.list(),
	        categoriesList: categories.list(),
	        loyaltiesList: loyalties.list(),
            published: true
	    });
    }
};

exports.save = function (req, res, next) {
	upload.company(req, res, function(err) {
		var companyData = req.body;
		companyData.file = req.file;
        prepare(companyData);
        if (!validateCompany(req, res, err)){
            findProposals(companyData, function(proposals) {
                return res.render('pages/admin-company', _.extend({
                    layout: 'admin',
                    violationsList: violations.list(),
                    categoriesList: categories.list(),
                    loyaltiesList: loyalties.list(),
                }, proposals));
            });
        } else {
        	if (companyData._id) {
        		Company.findOne({_id: companyData._id}).exec(function(err, doc) {
        			saveCompany(doc, companyData, function() {
        				res.redirect('/admin/companies');
        			});
        		});
        	} else {
        		var model = {};
        		saveCompany(model, companyData, function() {
					res.redirect('/admin/companies');
				});
        	}
        }
	});
};

function saveCompany(doc, companyData, callback) {
	doc.title = companyData.title;
	doc.description = companyData.description;
    doc.company_site = companyData.company_site;
    doc.violations = companyData.violations;
    doc.categories = companyData.categories;
    doc.loyalty = companyData.loyalty;
    doc.published = companyData.published;
    if (companyData.proposalsSeen) {
        doc.proposals = false;
        Proposed.find({company_id: doc._id}).remove().exec();
    }
    if (companyData.file) {
    	var attachment = companyData.file;
        cloudinary.uploader.upload(attachment.path, function (result) {
            if (doc.cloudinary_public_id) {
                cloudinary.uploader.destroy(doc.cloudinary_public_id);
            }
            doc.img = result.secure_url;
            doc.cloudinary_public_id = result.public_id;
            __save(doc, companyData.file, callback);
        }, cloudinary.opts.company);
    } else {
    	__save(doc, undefined, callback);
    }
};

function __save(doc, file, callback) {
    function saveResult(err, doc) {
        if (doc.published) {
            elasticsearch.indexCompany(doc, function(err) {
                if (err) {
                    rollbar.handleError(err);
                }
            });
        } else {
            elasticsearch.deleteCompany(doc._id, function(err) {
                if (err) {
                    rollbar.handleError(err);
                }
            });
        }
        if (file) {
            var backup_file_name = 'company_logo_' + doc._id + path.extname(file.originalname);
            dropbox.uploadImage(file, backup_file_name);
        }
        callback();
    };
    if (doc._id) {
        Company.findOneAndUpdate({_id: doc._id}, doc, {upsert: true, new: true}, saveResult);
    } else {
        Company.create(doc, saveResult);
    }
}

function prepare(companyData) {
    companyData.title = _.trim(companyData.title);
    companyData.company_site = _.trim(companyData.company_site);
    companyData.description = _.trim(companyData.description);
    companyData.published = companyData.published || false;
    //todo: revise data model
    companyData.violations = [];
    if (companyData.selectedViolations) {
        companyData.violations = companyData.selectedViolations.map(function(obj) {
            return {
                name: obj
            };
        });
    }
    companyData.categories = companyData.selectedCategories || [];
};

function validateCompany(request, response, err) {
    var companyData = request.body;
    var result = true;
    if(companyData.title === '') {
        response.addError('title', 'Введіть назву компанії');
        result = false;
    }
    if (companyData.company_site && !validation.validateUrl(companyData.company_site)) {
        response.addError('company_site', 'Введіть коректний URL');
        result = false;
    }
    if (err || (!request.file && !companyData._id)) {
        var error = 'Додайте лого компанії (JPG або PNG розміром до 1MB)';
        response.addError('attachment', error);
        response.addError('dialog', error);
        result = false;
    }
    return result;
};

function findProposals(company, callback) {
    if (company._id) {
        Proposed.find({company_id: company._id}).exec(function(err, docs) {
            var result = {};
            if (docs.length > 0) {
                var proposedCategories = [];
                var proposedViolations = [];
                docs.forEach(function(doc) {
                    if (doc.type === 'category') {
                        proposedCategories = _.union(proposedCategories, doc.values);
                    } else if (doc.type === 'violation') {
                        proposedViolations = _.union(proposedViolations, doc.values);
                    }
                });
                result.proposedCategories = proposedCategories;
                result.proposedViolations = proposedViolations;
            }
            callback(result);
        });
    } else {
        callback({});
    }
};