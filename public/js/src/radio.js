var publisher = require('./publisher.js');
var $ = require('jquery');

(function() {

	function init() {
		var $this = $(this);
		var $holder = $this.parent();
		var name = this.name;
		if ($this.is(':checked')) {
			$('[name="'+name+'"]').each(function(i, el) {
				$(el).parent().removeAttr('data-checked');
			});
			$holder.attr('data-checked', '');
		} else {
			$holder.removeAttr('data-checked');
		}
	};

	function initHolder($holder) {
		$holder = $holder || $(document.body);
		$holder.find('.radio input[type="radio"]').each(function() {
			var $this = $(this);
			var $holder = $this.parent();
			if ($this.is(':checked')) {
				$holder.attr('data-checked', '');
			} else {
				$holder.removeAttr('data-checked');
			}
		});
	};

	$(document.body).on('change', '.radio input[type="radio"]', function() {
		init.call(this);
	});

	$(function() {
		initHolder();
	}());

	publisher.subscribe('DOMextend', function(params) {
		initHolder(params.holder);
	});
	
}());