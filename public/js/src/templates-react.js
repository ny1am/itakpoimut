import React from 'react';
import ReactDOM from 'react-dom';

import LoginDialog from '../../../server/react-views/partials/login.jsx';
import SignupDialog from '../../../server/react-views/partials/signup.jsx';
import Loading from '../../../server/react-views/partials/loading.jsx';

function render(reactClass, model, domElement) {
	var temp = document.createElement('div');
	ReactDOM.render(React.createElement(reactClass, model), temp);
	domElement.parentNode.replaceChild(temp.childNodes[0], domElement);
}

module.exports = {
	loading: function(domElement) {
		var temp = document.createElement('div');
		ReactDOM.render(React.createElement(Loading), temp);
		domElement.appendChild(temp.childNodes[0]);
	},
	login: function(domElement, model) {
		render(LoginDialog, model, domElement);
	},
	signup: function(domElement, model) {
		render(SignupDialog, model, domElement);
	}
};