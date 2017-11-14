var express = require('express');
var bodyParser = require('body-parser');
var compress = require('compression');
var favicon = require('serve-favicon');
var VARS = require('./variables.js');

module.exports = function (app, config) {

  app.set('port', (process.env.PORT || 5000));
  app.use(compress());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
};