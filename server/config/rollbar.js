var rollbar = require('rollbar');
var VARS = require('./variables.js');

module.exports = function(app) {
  if (process.env.NODE_ENV === 'production') {
    app.use(rollbar.errorHandler(VARS.rollbar));
  }
  app.use(function(error, request, response, next) {
    if (process.env.NODE_ENV === 'production') {
      return response.status(500).send({});
    } else {
      console.log(error.stack);
      return response.status(500).send({error: error.stack});
    }
  });
};