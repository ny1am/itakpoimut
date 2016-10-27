exports.setup = function (app) {

    app.use(function (request, response, next) {
        response.addError = function (name, message) {
            var errors = response.errors || {};
            errors[name] = message;
            response.errors = errors;
        };
        //todo: i don't like this
        response.addErrors = function(errors) {
            errors.forEach(function(el) {
                response.addError(el.field, el.message);
            });
        }
        response.hasErrors = function () {
            return !!response.errors;
        };
        next();
    });
};

exports.validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

exports.validateUrl = function(url) {
    var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    return re.test(url);
}