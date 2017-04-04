var publisher = require('./publisher.js');
var templates = require('./templates-react.js');
var $ = require('jquery');

(function () {

	$(document.body).on('click', '#shade', hideDialog);

	function showShade() {
		var $content = $('#content');
		if ($content.find('#shade').length === 0) {
			var $shade = $('<div id="shade" class="shade"></div>');
			$('#dialog').after($shade);
		}
	}

	function hideShade() {
		$('#shade').remove();
	}

	function showDialog(templateName, url) {
		showShade();
		if (url) {
			jsonRequest({
				url: url,
				templateName: templateName,
				zoneId: 'dialog'
			});
		} else {
			 replaceDialog(templateName, {});
		}
	}

	$(document.body).on('click', '[data-dialog-close]', hideDialog);

	function centerDialog() {
		$('#dialog').css({top: window.scrollY + 80 + 'px'});
	}

	function replaceDialog(templateName, model) {
		templates[templateName](document.getElementById('dialog'), model);
		var $dialog = $('#dialog');
		var $close = $('<button class="dialog_close" data-dialog-close></button>');
		$dialog.append($close);
		publisher.publish('DOMextend', {
			holder: $dialog
		});
		centerDialog();
		return $dialog;
	}

	function hideDialog(event, dialog) {
		var $dialog = dialog?$(dialog):$('#dialog');
		if($.contains(document, $dialog[0])) {
			$dialog.empty();
			$dialog.hide();
			hideShade();
		}
	}

	$(document.body).on('click', '[data-ajax-dialog]', function(evt) {
		var $this = $(this);
		evt.preventDefault();
		showDialog($this.attr('data-ajax-dialog'), $this.attr('data-ajax-url'));
	});

	$(document.body).on('click', '[data-ajax-submit-dialog]', function(evt) {
		var $this = $(this);
		var $form = $this.closest('form');
		if ($form.find('input[type="file"]').length === 0 || window.FormData !== undefined) {
			evt.preventDefault();
			submitDialog($form, $this.attr('data-ajax-submit-dialog'));
		}
	});

	function submitDialog($form, templateName) {
		function __showLoading() {
					templates['loading'](document.getElementById('dialog'));
		}
		function __hideLoading() {
					$('#loading').remove();
		}
		__showLoading();
		submitForm($form, {
			templateName: templateName,
			zoneId: 'dialog',
			callback: __hideLoading
		});
	}

	//used on comments
	//todo: implement history-api
	$(document.body).on('click', 'a[data-ajax]', function (evt) {
		var $this = $(this);
		evt.preventDefault();
		jsonRequest({
			method: 'GET',
			url: $this.attr('href'),
			templateName: $this.attr('data-ajax'),
			zoneId: $this.attr('data-ajax-zone')
		});
	});

	$(document.body).on('click', '[data-ajax-formsubmit]', function (evt) {
		console.log('formsubmit');
		var $this = $(this);
		var $form = $this.closest('form');
		var callbackEventName = $(this).attr('data-ajax-callback-event');
		var callback = !callbackEventName?undefined:function() {
			publisher.publish(callbackEventName);
		};
		if ($this.is('button')) {
			evt.preventDefault();
		};
		submitForm($form, {
			url: $this.attr('formaction') || $form.attr('action'),
			callback: callback
		});
	});

	function submitForm($form, config) {
		if ($form.find('input[type="file"]').length > 0) {
			formDataRequest($form, config);
		} else {
			jsonRequest({
				method: $form.attr('method'),
				url: config.url || $form.attr('action'),
				data: JSON.stringify($form.serializeObject()),
				templateName: config.templateName || $form.attr('data-ajax-tmpl'),
				zoneId: config.zoneId || $form.attr('data-ajax-zone'),
				anchorId: config.anchorId || $form.attr('data-ajax-anchor'),
				callback: config.callback
			});
		}
	};

	function jsonRequest(config) {
		 $.ajax({
			type: config.method || 'GET',
			dataType: 'json',
			url: config.url,
			data: config.data,
			success: function(data, textStatus, jqXHR) {
				__ajaxRequestSuccess(data, textStatus, jqXHR, config);
			},
			error: function() {
				window.location.href = "/404";
			},
			contentType: 'application/json'
		});
	};

	function formDataRequest($form, config) {
		var data = new FormData($form[0]);
		$.ajax({
			type: $form.attr('method'),
			url: $form.attr('action'),
			data: data,
			processData: false,
			contentType: false,
			success: function(data, textStatus, jqXHR) {
				__ajaxRequestSuccess(data, textStatus, jqXHR, config);
			},
			error: function() {
				window.location.href = "/404";
			}
		});
	};

	//todo: fire events here
	function __ajaxRequestSuccess(data, textStatus, jqXHR, config) {
		if (jqXHR.status === 200) {
			if (config.zoneId === 'dialog'){
				replaceDialog(data.template || config.templateName, data);
			} else {
					var $zone = $('#'+config.zoneId);
					templates[data.template || config.templateName]($zone[0], data);
				publisher.publish('DOMextend', {
					holder: $zone
				});
			}
			if (data.template && data.template === 'success') {
				var dialog = document.getElementById('dialog');
				setTimeout(function() {
					hideDialog(null, dialog)
				}, 5000);
			}
			if (config.anchorId) {
				$('#'+config.anchorId)[0].scrollIntoView();
			}
			if (config.callback) {
				config.callback();
			}
		} else if (jqXHR.status === 278) {
			window.location.href = data.location;
		}
	};

}());