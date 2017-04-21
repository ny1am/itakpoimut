//temporary staff
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import CompaniesPage from '../../../server/react-views/components/CompaniesPage.jsx';

(function() {
	if (window.location.pathname === '/companies') {
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: '/companies',
			success: function(data, textStatus, jqXHR) {
				ReactDOM.render(
					<CompaniesPage {...data} />,
					document.getElementById('main-content')
				);
			},
			error: function() {
				window.location.href = "/404";
			},
			contentType: 'application/json'
		});
	}
}());