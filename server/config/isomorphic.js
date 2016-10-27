var _ = require('lodash');

function jsRequest(request) {
    return request.is('json') || request.xhr;
}

exports.jsRequest = jsRequest;

exports.setup = function (app) {

    app.use(function (request, response, next) {
        var _render = response.render;
        response.render = function (view, model, callback) {
            if (!!view && /^partials\//.test(view)) {
                 _.extend(model, {
                    layout: 'main--pattern'
                });
            }
            if (this.hasErrors()) {
                _.extend(model, {
                    errors: this.errors
                }, request.body);
            }
            //todo some magic here
            //todo errors here
            if (jsRequest(request)) {
                //add callback maybe
                this.send(model);
            } else {
                _.extend(model, {
                    page_url: request.url
                });
                _render.call(this, view, model);
            }
        };
        next();
    });

    app.use(function (request, response, next) {
        var _redirect = response.redirect;
        response.redirect = function (location) {
            //todo some magic here
            if (jsRequest(request)) {
                response.status(278).send({
                    type: 'redirect',
                    location: location
                });
            } else {
                _redirect.call(this, location);
            }
        };
        next();
    });

};