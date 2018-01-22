var api = require('../api/company.js');
var _ = require('lodash');


exports.get = function(request, response, next) {
  api.get({
    companyId: request.params.id,
  }, function(err, model) {
    if (err) {
      return next(err);
    } else {
      //todo: change in database or whatever
      var newModel = {
        company: {
          _id: model.company._id,
          img: model.company.img,
          title: model.company.title,
          company_site: model.company.company_site,
          description: model.company.description,
          loyalty: model.company.loyalty,
          categories: model.company.categories,
          violations: model.company.violations.map(item => item.name)
        },
      };
      return response.send(newModel);
    }
  });
};