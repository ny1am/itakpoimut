var api = require('../api/userProfile.js');
var _ = require('lodash');
var upload = require('../config/upload.js');

exports.get = function(request, response, next) {
  api.get({
    userId: request.user._id
  }, function(err, model) {
    if (err) {
      return next(err);
    } else {
      return response.send(model);
    }
  });
};

exports.post = function(request, response, next) {
  upload.user(request, response, function(err) {
    if (err) {
      var model = {
        result: 'error',
        errors: {
          page: 'Ваше фото не задовільняє вимогам',
          userpic: 'Ваше фото не задовільняє вимогам',
        }
      }
      return response.send(model);
    } else {
      api.post({
        userId: request.user._id,
        fname: request.body.fname,
        lname: request.body.lname,
        userpicFile: request.file
      }, function(err, model) {
        if (err) {
          return next(err);
        } else if (model.result === 'error') {
          return response.send(model);
        } else {
          request.user = model.user;
          var model = {successSave: true};
          _.extend(model, request.body);
          return response.send(model);
        }
      });
    }
  });
};