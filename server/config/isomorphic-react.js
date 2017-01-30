require('babel-register')({
	only: '/react-views/**',
	presets: [
    'react',
    'es2015',
  ],
	extensions: ['.jsx', '.js']
});
var _ = require('lodash');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

function jsRequest(request) {
	return request.is('json') || request.xhr;
}

exports.jsRequest = jsRequest;

exports.setup = function (app, config) {

	app.use(function (request, response, next) {
		var _render = response.render;
		response.render = function (view, model, callback) {
			if (this.hasErrors()) {
				_.extend(model, {
					errors: this.errors
				}, request.body);
			}
			if (jsRequest(request)) {
				this.send(model);
			} else {
				//todo: get rid of it
				//http://stackoverflow.com/questions/9333385/html-anchors-not-working-correctly-in-ie9
				_.extend(model, {
					page_url: request.url
				});
				_render.call(this, view, model);
			}
		};
		next();
	});

	app.use(function (request, response, next) {
		var _render = response.render;
		response.render = function (view, model, callback) {
			if (!jsRequest(request) && !!view && /^partials\//.test(view)) {
				var layout = require(config.rootPath+'/server/react-views/layouts/Pattern');
				var component = require(config.rootPath+'/server/react-views/'+view);
				var Layout = layout.default || layout;
				var Component = component.default || component;
				var html = '<!DOCTYPE html>'+ReactDOMServer.renderToString(
					React.createElement(
						Layout, 
						model, 
						React.createElement(Component, model))
				);
				response.end(html);
			} else {
				_render.call(this, view, model);
			}
		};
		next();
	});

	app.use(function (request, response, next) {
		var _redirect = response.redirect;
		response.redirect = function (location) {
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