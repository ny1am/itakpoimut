var express = require('express');
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors')

module.exports = function (app, config) {

  app.set('port', (process.env.PORT || 5001));
  app.use(compress());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(cors())
  
};