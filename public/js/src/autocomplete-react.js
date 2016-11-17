//temporary staff
import React from 'react';
import ReactDOM from 'react-dom';
var categories = require('../../../shared/js/categories.js');

import AutocompleteSearch from '../../../server/react-views/components/AutocompleteSearch.jsx';

(function() {
	if (window.location.pathname === '/') {
		ReactDOM.render(
		  <AutocompleteSearch categories={categories.list()} />,
			document.getElementById('todo-remove-autocomplete')
		);
	}
}());