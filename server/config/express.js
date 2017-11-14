var express = require('express');
var bodyParser = require('body-parser');
var compress = require('compression');

module.exports = function (app, config) {

  app.set('port', (process.env.PORT || 5000));
  app.use(compress());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
};