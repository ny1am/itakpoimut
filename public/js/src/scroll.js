var $ = require('jquery');

exports.scrollIfNotInView = function($element) {
	var offset = $element.offset().top - $(window).scrollTop();
	if(offset > window.innerHeight){
		$('body').scrollTop(offset);
	}
}