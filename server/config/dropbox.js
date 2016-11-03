var VARS = require('./variables.js');
var dbox = require('dbox');
var rollbar = require('rollbar');
var fs = require('fs');

var app = dbox.app(VARS.dropbox.app);
var client = app.client(VARS.dropbox.access_token);

exports.uploadImage = function(file, filename) {
	fs.readFile(file.path, function(err, data) {
		if (err) {
			rollbar.handleError(err, {filename: filename});
		}
		//todo: error handling
		client.put(filename, data, function(status, reply) {
			return reply;
		});
	});
}