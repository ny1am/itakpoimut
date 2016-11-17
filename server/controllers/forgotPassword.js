var api = require('../api/forgotPassword.js');


exports.get = function(req, res, next) {
	return res.render('partials/forgot');
};

exports.post = function(req, res, next) {
    api.post({
        email: req.body.email
    }, function(err, model) {
        if (err) {
            return next(err);
        } else if (model.result === 'error') {
            res.addErrors(model.errors);
            return res.render('partials/forgot');
        } else {
            return res.render('partials/success', {result: 'dialog', template: 'success', 
                dialog_title: 'Запит надіслано',
                dialog_body: 'Запит на зміну паролю надіслано. &#13;&#10; Перевірте, будь ласка, поштову скриньку.'
            });
        }
    });
};