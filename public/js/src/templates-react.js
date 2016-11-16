var ReactDOM = require('react-dom');
var React = require('react');

var LoginDialog = require('../../../server/react-views/partials/login.jsx');
var Loading = require('../../../server/react-views/partials/loading.jsx');

function render(reactClass, model, domElement) {
	var temp = document.createElement('div');
	ReactDOM.render(React.createElement(reactClass, model), temp);
	document.getElementById('content').replaceChild(temp.childNodes[0], domElement);
}

module.exports = {
	loading: function(domElement) {
		var temp = document.createElement('div');
		ReactDOM.render(React.createElement(Loading), temp);
		domElement.appendChild(temp.childNodes[0]);
	},
	login: function(domElement, model) {
		render(LoginDialog, model, domElement);
	}
};