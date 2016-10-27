var $ = require('jquery');

(function() {

	function getTitle($helper) {
		return {
			hidden: $helper.attr('data-shown-title'),
			shown: $helper.attr('data-title')
		};
	};

	function togglePassword(id) {
		var $el = $('#'+id);
		var $helper = $el.next();
		var title = getTitle($helper);

		if ($el.attr('type') === 'password') {
			$el.attr('type', 'text');
			$helper.addClass('shown');
			$helper.attr('title', title.hidden);
		} else {
			$el.attr('type', 'password');
			$helper.removeClass('shown');
			$helper.attr('title', title.shown);
		}
	};

	$(document.body).on('click', '[data-password-toggle]', function() {
		var id = $(this).attr('data-password-toggle');
		togglePassword(id);
	});

}());