var Company = require('mongoose').model('Company');
var async = require('async');
var _ = require('lodash');
var validation = require('../config/validation.js');
var cloudinary = require('cloudinary');
var dropbox = require('../config/dropbox.js');
var path = require('path');

exports.post = function(params, callback) {
  var userId = params.userId;
  var companyData = {
    title: params.title,
    company_site: params.company_site,
    description: params.description,
    selectedViolations: params.selectedViolations,
    selectedCategories: params.selectedCategories,
    logoFile: params.logoFile
  };
  async.waterfall([
    function prepare(next) {
      companyData.title = _.trim(companyData.title);
        companyData.company_site = _.trim(companyData.company_site);
        companyData.description = _.trim(companyData.description);
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
        next();
    },
    function validate(next) {
      var errors = {};
      var hasErrors = false;
      if(companyData.title === '') {
        errors.title = 'ADD_COMPANY_TITLE';
        hasErrors = true;
      }
      if (companyData.company_site && !validation.validateUrl(companyData.company_site)) {
        errors.company_site = 'ADD_COMPANY_INCORRECT_URL';
        hasErrors = true;
      }
      if (!companyData.logoFile) {
        var error = 'ADD_COMPANY_LOGO_FILE';
        errors.attachment = error;
        errors.dialog = error;
        hasErrors = true;
      }
      if (hasErrors) {
        return callback(null, {result: 'error', errors: errors});
      } else {
        next();
      }
    },
    function upload(next) {
      cloudinary.uploader.upload(companyData.logoFile.path, function (result) {
        next(null, result);
      }, cloudinary.opts.company);
    },
    function save(cloudinaryResult, next) {
      companyData.img = cloudinaryResult.secure_url;
      companyData.cloudinary_public_id = cloudinaryResult.public_id;
      companyData.user_id = userId;
      companyData.loyalty = companyData.violations.length===0?'loyal':'disloyal';
      companyData.published = false;
      Company.create(companyData, function (err, doc) {
        if (err && err.toString().indexOf('E11000') > -1) {
          const errors = {
            title: 'ADD_COMPANY_DUPLICATION',
          }
          return callback(null, {result: 'error', errors});
        } else if (err) {
          return next(err);
        } else {
          var backup_file_name = 'company_logo_' + doc._id + path.extname(companyData.logoFile.originalname);
          dropbox.uploadImage(companyData.logoFile, backup_file_name);
          next(null, {
            result: 'success',
            company: doc
          });
        }
      });
    }
  ], callback);
};