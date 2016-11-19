var publisher = require('./publisher.js');
var $ = require('jquery');

(function() {

	function initHolder($holder) {
		$holder = $holder || $(document.body);
		$holder.find('select[multiple]').chosen({
			width: "100%",
			placeholder_text_multiple: ' ',
			no_results_text: 'Не знайдено'
		});
	};

	$(function() {
		initHolder();
	}());

	publisher.subscribe('DOMextend', function(params) {
		initHolder(params.holder);
	});
	
}());