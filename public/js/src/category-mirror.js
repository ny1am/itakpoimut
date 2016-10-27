var publisher = require('./publisher.js');
var templates = require('./templates.js');
var $ = require('jquery');

(function() {

	//todo: remove id
	function init() {
		var selectedCategoriesMirror = [];
		$('[data-category-mirror]:checked').each(function() {
			selectedCategoriesMirror.push(this.getAttribute('value'));
		});
		$('#selectedMirror').html(
            templates['addCategory_selectedMirror']({
                selectedCategoriesMirror: selectedCategoriesMirror
            })
        );
	};

	$(document.body).on('click', '[data-category-mirror]', init);

	$(document.body).on('click', '[data-mirror-chk]', function() {
		var $this = $(this);
		var $checkbox = $('[data-category-mirror][value="'+$this.attr('data-mirror-chk')+'"]');
		$checkbox.attr('checked', false);
		publisher.publish('DOMextend');
		init();
	});


}());