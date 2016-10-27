var api = require('../api/addCompany.js');
var upload = require('../config/upload.js');


exports.get = function (request, response) {
    api.get({}, function(err, model) {
        return response.render('partials/createCompany', model);
    });
};

exports.post = function (request, response, next) {
    upload.company(request, response, function(err) {
        api.post({
            userId: request.user._id,
            title: request.body.title,
            company_site: request.body.company_site,
            description: request.body.description,
            selectedViolations: request.body.selectedViolations,
            selectedCategories: request.body.selectedCategories,
            logoFile: request.file
        }, function(err, model) {
            if (err) {
                return next(err);
            } else if (model.result === 'error') {
                response.addErrors(model.errors);
                return exports.get(request, response);
            } else {
                return response.render('partials/success', {result: 'dialog', template: 'success', 
                    dialog_title: 'Дякуємо!',
                    dialog_body: 'Запит на створення компанії надіслано. Адміністратор розгляне його найближчим часом.'
                });
            }
        });
    });
};