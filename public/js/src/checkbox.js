var publisher = require('./publisher.js');
var $ = require('jquery');

(function() {

	function init() {
		var $this = $(this);
		var $holder = $this.parent();
		if ($this.is(':checked')) {
			$holder.attr('data-checked', '');
		} else {
			$holder.removeAttr('data-checked');
		}
	};

	function initHolder($holder) {
		$holder = $holder || $(document.body);
		$holder.find('.checkbox input[type="checkbox"]').each(function() {
			init.call(this);
		});
	};

	$(document.body).on('click', '.checkbox input[type="checkbox"]', function() {
		init.call(this);
	});

	$(function() {
		initHolder();
	}());

	publisher.subscribe('DOMextend', function(params) {
		initHolder(params.holder);
	});
	
}());