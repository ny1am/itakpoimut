var $ = require('jquery');

(function() {

	$(document.body).on('change', 'input[type="file"]', function() {
		if (this.files){
			var $holder = $(this).parent();
			$holder.removeClass('fu-success');
			$holder.removeClass('fu-error');
			if (this.files.length === 1) {
				var file = this.files[0];
				if (file.size > 1024*1024 || !(file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png')) {
					$holder.addClass('fu-error');
				} else {
					$holder.addClass('fu-success');
				}
			}
		}
	});

}());