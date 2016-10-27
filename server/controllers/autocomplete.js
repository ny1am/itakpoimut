var api = require('../api/autocomplete.js');
var rollbar = require('rollbar');


exports.get = function(request, response) {
    api.get({term: request.query.term}, function(err, results) {
        if (err) {
            rollbar.handleError(err, request);
            results = [];
        }
        return response.send({results: results});
    });
};