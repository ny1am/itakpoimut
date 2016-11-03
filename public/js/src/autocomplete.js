var templates = require('./templates.js');
var $ = require('jquery');

(function() {

    function fillAutocomplete(value) {
      //todo: revise this
      var category = $('#selectedCategory').val();
      var urlParams = 'term='+value;
      if (category) {
        urlParams +="&category="+category;
      } 
      $.ajax({
          type: 'GET',
          dataType: 'json',
          url: '/autocomplete?'+urlParams,
          success: function(data, textStatus, jqXHR) {
            var newHtml = templates['autocomplete'](data);
            $('#autocomplete-popup').html(newHtml);
         },
         contentType: 'application/json'
     });
    };

    $(document.body).on('focus', '[data-ajax-autocomplete]',  $.debounce(250, function(evt) {
        var value = $(this).val();
        fillAutocomplete(value);
    }));

    $(document.body).on('keyup', '[data-ajax-autocomplete]',  $.debounce(250, function(evt) {
        var value = $(this).val();
        if (value === '') {
            $('#autocomplete-popup').empty();
            return;
        }
        fillAutocomplete(value);
    }));

    $(document.body).on('change', '[data-trigger-ajax-autocomplete]', function(evt) {
        var autocompleteId = $(this).attr('data-trigger-ajax-autocomplete');
        var $autocompleteEl = $('[data-ajax-autocomplete="'+autocompleteId+'"]');
        fillAutocomplete($autocompleteEl.val());
    });

    $(document.body).on('click', function(evt) {
      var $target = $(evt.target);
      if (!$target.is('[data-trigger-ajax-autocomplete]') && !$target.is('[data-ajax-autocomplete]')) {
        $('#autocomplete-popup').empty();
      }
    });
    
}());