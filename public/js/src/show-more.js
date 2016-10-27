var modernizr = require('modernizr');
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
			$element.removeClass('js-sm-holder');
			$element.children().removeClass('hidden');
			$element.children().removeClass('js-sm-shown-on-top');
		} else {
			$element.addClass('js-sm-holder');
			$element.children().removeClass('hidden');
			var shownCount = 0;
			if (modernizr.flexbox) {
				$element.children().has('input:checked').each(function() {
					if (shownCount < itemsToShow) {
						$(this).addClass('js-sm-shown-on-top');
						shownCount++;
					}
				});
			}
			$element.children().not('.js-sm-shown-on-top').each(function() {
				if (shownCount < itemsToShow) {
					shownCount++;
				} else {
					$(this).addClass('hidden');
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