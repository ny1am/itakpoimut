var api = require('../api/company.js');
var categories = require('../../shared/js/categories.js');
var violations = require('../../shared/js/violations.js');

exports.get = function(request, response, next) {
  api.get({
    companyId: request.params.id,
  }, function(err, model) {
    if (err) {
      return next(err);
    } else {
      const modelCategories = model.company.categories || [];
      //todo: change in database or whatever
      const modelViolations = model.company.violations.map(item => item.name) || [];
      var newModel = {
        company: {
          _id: model.company._id,
          img: model.company.img,
          title: model.company.title,
          company_site: model.company.company_site,
          description: model.company.description,
          loyalty: model.company.loyalty,
          categories: categories.list().filter(category => (
            modelCategories.indexOf(category.name) !== -1
          )),
          violations: violations.list().filter(violation => (
            modelViolations.indexOf(violation.name) !== -1
          ))
        },
      };
      return response.send(newModel);
    }
  });
};