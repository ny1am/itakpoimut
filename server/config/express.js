var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var compress = require('compression');
var flash = require('connect-flash');
var favicon = require('serve-favicon');
var _ = require('lodash');
var VARS = require('./variables.js');

module.exports = function (app, config) {

    app.set('port', (process.env.PORT || 5000));
    app.use(compress());
    app.use(express.static(config.rootPath + '/public', { maxAge: 2592000000 }));
    app.use(express.static(config.rootPath + '/shared', { maxAge: 2592000000 }));
    app.use(favicon(config.rootPath + '/public/img/favicon.ico'));

    require('./handlebars.js')(app, config);

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(session({
        secret: 'they will guess',
        resave: false,
        saveUninitialized: false
    }));
    app.use(flash());

    // todo: remove, i don't like this
    app.use(function (request, response, next) {
        var _render = response.render;
        response.render = function (view, model, callback) {
            var baseUrl = VARS.baseUrl;
            if (baseUrl === undefined) {
                baseUrl = request.protocol + '://' + request.get('host');
            }
            _.extend(model, {
                base_url: baseUrl
            });
            _render.call(this, view, model);
        };
        next();
    });
};