var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var compress = require('compression');
var flash = require('connect-flash');
var favicon = require('serve-favicon');
var VARS = require('./variables.js');

module.exports = function (app, config) {

    app.set('port', (process.env.PORT || 5000));
    app.use(compress());
    app.use(express.static(config.rootPath + '/public', { maxAge: 2592000000 }));
    app.use(express.static(config.rootPath + '/shared', { maxAge: 2592000000 }));
    app.use(favicon(config.rootPath + '/public/img/favicon.ico'));

    VARS.renderingEngine(app, config);

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(session({
        secret: VARS.sessionSecret,
        resave: false,
        saveUninitialized: false
    }));
    app.use(flash());
};