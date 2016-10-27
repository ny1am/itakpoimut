var $ = require('jquery');

(function() {

	$(document.body).on('click', '[data-href]', function() {
		var url = $(this).attr('data-href');
		window.location = url;
	});

}());