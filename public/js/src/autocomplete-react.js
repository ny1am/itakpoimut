//temporary staff
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AutocompleteSearch from '../../../server/react-views/components/AutocompleteSearch.jsx';

(function() {
	if (window.location.pathname === '/') {
		ReactDOM.render(
			<AutocompleteSearch />,
			document.getElementById('todo-remove-autocomplete')
		);
	}

	//todo: omg this epic shit needs to be revised
	$(document.body).on('click', function(evt) {
    var $target = $(evt.target);
    if (window.location.pathname === '/' && !$target.is('[data-ajax-autocomplete]')) {
      ReactDOM.render(
				<AutocompleteSearch shown={false} />,
				document.getElementById('todo-remove-autocomplete')
			);
    }
  });
}());