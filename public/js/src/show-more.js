var $ = require('jquery');

(function() {

	function triggerShowMore() {
		var $this = $(this);
		if ($this.is('[open]')) {
			$this.removeAttr('open');
			$this.attr('close', '');
		} else {
			$this.removeAttr('close');
			$this.attr('open', '');
		}
		initShowMore.call(this);
	};

	function initShowMore() {
		var $this = $(this);
		var elementId = $this.attr('data-show-more');
		var itemsToShow = parseInt($this.attr('data-show-more-value'));
		var $element = $('#'+elementId);
		if ($this.is('[open]')) {
			$element.children().removeClass('hidden');
		} else {
			$element.children().removeClass('hidden');
			var shownCount = 0;
			$element.children().each(function() {
				var $el = $(this);
				if (shownCount < itemsToShow || $el.has('input:checked').length > 0) {
					shownCount++;
				} else {
					$el.addClass('hidden');
				}
			});
		}
	};

	$(document.body).on('click', '[data-show-more]', triggerShowMore);
	$(function() {
		$('[data-show-more]').each(function() {
			$(this).addClass('js-sm-trigger');
			initShowMore.call(this);
		});
	});
	//todo: fire event when ajax changes dom

}());