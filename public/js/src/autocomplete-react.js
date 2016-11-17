//temporary staff
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import categories from '../../../shared/js/categories.js';
import AutocompleteSearch from '../../../server/react-views/components/AutocompleteSearch.jsx';

(function() {
	if (window.location.pathname === '/') {
		ReactDOM.render(
			<AutocompleteSearch categories={categories.list()} />,
			document.getElementById('todo-remove-autocomplete')
		);
	}

	//todo: omg this epic shit needs to be revised
	$(document.body).on('click', function(evt) {
    var $target = $(evt.target);
    if (!$target.is('[data-trigger-ajax-autocomplete]') && !$target.is('[data-ajax-autocomplete]')) {
      ReactDOM.render(
				<AutocompleteSearch categories={categories.list()} shown={false} />,
				document.getElementById('todo-remove-autocomplete')
			);
    }
  });
}());