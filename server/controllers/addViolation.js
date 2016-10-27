var api = require('../api/addViolation.js');

exports.get = function (request, response, next) {
    var company_id = request.body.company_id || request.query.company_id;
    api.get({company_id: company_id}, function(err, model) {
        if (err) {
            return next(err);
        } else {
            return response.render('partials/addViolation', model);
        }
    });
};

exports.post = function (request, response, next) {
    var data = request.body;
    var proposedValues = data.selectedViolations;
    api.post({
        selectedViolations: data.selectedViolations,
        company_id: data.company_id,
        user_id: request.user_id
    }, function(err, model) {
        if (err) {
            return next(err);
        } else if (model.result === 'error') {
            return response.redirect('/company/'+data.company_id);
        } else {
            return response.render('partials/success', {result: 'dialog', template: 'success', 
                dialog_title: 'Дякуємо!',
                dialog_body: 'Запит на додання порушення надіслано. Адміністратор розгляне його найближчим часом.'
            });
        }
    });
};